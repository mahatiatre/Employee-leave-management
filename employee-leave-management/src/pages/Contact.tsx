
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/Button";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-blue-gradient py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center animate-fade-in">
            <h1 className="heading-1 text-white mb-6">Contact Us</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help!
              Our team is ready to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-fade-in">
              <h2 className="heading-2 text-blue mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below, and we'll get back to you as soon as possible.
                Whether you have questions about our features, pricing, or need technical support,
                we're eager to assist you.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message should be at least 10 characters"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent resize-none"
                    placeholder="Tell us what you need assistance with..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="animate-fade-in animate-delay-200">
              <div className="bg-gray-50 p-8 rounded-xl shadow-md h-full">
                <h3 className="text-2xl font-bold text-blue mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue rounded-full p-3 text-white">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">+123-456-7890</p>
                      <p className="text-gray-600">Monday-Friday, 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue rounded-full p-3 text-white">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">hello@reallyreatsite.com</p>
                      <p className="text-gray-600">support@reallyreatsite.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue rounded-full p-3 text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600">123 Anywhere St., Any City</p>
                      <p className="text-gray-600">Suite 123, State, Country</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="font-medium text-gray-900 mb-4">Connect With Us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="bg-blue text-white p-2 rounded-full hover:bg-blue-dark transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue text-white p-2 rounded-full hover:bg-blue-dark transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue text-white p-2 rounded-full hover:bg-blue-dark transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue text-white p-2 rounded-full hover:bg-blue-dark transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="heading-2 text-blue mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Find quick answers to common questions about LeaveManage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
              <h3 className="text-lg font-semibold text-blue mb-3">How quickly can I get started?</h3>
              <p className="text-gray-600">
                You can be up and running in as little as 15 minutes. Our onboarding process is
                designed to be simple and straightforward, with guided setup steps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in animate-delay-100">
              <h3 className="text-lg font-semibold text-blue mb-3">Do you offer customer support?</h3>
              <p className="text-gray-600">
                Yes! We offer 24/7 support via email, and live chat support during business hours.
                Our enterprise plans include dedicated account managers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
              <h3 className="text-lg font-semibold text-blue mb-3">Can I customize leave policies?</h3>
              <p className="text-gray-600">
                Absolutely! LeaveManage allows for complete customization of leave types, accrual rules,
                approval workflows, and more to match your organization's specific policies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in animate-delay-100">
              <h3 className="text-lg font-semibold text-blue mb-3">Is there a free trial available?</h3>
              <p className="text-gray-600">
                Yes, we offer a 14-day free trial with full access to all features. No credit card
                required to start, and you can upgrade anytime during or after the trial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
