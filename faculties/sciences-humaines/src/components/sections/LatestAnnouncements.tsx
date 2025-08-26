import { useState } from "react";
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
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
  Tag
} from "lucide-react";

const LatestAnnouncements = () => {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);

  const announcements = [
    {
      id: 1,
      title: "Midterm Examination Schedule Released",
      content: "The midterm examination schedule for all years has been published. Please check your respective year sections for detailed timetables.",
      fullContent: `The midterm examination schedule for all years has been published. Please check your respective year sections for detailed timetables.

Important Information:
• All examinations will be held in the main lecture halls
• Students must arrive 30 minutes before the scheduled time
• Bring your student ID and necessary stationery
• No electronic devices are allowed in examination halls
• Results will be published within 2 weeks after the examination

For any queries regarding the schedule, please contact the academic office or your year coordinator.`,
      type: "important",
      icon: AlertCircle,
      date: "2025-01-08",
      time: "09:30",
      pinned: true,
      year: "All Years",
      author: "Academic Office",
      tags: ["Examination", "Schedule", "Important"],
      color: "bg-red-500/10 text-red-600 border-red-500/20",
      fullColor: "bg-red-500"
    },
    {
      id: 2,
      title: "New Digital Library Resources Available",
      content: "Access to Harrison's Principles of Internal Medicine 21st Edition and other premium medical resources is now available through the digital library.",
      fullContent: `Access to Harrison's Principles of Internal Medicine 21st Edition and other premium medical resources is now available through the digital library.

New Resources Added:
• Harrison's Principles of Internal Medicine (21st Edition)
• Gray's Anatomy for Students (4th Edition)
• Robbins Basic Pathology (10th Edition)
• Netter's Atlas of Human Anatomy (8th Edition)
• Oxford Handbook of Clinical Medicine (10th Edition)

Access Instructions:
1. Login to your student portal
2. Navigate to the Resources section
3. Click on "Digital Library"
4. Use your student credentials to access premium content

These resources are available 24/7 and can be accessed from any device with internet connection.`,
      type: "info",
      icon: Info,
      date: "2025-01-07",
      time: "14:15",
      pinned: false,
      year: "Years 3-7",
      author: "Library Services",
      tags: ["Library", "Resources", "Digital"],
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      fullColor: "bg-blue-500"
    },
    {
      id: 3,
      title: "Clinical Skills Workshop - Registration Open",
      content: "Registration is now open for the advanced clinical skills workshop. Limited spots available. First come, first served basis.",
      fullContent: `Registration is now open for the advanced clinical skills workshop. Limited spots available. First come, first served basis.

Workshop Details:
• Duration: 3 days (February 15-17, 2025)
• Location: Clinical Skills Center, Building A
• Capacity: 30 students per session
• Cost: Free for enrolled students

Skills Covered:
• Advanced physical examination techniques
• Clinical reasoning and diagnosis
• Patient communication skills
• Medical documentation
• Emergency procedures

Registration Deadline: January 25, 2025
To register, visit the student portal and navigate to the Events section.`,
      type: "success",
      icon: CheckCircle,
      date: "2025-01-06",
      time: "11:45",
      pinned: false,
      year: "Years 4-6",
      author: "Clinical Skills Department",
      tags: ["Workshop", "Clinical Skills", "Registration"],
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      fullColor: "bg-green-500"
    },
    {
      id: 4,
      title: "Research Symposium Call for Abstracts",
      content: "The annual medical research symposium is accepting abstract submissions. Deadline for submission is January 31st, 2025.",
      fullContent: `The annual medical research symposium is accepting abstract submissions. Deadline for submission is January 31st, 2025.

Symposium Details:
• Date: March 20-22, 2025
• Theme: "Advancing Medical Research in the Digital Age"
• Venue: University Conference Center

Abstract Categories:
• Basic Medical Sciences
• Clinical Research
• Public Health
• Medical Education
• Case Reports

Submission Guidelines:
• Abstract length: 250-300 words
• Format: Microsoft Word or PDF
• Include: Title, authors, affiliations, methods, results, conclusions
• Submit via: research.symposium@univ-bejaia.edu

Prizes will be awarded for the best presentations in each category.`,
      type: "info",
      icon: Info,
      date: "2025-01-05",
      time: "16:20",
      pinned: false,
      year: "Years 6-7",
      author: "Research Committee",
      tags: ["Research", "Symposium", "Abstracts"],
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      fullColor: "bg-purple-500"
    },
    {
      id: 5,
      title: "Campus Wi-Fi Maintenance Schedule",
      content: "Planned maintenance of campus Wi-Fi infrastructure will occur on January 12th from 2:00 AM to 6:00 AM. Limited connectivity expected.",
      fullContent: `Planned maintenance of campus Wi-Fi infrastructure will occur on January 12th from 2:00 AM to 6:00 AM. Limited connectivity expected.

Maintenance Details:
• Date: January 12, 2025
• Time: 2:00 AM - 6:00 AM
• Duration: 4 hours
• Affected areas: All campus buildings

What to expect:
• Intermittent connectivity during maintenance
• Complete service restoration by 6:00 AM
• No impact on emergency services
• Library computers will remain functional

Alternative study locations:
• University Library (wired connections available)
• Off-campus locations
• Mobile hotspot usage recommended

For urgent academic matters, please contact your department office directly.`,
      type: "important",
      icon: AlertCircle,
      date: "2025-01-04",
      time: "10:00",
      pinned: false,
      year: "All Years",
      author: "IT Services",
      tags: ["Maintenance", "Wi-Fi", "Infrastructure"],
      color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      fullColor: "bg-orange-500"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const toggleExpanded = (id: number) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
  };

  const handleRedirect = (announcement: any) => {
    // In a real application, this would redirect to a detailed page
    console.log(`Redirecting to detailed page for: ${announcement.title}`);
    // You can implement actual navigation here
    // navigate(`/announcements/${announcement.id}`);
  };

  return (
    <section id="announcements" className="py-20 relative bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Megaphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Latest Updates</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            News &
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Announcements
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and important information from the faculty.
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <Card 
              key={announcement.id}
              className={`
                bg-white border-2 hover:border-primary/20 p-6 rounded-2xl relative overflow-hidden animate-scale-in transition-all duration-300
                ${announcement.pinned ? 'ring-2 ring-primary/20' : 'border-gray-100'}
                ${expandedAnnouncement === announcement.id ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
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
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
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
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(announcement.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{announcement.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{announcement.author}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary-dark group"
                        onClick={() => handleRedirect(announcement)}
                      >
                        View Full
                        <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-primary"
                        onClick={() => toggleExpanded(announcement.id)}
                      >
                        {expandedAnnouncement === announcement.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedAnnouncement === announcement.id && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slide-up">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${announcement.fullColor}`}></div>
                          <span className="text-sm font-medium text-gray-700">Full Details</span>
                        </div>
                        
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {announcement.fullContent}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {announcement.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-end pt-2">
                          <Button 
                            className="bg-primary hover:bg-primary/90 text-white"
                            onClick={() => handleRedirect(announcement)}
                          >
                            Go to Full Page
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white shadow-lg group"
          >
            View All Announcements
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary/5 rounded-full animate-float hidden lg:block" style={{ animationDelay: "4s" }}></div>
    </section>
  );
};

export default LatestAnnouncements;