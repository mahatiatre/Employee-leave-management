
import { Award, Clock, LucideIcon, ShieldCheck, Users } from "lucide-react";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

interface StatProps {
  value: string;
  label: string;
  icon: LucideIcon;
}

const Stat = ({ value, label, icon: Icon }: StatProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md animate-fade-in">
      <Icon className="w-10 h-10 text-blue mb-4" />
      <p className="text-3xl font-bold text-blue">{value}</p>
      <p className="text-gray-600 mt-2 text-center">{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-blue-gradient py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center animate-fade-in">
            <h1 className="heading-1 text-white mb-6">About LeaveManage</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              We're revolutionizing how businesses manage employee leave, making it simpler,
              more efficient, and stress-free for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 animate-fade-in">
              <h2 className="heading-2 text-blue mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                LeaveManage was founded in 2020 by a team of HR professionals and software engineers
                who experienced firsthand the challenges of managing employee leave requests,
                approvals, and tracking in growing organizations.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to simplify workforce management through intuitive technology that
                saves time, reduces errors, and improves overall employee satisfaction.
              </p>
              <p className="text-gray-600 mb-6">
                Today, LeaveManage serves thousands of businesses worldwide, from small startups to
                large enterprises, all benefiting from our streamlined approach to leave management.
              </p>
              <Link to="/features">
                <Button variant="outline" className="mt-4">Learn about our features</Button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 animate-scale-in">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">Why Companies Trust Us</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              LeaveManage has become the preferred solution for companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat value="10,000+" label="Active Users" icon={Users} />
            <Stat value="99.9%" label="Platform Uptime" icon={Clock} />
            <Stat value="500+" label="Enterprise Clients" icon={Award} />
            <Stat value="ISO 27001" label="Security Certified" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">Our Core Values</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              These principles guide everything we do at LeaveManage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md animate-fade-in">
              <h3 className="text-xl font-bold text-blue mb-4">Simplicity</h3>
              <p className="text-gray-600">
                We believe powerful software doesn't have to be complicated. Our platform is 
                intuitive and easy to use for everyone, from HR managers to employees.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md animate-fade-in animate-delay-100">
              <h3 className="text-xl font-bold text-blue mb-4">Transparency</h3>
              <p className="text-gray-600">
                We promote visibility across all levels of an organization, ensuring everyone 
                has the information they need to make informed decisions.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md animate-fade-in animate-delay-200">
              <h3 className="text-xl font-bold text-blue mb-4">Innovation</h3>
              <p className="text-gray-600">
                We're constantly evolving our platform based on customer feedback and industry 
                trends to deliver the most effective leave management solution possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-gradient rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in">
            <div className="text-center">
              <h3 className="text-white heading-3 mb-4">
                Ready to transform your leave management?
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using LeaveManage to streamline their HR processes
              </p>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-blue hover:bg-gray-100"
                >
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
