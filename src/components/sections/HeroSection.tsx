import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Megaphone,
  ArrowRight,
  Play,
  Users,
  Award,
  Clock
} from "lucide-react";

const HeroSection = () => {
  const quickActions = [
    {
      icon: BookOpen,
      title: "Courses",
      description: "Access your medical courses by year",
      color: "gradient-primary",
      href: "/courses"
    },
    {
      icon: Calendar,
      title: "Timetable",
      description: "View your schedule and plan your day",
      color: "gradient-secondary",
      href: "/timetable"
    },
    {
      icon: FileText,
      title: "Resources",
      description: "Download PDFs, videos and study materials",
      color: "bg-accent-highlight",
      href: "/resources"
    },
    {
      icon: Megaphone,
      title: "News",
      description: "Latest announcements and updates",
      color: "bg-medical-pink",
      href: "/#announcements"
    }
  ];

  const stats = [
    { icon: Users, number: "2,500+", label: "Students" },
    { icon: BookOpen, number: "180+", label: "Courses" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: Clock, number: "24/7", label: "Access" }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">E-CAMPUS 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Faculty of
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Law & Political Sciences
                </span>
              </h1>
              
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  University of Béjaïa Interactive Student Portal
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Your modern, comprehensive platform for law and political sciences education. 
                  Access courses, resources, timetables, and everything you need for academic success.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary shadow-lg hover:shadow-xl text-lg px-8 py-6 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/20 hover:border-primary/40 text-lg px-8 py-6 group bg-white"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-gray-50 p-4 rounded-xl text-center animate-scale-in border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Quick Access</h3>
              <p className="text-gray-600">Jump straight to what you need</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="bg-white border-2 border-gray-100 hover:border-primary/20 p-6 rounded-2xl group block animate-scale-in shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                    {action.description}
                  </p>
                  
                  <ArrowRight className="w-4 h-4 text-primary mt-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background decorations */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-primary/5 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-secondary/5 rounded-full animate-float hidden lg:block" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default HeroSection;