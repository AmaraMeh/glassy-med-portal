import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Calendar,
  Clock,
  ArrowRight,
  Pin,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";

const LatestAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: "Midterm Examination Schedule Released",
      content: "The midterm examination schedule for all years has been published. Please check your respective year sections for detailed timetables.",
      type: "important",
      icon: AlertCircle,
      date: "2025-01-08",
      time: "09:30",
      pinned: true,
      year: "All Years",
      color: "bg-destructive/10 text-destructive border-destructive/20"
    },
    {
      id: 2,
      title: "New Digital Library Resources Available",
      content: "Access to Harrison's Principles of Internal Medicine 21st Edition and other premium medical resources is now available through the digital library.",
      type: "info",
      icon: Info,
      date: "2025-01-07",
      time: "14:15",
      pinned: false,
      year: "Years 3-7",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      id: 3,
      title: "Clinical Skills Workshop - Registration Open",
      content: "Registration is now open for the advanced clinical skills workshop. Limited spots available. First come, first served basis.",
      type: "success",
      icon: CheckCircle,
      date: "2025-01-06",
      time: "11:45",
      pinned: false,
      year: "Years 4-6",
      color: "bg-medical-green/10 text-medical-green border-medical-green/20"
    },
    {
      id: 4,
      title: "Research Symposium Call for Abstracts",
      content: "The annual medical research symposium is accepting abstract submissions. Deadline for submission is January 31st, 2025.",
      type: "info",
      icon: Info,
      date: "2025-01-05",
      time: "16:20",
      pinned: false,
      year: "Years 6-7",
      color: "bg-secondary-accent/10 text-secondary-accent border-secondary-accent/20"
    },
    {
      id: 5,
      title: "Campus Wi-Fi Maintenance Schedule",
      content: "Planned maintenance of campus Wi-Fi infrastructure will occur on January 12th from 2:00 AM to 6:00 AM. Limited connectivity expected.",
      type: "important",
      icon: AlertCircle,
      date: "2025-01-04",
      time: "10:00",
      pinned: false,
      year: "All Years",
      color: "bg-accent-highlight/10 text-accent-highlight border-accent-highlight/20"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <section id="announcements" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-4">
            <Megaphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            News &
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Announcements
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and important information from the faculty.
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <Card 
              key={announcement.id}
              className={`
                glass-card-hover p-6 rounded-2xl relative overflow-hidden animate-scale-in
                ${announcement.pinned ? 'ring-2 ring-primary/20' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Pinned indicator */}
              {announcement.pinned && (
                <div className="absolute top-4 right-4">
                  <Pin className="w-4 h-4 text-primary" />
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon and Type */}
                <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-2 md:items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${announcement.color}`}>
                    <announcement.icon className="w-6 h-6" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${announcement.color} border-current hidden md:inline-flex`}
                  >
                    {announcement.year}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {announcement.content}
                      </p>
                    </div>

                    {/* Mobile year badge */}
                    <Badge 
                      variant="outline" 
                      className={`${announcement.color} border-current md:hidden`}
                    >
                      {announcement.year}
                    </Badge>
                  </div>

                  {/* Meta information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(announcement.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{announcement.time}</span>
                      </div>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary-dark group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button 
            size="lg" 
            className="gradient-primary shadow-float hover:shadow-glass-lg group"
          >
            View All Announcements
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent-highlight rounded-full opacity-20 animate-float hidden lg:block"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 gradient-secondary rounded-full opacity-30 animate-float hidden lg:block" style={{ animationDelay: "4s" }}></div>
    </section>
  );
};

export default LatestAnnouncements;