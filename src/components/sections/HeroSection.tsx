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
import { Link } from "react-router-dom";

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
      href: "/announcements"
    }
  ];

  const stats = [
    { icon: Users, number: "2,500+", label: "Students" },
    { icon: BookOpen, number: "180+", label: "Courses" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: Clock, number: "24/7", label: "Access" }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-background">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 bg-white dark:bg-card border border-glass-border px-4 py-2 rounded-full shadow-float">
                <div className="w-2 h-2 bg-medical-green rounded-full animate-glow"></div>
                <span className="text-sm font-medium">E-CAMPUS 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tight">
                University of Béjaïa
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Interactive Student Portal
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl font-medium">
                Your modern, comprehensive platform for medical education. Access courses, resources, timetables, and everything you need for academic success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary shadow-float hover:shadow-glass-lg text-lg px-8 py-6 group"
                asChild
              >
                <Link to="/courses">
						Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-card-hover text-lg px-8 py-6 group border-glass-border"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-white dark:bg-card border border-glass-border p-4 rounded-xl text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Quick Access</h3>
              <p className="text-muted-foreground">Jump straight to what you need</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="glass-card-hover p-6 rounded-2xl group block animate-scale-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-float`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {action.description}
                  </p>
                  
                  <ArrowRight className="w-4 h-4 text-primary mt-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background accents */}
      <div className="absolute -top-10 -right-10 w-40 h-40 gradient-secondary rounded-full opacity-10 blur-2xl hidden lg:block"></div>
      <div className="absolute bottom-0 left-10 w-24 h-24 bg-accent-highlight rounded-full opacity-15 blur-xl hidden lg:block" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default HeroSection;