
import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
}

interface LeaveUsage {
  annual: number;
  sick: number;
  personal: number;
}

const LeaveStats = () => {
  const { user } = useAuth();
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>({
    annual: 20,
    sick: 10,
    personal: 5,
  });
  const [leaveUsed, setLeaveUsed] = useState<LeaveUsage>({
    annual: 0,
    sick: 0,
    personal: 0,
  });
  const [pendingRequests, setPendingRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchLeaveData = () => {
      // Get existing leave requests from localStorage
      const storedRequests = localStorage.getItem("leaveRequests");
      if (storedRequests) {
        const requests = JSON.parse(storedRequests);
        
        // Filter requests for current user
        const userRequests = requests.filter((r: any) => r.userId === user?.email);
        
        // Count pending and approved requests
        const pending = userRequests.filter((r: any) => r.status === "pending").length;
        const approved = userRequests.filter((r: any) => r.status === "approved").length;
        
        setPendingRequests(pending);
        setApprovedRequests(approved);
        
        // Calculate leave usage by type
        const usage = {
          annual: 0,
          sick: 0,
          personal: 0,
        };
        
        userRequests.forEach((request: any) => {
          if (request.status === "approved" || request.status === "pending") {
            const start = new Date(request.startDate);
            const end = new Date(request.endDate);
            const durationMs = end.getTime() - start.getTime();
            const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24)) + 1;
            
            if (request.leaveType in usage) {
              usage[request.leaveType as keyof LeaveUsage] += durationDays;
            }
          }
        });
        
        setLeaveUsed(usage);
      }
    };
    
    fetchLeaveData();
    
    // Set up an interval to refresh leave data every minute
    const refreshInterval = setInterval(fetchLeaveData, 60000);
    
    return () => clearInterval(refreshInterval);
  }, [user]);

  // Calculate remaining leave balance
  const remainingBalance = {
    annual: leaveBalance.annual - leaveUsed.annual,
    sick: leaveBalance.sick - leaveUsed.sick,
    personal: leaveBalance.personal - leaveUsed.personal,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-gradient rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Leave Balance</h3>
            <p className="text-white/70 text-sm">Available days</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{remainingBalance.annual}</div>
            <div className="text-xs text-white/70">Annual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{remainingBalance.sick}</div>
            <div className="text-xs text-white/70">Sick</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{remainingBalance.personal}</div>
            <div className="text-xs text-white/70">Personal</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-light/20 p-3 rounded-full">
            <Clock className="w-6 h-6 text-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-gray-500 text-sm">Awaiting approval</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="text-4xl font-bold text-blue">{pendingRequests}</div>
          <div className="text-xs text-gray-500">
            {pendingRequests === 1 ? "Request" : "Requests"}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-light/20 p-3 rounded-full">
            <User className="w-6 h-6 text-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Upcoming Leave</h3>
            <p className="text-gray-500 text-sm">Approved requests</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="text-4xl font-bold text-blue">{approvedRequests}</div>
          <div className="text-xs text-gray-500">
            {approvedRequests === 1 ? "Day" : "Days"} scheduled
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStats;
