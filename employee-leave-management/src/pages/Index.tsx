
import { ArrowRight, CheckCircle, Clock, PieChart, ShieldCheck, UserCheck, Award, Zap, Lightbulb } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-gradient min-h-screen flex items-center pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 animate-fade-in">
              <p className="text-white/90 text-xl mb-4 font-medium">WE ARE HERE</p>
              <h1 className="text-white heading-1 mb-6">
                EMPLOYEE LEAVE MANAGEMENT
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-xl">
                Streamline your organization's leave management process with our intuitive, 
                efficient, and user-friendly platform. Take control of employee absences 
                and enhance workforce productivity.
              </p>
              <Button 
                onClick={handleGetStarted}
                variant="default" 
                size="lg" 
                className="group rounded-full bg-white text-blue hover:bg-gray-100"
                withArrow
              >
                Start today
              </Button>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center animate-scale-in">
              <div className="relative">
                <div className="animate-pulse absolute -inset-0.5 rounded-full bg-cyan/20 blur-xl"></div>
                <img
                  src="/lovable-uploads/c6c1fece-35f6-4e7e-a308-4ae2f496d9ca.png"
                  alt="Business professional with tablet"
                  className="rounded-full object-cover w-96 h-96 relative z-10 border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%] z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">SIMPLIFY LEAVE TRACKING</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Empower Your Team with an Intuitive and Efficient Leave Management Tool
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="SEAMLESS APPROVAL"
              icon={
                <div className="h-48 flex items-center justify-center">
                  <UserCheck className="w-20 h-20 text-white" />
                </div>
              }
              stats="98% approval rate"
              description="Streamline your approval workflow with our intuitive interface. Managers can review, approve or decline leave requests in seconds."
              delay={100}
            />
            <FeatureCard
              title="TRUSTED-BY"
              icon={
                <div className="h-48 flex items-center justify-center">
                  <Award className="w-20 h-20 text-white" />
                </div>
              }
              stats="500+ companies"
              description="Join hundreds of leading companies who trust our platform for their employee leave management needs."
              delay={200}
            />
            <FeatureCard
              title="REAL-TIME"
              icon={
                <div className="h-48 flex items-center justify-center">
                  <Zap className="w-20 h-20 text-white" />
                </div>
              }
              stats="Instant updates"
              description="Get real-time notifications and updates on leave requests, approvals, and team availability without any delays."
              delay={300}
            />
            <FeatureCard
              title="INSIGHTFUL"
              icon={
                <div className="h-48 flex items-center justify-center">
                  <Lightbulb className="w-20 h-20 text-white" />
                </div>
              }
              stats="Advanced analytics"
              description="Gain valuable insights into leave patterns, team availability, and resource allocation to optimize workforce planning."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">WHY CHOOSE US</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Our leave management platform offers comprehensive features to streamline your HR processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="bg-blue-light/20 p-3 rounded-xl">
                  <Clock className="w-8 h-8 text-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Time-off Balance Tracking</h3>
                  <p className="text-gray-600">
                    Automatically calculate and track employee leave balances, accruals, and used days
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in animate-delay-100">
              <div className="flex items-start gap-4">
                <div className="bg-blue-light/20 p-3 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-level Approvals</h3>
                  <p className="text-gray-600">
                    Configure custom approval workflows based on your organization's structure
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in animate-delay-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-light/20 p-3 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Management</h3>
                  <p className="text-gray-600">
                    Stay compliant with labor laws and policies with built-in rules and validations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in animate-delay-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-light/20 p-3 rounded-xl">
                  <PieChart className="w-8 h-8 text-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Reporting</h3>
                  <p className="text-gray-600">
                    Generate comprehensive reports on leave trends, department availability, and more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-gradient rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white heading-3 mb-4">
                  Ready to transform your leave management?
                </h3>
                <p className="text-white/80 mb-0 md:mb-0">
                  Join thousands of companies already using LeaveManage
                </p>
              </div>
              <Button 
                onClick={handleGetStarted}
                variant="default" 
                size="lg" 
                className="rounded-full bg-white text-blue hover:bg-gray-100 whitespace-nowrap"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
