
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { format, differenceInDays } from "date-fns";
import { Clock, Filter, CheckCircle, XCircle, AlertCircle, Calendar, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const LeaveDataTable = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<"table" | "card">("table");

  const fetchLeaveRequests = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Get leave requests from localStorage
      const storedRequests = localStorage.getItem("leaveRequests");
      const parsedRequests = storedRequests 
        ? JSON.parse(storedRequests) 
        : [];
      
      // Filter requests for current user
      const userRequests = parsedRequests.filter(
        (request: LeaveRequest) => request.userId === user?.email
      );
      
      // Sort by creation date (newest first)
      userRequests.sort((a: LeaveRequest, b: LeaveRequest) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setLeaveRequests(userRequests);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("Failed to load leave requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
    
    // Set up interval to refresh data every minute
    const intervalId = setInterval(fetchLeaveRequests, 60000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  useEffect(() => {
    let filtered = [...leaveRequests];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((request) => request.leaveType === typeFilter);
    }
    
    setFilteredRequests(filtered);
  }, [statusFilter, typeFilter, leaveRequests]);

  const handleCancelRequest = async (requestId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current leave requests
      const storedRequests = localStorage.getItem("leaveRequests");
      if (!storedRequests) return;
      
      const parsedRequests = JSON.parse(storedRequests);
      
      // Remove the specified request
      const updatedRequests = parsedRequests.filter(
        (request: LeaveRequest) => request.id !== requestId
      );
      
      // Save updated list
      localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
      
      toast.success("Leave request canceled successfully");
      
      // Refresh the leave requests
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error canceling leave request:", error);
      toast.error("Failed to cancel leave request");
    }
  };

  const getLeaveTypeName = (type: string) => {
    const types: Record<string, string> = {
      annual: "Annual Leave",
      sick: "Sick Leave",
      personal: "Personal Leave",
      unpaid: "Unpaid Leave",
      bereavement: "Bereavement Leave",
    };
    return types[type] || type;
  };

  const getLeaveTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      annual: "bg-blue-100 text-blue-800 border-blue-200",
      sick: "bg-red-100 text-red-800 border-red-200",
      personal: "bg-purple-100 text-purple-800 border-purple-200",
      unpaid: "bg-gray-100 text-gray-800 border-gray-200",
      bereavement: "bg-amber-100 text-amber-800 border-amber-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Approved</span>
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Pending</span>
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue border-t-transparent animate-spin"></div>
          <span>Loading leave data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue" />
          Leave Requests
        </h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Button 
              variant={displayMode === "table" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode("table")}
              className="flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Table
            </Button>
            <Button 
              variant={displayMode === "card" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode("card")}
              className="flex items-center gap-1"
            >
              <CalendarDays className="w-4 h-4" />
              Cards
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="sick">Sick</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="bereavement">Bereavement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>No leave requests found</p>
          <p className="text-sm mt-1">
            Create a new request to see it here
          </p>
        </div>
      ) : displayMode === "table" ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Date</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const startDate = new Date(request.startDate);
                const endDate = new Date(request.endDate);
                
                // Calculate duration in days
                const durationDays = differenceInDays(endDate, startDate) + 1;
                
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      {format(new Date(request.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getLeaveTypeColor(request.leaveType)}>
                        {getLeaveTypeName(request.leaveType)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{durationDays} day{durationDays !== 1 ? "s" : ""}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelRequest(request.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                              >
                                Cancel
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Cancel this leave request
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredRequests.map((request) => {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const durationDays = differenceInDays(endDate, startDate) + 1;
            
            return (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{getLeaveTypeName(request.leaveType)}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <CardDescription>
                    Requested on {format(new Date(request.createdAt), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Period:</span>
                      <span className="font-medium">
                        {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{durationDays} day{durationDays !== 1 ? "s" : ""}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Reason:</span>
                      <p className="mt-1 text-sm">{request.reason}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {request.status === "pending" && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelRequest(request.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 w-full"
                    >
                      Cancel Request
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveDataTable;
