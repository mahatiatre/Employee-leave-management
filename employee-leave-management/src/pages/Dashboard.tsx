
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Calendar, ListChecks, PlusCircle, LayoutList, ShieldCheck, LogIn, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import LeaveRequestForm from "@/components/LeaveRequestForm";
import LeaveDataTable from "@/components/LeaveDataTable";
import LeaveStats from "@/components/LeaveStats";
import LeaveCalendarView from "@/components/LeaveCalendarView";

const Dashboard = () => {
  const { user, hasPermission } = useAuth();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [lastClockAction, setLastClockAction] = useState<string | null>(null);

  useEffect(() => {
    // Load leave requests when dashboard mounts
    const storedRequests = localStorage.getItem("leaveRequests");
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      setLeaveRequests(parsedRequests);
    }

    // Check current clock status
    checkClockStatus();
  }, []);

  // Handle successful leave request submission
  const handleLeaveRequestSubmit = () => {
    // Refresh leave data
    const storedRequests = localStorage.getItem("leaveRequests");
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      setLeaveRequests(parsedRequests);
    }
    setIsRequestFormOpen(false);
    toast.success("Leave request submitted successfully");
  };

  // Check if user is currently clocked in
  const checkClockStatus = () => {
    if (!user) return;
    
    const storedRecords = localStorage.getItem("accessRecords");
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords);
      
      // Filter records for current user and sort by timestamp (newest first)
      const userRecords = parsedRecords
        .filter((record: any) => record.userId === user.username)
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      if (userRecords.length > 0) {
        const lastRecord = userRecords[0];
        setLastClockAction(lastRecord.timestamp);
        setClockedIn(lastRecord.type === "in");
      }
    }
  };

  // Handle clock in/out
  const handleClockInOut = (type: "in" | "out") => {
    if (!user) return;
    
    const newRecord = {
      id: uuidv4(),
      userId: user.username,
      username: user.username,
      timestamp: new Date().toISOString(),
      type,
      status: "pending"
    };
    
    // Save to localStorage
    const storedRecords = localStorage.getItem("accessRecords");
    let newRecords = [];
    
    if (storedRecords) {
      newRecords = [...JSON.parse(storedRecords), newRecord];
    } else {
      newRecords = [newRecord];
    }
    
    localStorage.setItem("accessRecords", JSON.stringify(newRecords));
    
    // Update state
    setClockedIn(type === "in");
    setLastClockAction(newRecord.timestamp);
    
    toast.success(`Successfully clocked ${type}. Waiting for approval.`);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    );
  }

  const isAdmin = hasPermission("approve_leave");
  const formattedTime = lastClockAction ? new Date(lastClockAction).toLocaleTimeString() : "";
  const formattedDate = lastClockAction ? new Date(lastClockAction).toLocaleDateString() : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-blue mb-2">
            Welcome, {user.username}
          </h1>
          <p className="text-gray-600">
            Manage your leave requests and track your attendance
          </p>
        </div>

        {/* Clock In/Out Card */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Attendance Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-lg font-medium">
                  Current Status: 
                  <span className={`ml-2 ${clockedIn ? "text-green-600" : "text-red-600"}`}>
                    {clockedIn ? "Clocked In" : "Clocked Out"}
                  </span>
                </p>
                {lastClockAction && (
                  <p className="text-sm text-gray-500">
                    Last action: {clockedIn ? "Clocked in" : "Clocked out"} at {formattedTime} on {formattedDate}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  className={`flex items-center gap-2 ${clockedIn ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600"}`}
                  onClick={() => handleClockInOut("in")}
                  disabled={clockedIn}
                >
                  <LogIn className="w-4 h-4" />
                  Clock In
                </Button>
                <Button
                  className={`flex items-center gap-2 ${!clockedIn ? "bg-gray-300 cursor-not-allowed" : "bg-orange-600"}`}
                  onClick={() => handleClockInOut("out")}
                  disabled={!clockedIn}
                >
                  <LogOut className="w-4 h-4" />
                  Clock Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Stats */}
        <LeaveStats />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-8 animate-fade-in animate-delay-100">
          <Button
            className="flex items-center gap-2 bg-blue"
            onClick={() => setIsRequestFormOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            Request Leave
          </Button>
          
          {isAdmin && (
            <Button
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <a href="/admin">
                <ShieldCheck className="w-4 h-4" />
                Admin Panel
              </a>
            </Button>
          )}
        </div>

        {/* Leave Request Form */}
        {isRequestFormOpen && (
          <Card className="p-6 mb-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">New Leave Request</h2>
            <LeaveRequestForm onClose={() => setIsRequestFormOpen(false)} onSuccess={handleLeaveRequestSubmit} />
          </Card>
        )}

        {/* Leave Data Display */}
        <div className="animate-fade-in animate-delay-200">
          <h2 className="text-xl font-bold mb-4">Your Leave Requests</h2>
          
          <Tabs defaultValue="list" onValueChange={(value) => setViewMode(value as "list" | "calendar")}>
            <TabsList className="mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar View
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <LeaveDataTable key={leaveRequests.length} />
            </TabsContent>
            <TabsContent value="calendar">
              <LeaveCalendarView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
