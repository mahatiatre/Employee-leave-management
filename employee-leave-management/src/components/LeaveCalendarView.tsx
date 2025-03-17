
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const LeaveCalendarView = () => {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load leave requests when component mounts
    const fetchLeaveRequests = async () => {
      try {
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
        
        setLeaveRequests(userRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [user]);

  const getMonthDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    
    return eachDayOfInterval({ start, end });
  };

  const getLeaveStatusForDay = (day: Date) => {
    // Check if there are any leave requests that include this day
    const matchingRequests = leaveRequests.filter(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      
      return day >= startDate && day <= endDate;
    });
    
    if (matchingRequests.length === 0) return null;
    
    // Return the first matching request (in a real app, you might want to handle multiple requests differently)
    return matchingRequests[0];
  };

  const getLeaveTypeColorClass = (leaveType: string) => {
    const colors: Record<string, string> = {
      annual: "bg-blue-500",
      sick: "bg-red-500",
      personal: "bg-purple-500",
      unpaid: "bg-gray-500",
      bereavement: "bg-amber-700",
    };
    
    return colors[leaveType] || "bg-gray-400";
  };

  const getStatusColorClass = (status: string) => {
    const colors: Record<string, string> = {
      approved: "bg-green-100 border-green-500 text-green-800",
      pending: "bg-yellow-100 border-yellow-500 text-yellow-800",
      rejected: "bg-red-100 border-red-500 text-red-800",
    };
    
    return colors[status] || "";
  };

  const previousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const isStartOfLeave = (day: Date, request: LeaveRequest) => {
    return isSameDay(day, new Date(request.startDate));
  };

  const isEndOfLeave = (day: Date, request: LeaveRequest) => {
    return isSameDay(day, new Date(request.endDate));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue border-t-transparent animate-spin"></div>
          <span>Loading calendar...</span>
        </div>
      </div>
    );
  }

  const days = getMonthDays();
  const firstDayOfMonth = getDay(days[0]); // 0 for Sunday, 1 for Monday, etc.

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 border rounded-md bg-gray-50"></div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => {
          const leaveRequest = getLeaveStatusForDay(day);
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          
          return (
            <div 
              key={day.toString()} 
              className={cn(
                "h-24 border rounded-md p-1 relative",
                isToday ? "border-blue border-2" : "border-gray-200"
              )}
            >
              <div className="text-right mb-1">
                <span className={cn(
                  "inline-block rounded-full w-6 h-6 text-center leading-6 text-sm",
                  isToday ? "bg-blue text-white" : ""
                )}>
                  {format(day, "d")}
                </span>
              </div>
              
              {leaveRequest && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={cn(
                        "text-xs rounded p-1 border absolute bottom-1 left-1 right-1 cursor-pointer",
                        getStatusColorClass(leaveRequest.status),
                        isStartOfLeave(day, leaveRequest) && "border-l-4",
                        isEndOfLeave(day, leaveRequest) && "border-r-4",
                      )}>
                        <div className="flex items-center gap-1">
                          <span 
                            className={cn(
                              "w-2 h-2 rounded-full",
                              getLeaveTypeColorClass(leaveRequest.leaveType)
                            )}
                          ></span>
                          <span className="truncate">
                            {leaveRequest.leaveType.charAt(0).toUpperCase() + leaveRequest.leaveType.slice(1)}
                          </span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="p-2 max-w-xs">
                      <div className="text-sm">
                        <div className="font-semibold">
                          {leaveRequest.leaveType.charAt(0).toUpperCase() + leaveRequest.leaveType.slice(1)} Leave
                        </div>
                        <div className="text-xs mt-1">
                          <p><span className="font-medium">From:</span> {format(new Date(leaveRequest.startDate), "MMM dd, yyyy")}</p>
                          <p><span className="font-medium">To:</span> {format(new Date(leaveRequest.endDate), "MMM dd, yyyy")}</p>
                          <p className="mt-1"><span className="font-medium">Reason:</span> {leaveRequest.reason}</p>
                          <p className="mt-1"><span className="font-medium">Status:</span> {leaveRequest.status.charAt(0).toUpperCase() + leaveRequest.status.slice(1)}</p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="text-sm font-medium">Leave Types:</div>
        {["annual", "sick", "personal", "unpaid", "bereavement"].map(type => (
          <div key={type} className="flex items-center gap-1 text-xs">
            <span className={cn("w-3 h-3 rounded-full", getLeaveTypeColorClass(type))}></span>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="text-sm font-medium">Request Status:</div>
        {["pending", "approved", "rejected"].map(status => (
          <div key={status} className="flex items-center gap-1 text-xs">
            <span className={cn("w-3 h-3 rounded-full", 
              status === "pending" ? "bg-yellow-500" :
              status === "approved" ? "bg-green-500" : "bg-red-500"
            )}></span>
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaveCalendarView;
