
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Calendar, FileText, DoorOpen, LogIn, LogOut, Shield } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface LeaveRequest {
  id: string;
  userId: string;
  username: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface AccessRecord {
  id: string;
  userId: string;
  username: string;
  timestamp: string;
  type: "in" | "out";
  status: "pending" | "approved" | "rejected";
}

const Admin = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAccessStatus, setFilterAccessStatus] = useState<string>("all");
  const [employees, setEmployees] = useState<{id: string, username: string, email: string, role?: string}[]>([]);

  useEffect(() => {
    // Check permissions
    if (!hasPermission("approve_leave")) {
      toast.error("You don't have permission to access this page");
      navigate("/dashboard");
      return;
    }
    
    // Load data
    loadLeaveRequests();
    loadAccessRecords();
    loadEmployees();
  }, [hasPermission, navigate]);

  const loadLeaveRequests = () => {
    const storedRequests = localStorage.getItem("leaveRequests");
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      setLeaveRequests(parsedRequests);
    }
  };

  const loadAccessRecords = () => {
    const storedRecords = localStorage.getItem("accessRecords");
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords);
      setAccessRecords(parsedRecords);
    } else {
      // Initialize with some sample data if none exists
      const initialRecords: AccessRecord[] = [];
      localStorage.setItem("accessRecords", JSON.stringify(initialRecords));
      setAccessRecords(initialRecords);
    }
  };

  const loadEmployees = () => {
    // Load all users for employee management
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setEmployees(parsedUsers);
    } else {
      // Initialize with current user if no other users
      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        const initialUsers = [
          { 
            id: "1", 
            username: parsedUser.username, 
            email: parsedUser.email,
            role: parsedUser.role || "employee"
          }
        ];
        localStorage.setItem("users", JSON.stringify(initialUsers));
        setEmployees(initialUsers);
      }
    }
  };

  const handleApproveLeave = (id: string) => {
    if (!hasPermission("approve_leave")) {
      toast.error("You don't have permission to approve leave requests");
      return;
    }
    updateLeaveStatus(id, "approved");
  };

  const handleRejectLeave = (id: string) => {
    if (!hasPermission("approve_leave")) {
      toast.error("You don't have permission to reject leave requests");
      return;
    }
    updateLeaveStatus(id, "rejected");
  };

  const updateLeaveStatus = (id: string, status: "approved" | "rejected") => {
    const storedRequests = localStorage.getItem("leaveRequests");
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      const updatedRequests = parsedRequests.map((request: LeaveRequest) => {
        if (request.id === id) {
          return { ...request, status };
        }
        return request;
      });
      
      // Save back to localStorage
      localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
      
      // Update state
      setLeaveRequests(updatedRequests);
      toast.success(`Leave request ${status} successfully`);
    }
  };

  const handleApproveAccess = (id: string) => {
    if (!hasPermission("approve_access")) {
      toast.error("You don't have permission to approve access records");
      return;
    }
    updateAccessStatus(id, "approved");
  };

  const handleRejectAccess = (id: string) => {
    if (!hasPermission("approve_access")) {
      toast.error("You don't have permission to reject access records");
      return;
    }
    updateAccessStatus(id, "rejected");
  };

  const updateAccessStatus = (id: string, status: "approved" | "rejected") => {
    const storedRecords = localStorage.getItem("accessRecords");
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords);
      const updatedRecords = parsedRecords.map((record: AccessRecord) => {
        if (record.id === id) {
          return { ...record, status };
        }
        return record;
      });
      
      // Save back to localStorage
      localStorage.setItem("accessRecords", JSON.stringify(updatedRecords));
      
      // Update state
      setAccessRecords(updatedRecords);
      toast.success(`Access request ${status} successfully`);
    }
  };

  const filteredLeaveRequests = filterStatus === "all" 
    ? leaveRequests 
    : leaveRequests.filter(request => request.status === filterStatus);

  const filteredAccessRecords = filterAccessStatus === "all" 
    ? accessRecords 
    : accessRecords.filter(record => record.status === filterAccessStatus);

  // Check if user has admin permissions
  if (!user || !hasPermission("approve_leave")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <Button asChild>
          <a href="/dashboard">Return to Dashboard</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Shield className="text-purple-600 w-8 h-8" />
            <h1 className="text-3xl font-bold text-purple-600 mb-2">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Manage leave requests, access control, and employees
          </p>
        </div>

        <Tabs defaultValue="leaves" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="leaves" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Leave Requests
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <DoorOpen className="w-4 h-4" />
              Access Control
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Employees
            </TabsTrigger>
          </TabsList>

          {/* Leave Requests Tab */}
          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" onValueChange={setFilterStatus}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      All Requests
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Approved
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Rejected
                    </TabsTrigger>
                  </TabsList>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Leave Type</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeaveRequests.length > 0 ? (
                          filteredLeaveRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.username}</TableCell>
                              <TableCell>{request.type}</TableCell>
                              <TableCell>{format(new Date(request.startDate), "MMM dd, yyyy")}</TableCell>
                              <TableCell>{format(new Date(request.endDate), "MMM dd, yyyy")}</TableCell>
                              <TableCell>{request.reason}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    request.status === "approved" 
                                      ? "bg-green-100 text-green-800" 
                                      : request.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {request.status === "pending" && (
                                  <div className="flex space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-green-500 text-green-600 hover:bg-green-50"
                                      onClick={() => handleApproveLeave(request.id)}
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-red-500 text-red-600 hover:bg-red-50"
                                      onClick={() => handleRejectLeave(request.id)}
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                {request.status !== "pending" && (
                                  <span className="text-gray-500 text-sm">Processed</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                              No leave requests found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Control Tab */}
          <TabsContent value="access">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" onValueChange={setFilterAccessStatus}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      All Records
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Approved
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Rejected
                    </TabsTrigger>
                  </TabsList>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAccessRecords.length > 0 ? (
                          filteredAccessRecords.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell className="font-medium">{record.username}</TableCell>
                              <TableCell>
                                {record.type === "in" ? (
                                  <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                                    <LogIn className="w-3 h-3" /> Clock In
                                  </Badge>
                                ) : (
                                  <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
                                    <LogOut className="w-3 h-3" /> Clock Out
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{format(new Date(record.timestamp), "MMM dd, yyyy HH:mm")}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    record.status === "approved" 
                                      ? "bg-green-100 text-green-800" 
                                      : record.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {record.status === "pending" && (
                                  <div className="flex space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-green-500 text-green-600 hover:bg-green-50"
                                      onClick={() => handleApproveAccess(record.id)}
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-red-500 text-red-600 hover:bg-red-50"
                                      onClick={() => handleRejectAccess(record.id)}
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                {record.status !== "pending" && (
                                  <span className="text-gray-500 text-sm">Processed</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                              No access records found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.length > 0 ? (
                        employees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.username}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>
                              <Badge className={employee.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}>
                                {employee.role || "Employee"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No employees found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
