
import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LeaveApprovalActionsProps {
  leaveId: string;
  onActionComplete: () => void;
}

const LeaveApprovalActions = ({ leaveId, onActionComplete }: LeaveApprovalActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action: "approve" | "reject") => {
    setIsProcessing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing leave requests
      const storedRequests = localStorage.getItem("leaveRequests");
      if (!storedRequests) {
        toast.error("No leave requests found");
        return;
      }
      
      const requests = JSON.parse(storedRequests);
      
      // Find the requested leave
      const updatedRequests = requests.map((request: any) => {
        if (request.id === leaveId) {
          return {
            ...request,
            status: action === "approve" ? "approved" : "rejected",
            updatedAt: new Date().toISOString(),
          };
        }
        return request;
      });
      
      // Save back to localStorage
      localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
      
      // Show success message
      toast.success(`Leave request ${action === "approve" ? "approved" : "rejected"} successfully`);
      
      // Call the callback to refresh data
      onActionComplete();
    } catch (error) {
      console.error(`Error ${action}ing leave:`, error);
      toast.error(`Failed to ${action} leave request`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-50"
        onClick={() => handleAction("approve")}
        disabled={isProcessing}
      >
        <ThumbsUp className="w-4 h-4 mr-1" />
        Approve
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 border-red-600 hover:bg-red-50"
        onClick={() => handleAction("reject")}
        disabled={isProcessing}
      >
        <ThumbsDown className="w-4 h-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export default LeaveApprovalActions;
