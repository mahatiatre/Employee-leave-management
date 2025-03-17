
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  role: "admin" | "employee";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // If role is not set, default to employee (for backward compatibility)
      if (!parsedUser.role) {
        parsedUser.role = parsedUser.username === "admin" ? "admin" : "employee";
      }
      // Ensure the role is either "admin" or "employee"
      if (parsedUser.role !== "admin" && parsedUser.role !== "employee") {
        parsedUser.role = "employee";
      }
      setUser(parsedUser as User);
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock login - in a real app, you would call an API
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty credentials
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return false;
      }
      
      const isAdmin = email.includes("admin");
      const userRole: "admin" | "employee" = isAdmin ? "admin" : "employee";
      
      const userData: User = {
        username: email.split('@')[0],
        email,
        role: userRole
      };
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Initialize empty leave requests if none exist
      if (!localStorage.getItem("leaveRequests")) {
        localStorage.setItem("leaveRequests", JSON.stringify([]));
      }
      
      // Initialize empty access records if none exist
      if (!localStorage.getItem("accessRecords")) {
        localStorage.setItem("accessRecords", JSON.stringify([]));
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login successful!");
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };
  
  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // This is a mock signup - in a real app, you would call an API
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Validation
      if (!username || !email || !password) {
        toast.error("Please fill in all fields");
        return false;
      }
      
      const isAdmin = username === "admin" || email.includes("admin");
      const userRole: "admin" | "employee" = isAdmin ? "admin" : "employee";
      
      const userData: User = {
        username,
        email,
        role: userRole
      };
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Initialize empty leave requests if none exist
      if (!localStorage.getItem("leaveRequests")) {
        localStorage.setItem("leaveRequests", JSON.stringify([]));
      }
      
      // Initialize empty access records if none exist
      if (!localStorage.getItem("accessRecords")) {
        localStorage.setItem("accessRecords", JSON.stringify([]));
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Account created successfully!");
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };
  
  // Check if current user is an admin
  const isAdmin = (): boolean => {
    return user?.role === "admin";
  };
  
  // Role-based permission check
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === "admin") {
      return true;
    }
    
    // For employees, check specific allowed permissions
    if (user.role === "employee") {
      // List any permissions that employees should have
      const employeePermissions = [
        "view_own_leaves",
        "request_leave",
        "view_own_profile"
      ];
      
      return employeePermissions.includes(permission);
    }
    
    return false;
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      signup, 
      logout, 
      hasPermission,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
