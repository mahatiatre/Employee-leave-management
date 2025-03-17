
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-blue-gradient flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Logo textClassName="text-white" />
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-white/80">Home</Link>
            <Link to="/about" className="text-white hover:text-white/80">About Us</Link>
            <Link to="/help" className="text-white hover:text-white/80">Help</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glassmorphism p-8 animate-scale-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">LOGIN TO YOUR ACCOUNT</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email Address :</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email"
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-white/80 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-white mb-2">Password :</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 pl-10 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-white/80 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-blue"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-white">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-white hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-white text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium hover:underline">
                    Sign Up now
                  </Link>
                </p>
                
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-blue hover:bg-gray-100"
                  loading={isSubmitting}
                >
                  LOGIN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+123-456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>hello@reallyreatsite.com</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>www.reallyreatsite.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>123 Anywhere St., Any City</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

// Import icons at the top
const Phone = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Globe = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
