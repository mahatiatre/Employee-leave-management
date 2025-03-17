
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText, 
  Mail, 
  MessageSquare, 
  SearchCheck, 
  Shield, 
  Smartphone, 
  Zap 
} from "lucide-react";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-blue-gradient py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center animate-fade-in">
            <h1 className="heading-1 text-white mb-6">Powerful Features</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Discover all the tools and capabilities that make LeaveManage the
              preferred choice for organizations worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">Core Functionality</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Everything you need for comprehensive leave management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Using an image from your uploads for one of the features */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <img
                  src="/lovable-uploads/58e30bcd-dd7f-4210-8b3e-523d8b812003.png"
                  alt="Seamless Approval Process"
                  className="h-40 w-auto object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Seamless Approval Process</h3>
                <p className="text-gray-600">
                  Streamlined workflows that make leave requests and approvals quick and hassle-free
                  for both employees and managers.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in animate-delay-100">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <Shield className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Trusted Security</h3>
                <p className="text-gray-600">
                  Enterprise-grade security ensures your data is always protected with encryption,
                  regular backups, and strict access controls.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in animate-delay-200">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <img
                  src="/lovable-uploads/45ec7726-fda8-467a-a017-fa8c62c51247.png"
                  alt="Real-Time Tracking"
                  className="h-40 w-auto object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Monitor leave balances, pending requests, and team availability in real-time
                  for better resource planning.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <BarChart3 className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Insightful Analytics</h3>
                <p className="text-gray-600">
                  Comprehensive reports and dashboards that help you identify trends and make
                  data-driven decisions about leave policies.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in animate-delay-100">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <Calendar className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Calendar Integration</h3>
                <p className="text-gray-600">
                  Seamlessly integrates with popular calendar applications to keep everyone
                  informed about team availability.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] animate-fade-in animate-delay-200">
              <div className="h-48 p-4 flex items-center justify-center bg-blue-gradient">
                <Smartphone className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue mb-3">Mobile Accessibility</h3>
                <p className="text-gray-600">
                  Access the platform from anywhere with our responsive web application and
                  dedicated mobile apps for iOS and Android.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">Advanced Capabilities</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Specialized features that take your leave management to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in">
              <Mail className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">Automated Notifications</h3>
                <p className="text-gray-600">
                  Keep everyone informed with customizable email and push notifications for leave
                  requests, approvals, rejections, and reminders.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in animate-delay-100">
              <SearchCheck className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">Policy Enforcement</h3>
                <p className="text-gray-600">
                  Automatically enforce leave policies, accrual rules, and balance calculations
                  to ensure consistency and compliance.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in">
              <FileText className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">Document Management</h3>
                <p className="text-gray-600">
                  Store and manage supporting documents for leave requests, such as medical
                  certificates, directly within the platform.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in animate-delay-100">
              <Clock className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">Time-Off Management</h3>
                <p className="text-gray-600">
                  Handle various types of absences including vacation, sick leave, parental leave,
                  and custom categories specific to your organization.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in">
              <Zap className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">Workflow Automation</h3>
                <p className="text-gray-600">
                  Create custom approval workflows based on leave type, duration, department,
                  or any other criteria specific to your organization.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 animate-fade-in animate-delay-100">
              <MessageSquare className="flex-shrink-0 w-10 h-10 text-blue mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue mb-2">In-App Communication</h3>
                <p className="text-gray-600">
                  Facilitate discussions about leave requests directly within the platform to
                  keep all relevant communication in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-gradient rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in">
            <div className="text-center">
              <h3 className="text-white heading-3 mb-4">
                Ready to experience these features firsthand?
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Start your free trial today and see how LeaveManage can transform your leave management process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-white text-blue hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
