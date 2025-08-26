import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  BookOpen,
  Calendar,
  FileText,
  Megaphone
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { icon: BookOpen, label: "Courses", href: "#courses" },
    { icon: Calendar, label: "Timetable", href: "#timetable" },
    { icon: FileText, label: "Resources", href: "#resources" },
    { icon: Megaphone, label: "Announcements", href: "#announcements" }
  ];

  const academicLinks = [
    { label: "Academic Calendar", href: "#" },
    { label: "Examination Results", href: "#" },
    { label: "Student Handbook", href: "#" },
    { label: "Research Opportunities", href: "#" },
    { label: "Clinical Rotations", href: "#" },
    { label: "Library Services", href: "#" }
  ];

  const supportLinks = [
    { label: "Student Support", href: "#" },
    { label: "Technical Help", href: "#" },
    { label: "Contact Faculty", href: "#" },
    { label: "Feedback", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="relative pt-20 pb-8 mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-50"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-float">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Faculty of Medicine</h3>
                <p className="text-sm text-muted-foreground">University of Béjaïa</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Your comprehensive digital platform for medical education, providing access to courses, 
              resources, and academic support for students at all levels.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">University of Béjaïa, Algeria</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+213 (0) 34 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">contact@medecine.univ-bejaia.dz</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 glass-card-hover border-glass-border"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Quick Access</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Academic Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Academic</h4>
            <div className="space-y-3">
              {academicLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="glass-card p-4 rounded-xl">
              <h5 className="font-medium mb-2">Need Help?</h5>
              <p className="text-sm text-muted-foreground mb-3">
                Contact our support team for assistance.
              </p>
              <Button size="sm" className="gradient-primary w-full">
                <Mail className="w-4 h-4 mr-2" />
                Get Support
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © 2025 Faculty of Medicine - University of Béjaïa. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Developed by <span className="text-primary font-medium">Amara Mehdi</span> - E-CAMPUS Portal
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <span>University Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;