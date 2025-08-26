import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar,
  FileText,
  Stethoscope,
  Brain,
  Heart,
  Eye,
  Baby,
  Activity,
  Microscope
} from "lucide-react";
import { Link } from "react-router-dom";

const YearSelector = () => {
  const [selectedYear, setSelectedYear] = useState(1);

  const medicalYears = [
    {
      year: 1,
      title: "First Year",
      subtitle: "Pré‑clinique",
      icon: Microscope,
      description: "Basic medical sciences, anatomy, physiology",
      subjects: ["Anatomy", "Physiology", "Biochemistry", "Cell Biology"],
      students: 450,
      color: "gradient-primary"
    },
    {
      year: 2,
      title: "Second Year",
      subtitle: "Pré‑clinique",
      icon: Brain,
      description: "Advanced basic sciences and pathology",
      subjects: ["Pathology", "Pharmacology", "Microbiology", "Immunology"],
      students: 420,
      color: "gradient-secondary"
    },
    {
      year: 3,
      title: "Third Year",
      subtitle: "Pré‑clinique",
      icon: Stethoscope,
      description: "Introduction to clinical medicine",
      subjects: ["Internal Medicine", "Surgery", "Radiology", "Clinical Skills"],
      students: 380,
      color: "bg-accent-highlight"
    },
    {
      year: 4,
      title: "Fourth Year",
      subtitle: "Clinique",
      icon: Heart,
      description: "Core clinical rotations and specialties",
      subjects: ["Cardiology", "Gastroenterology", "Neurology", "Psychiatry"],
      students: 360,
      color: "bg-medical-pink"
    },
    {
      year: 5,
      title: "Fifth Year",
      subtitle: "Clinique",
      icon: Eye,
      description: "Advanced clinical practice and subspecialties",
      subjects: ["Ophthalmology", "ENT", "Dermatology", "Emergency Medicine"],
      students: 340,
      color: "bg-medical-green"
    },
    {
      year: 6,
      title: "Sixth Year",
      subtitle: "Clinique",
      icon: Baby,
      description: "Specialized rotations and electives",
      subjects: ["Pediatrics", "Obstetrics", "Gynecology", "Anesthesiology"],
      students: 320,
      color: "bg-medical-turquoise"
    },
    {
      year: 7,
      title: "Seventh Year",
      subtitle: "Clinique",
      icon: Activity,
      description: "Clinical internship and preparation for residency",
      subjects: ["Clinical Internship", "Research", "Board Preparation", "Ethics"],
      students: 290,
      color: "gradient-primary"
    }
  ];

  const selectedYearData = medicalYears.find(y => y.year === selectedYear);

  const isPreClinique = selectedYear <= 3;

  return (
    <section id="courses" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Academic Years</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Medical Year
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each year has its own curriculum, resources, and specialized content tailored to your level of study.
          </p>
        </div>

        {/* Cycle Labels */}
        <div className="flex justify-center gap-3 mb-6">
          <div className={`px-3 py-1 rounded-full text-sm border ${isPreClinique ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground border-glass-border'}`}>
            Cycle pré‑clinique (1–3)
          </div>
          <div className={`px-3 py-1 rounded-full text-sm border ${!isPreClinique ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground border-glass-border'}`}>
            Cycle clinique (4–7)
          </div>
        </div>

        {/* Year Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {medicalYears.map((year, index) => (
            <Button
              key={year.year}
              variant={selectedYear === year.year ? "default" : "outline"}
              className={`
                h-20 flex-col glass-card-hover border-glass-border animate-scale-in
                ${selectedYear === year.year ? 'gradient-primary shadow-float' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedYear(year.year)}
            >
              <year.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">Year {year.year}</span>
            </Button>
          ))}
        </div>

        {/* Selected Year Details */}
        {selectedYearData && (
          <div className="animate-fade-in">
            <Card className="glass-card p-8 rounded-3xl shadow-glass-lg">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Year Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl ${selectedYearData.color} flex items-center justify-center shadow-float`}>
                      <selectedYearData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedYearData.title}</h3>
                      <p className="text-lg text-primary">{selectedYearData.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-lg">
                    {selectedYearData.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold">{selectedYearData.students}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold">{selectedYearData.subjects.length}</div>
                      <div className="text-sm text-muted-foreground">Core Subjects</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="gradient-primary shadow-float" asChild>
                      <Link to="/courses">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Courses
                      </Link>
                    </Button>
                    <Button variant="outline" className="glass-card-hover border-glass-border" asChild>
                      <Link to="/timetable">
                        <Calendar className="w-4 h-4 mr-2" />
                        Timetable
                      </Link>
                    </Button>
                    <Button variant="outline" className="glass-card-hover border-glass-border" asChild>
                      <Link to="/resources">
                        <FileText className="w-4 h-4 mr-2" />
                        Resources
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Subject List */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">Core Subjects</h4>
                  <div className="grid gap-3">
                    {selectedYearData.subjects.map((subject, index) => (
                      <div 
                        key={subject}
                        className="glass-card p-4 rounded-xl hover:bg-glass-white/90 transition-all duration-300 cursor-pointer group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {subject}
                          </span>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <span className="text-xs">24 resources</span>
                            <BookOpen className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 gradient-secondary rounded-full opacity-10 animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-highlight rounded-full opacity-20 animate-float hidden lg:block" style={{ animationDelay: "3s" }}></div>
    </section>
  );
};

export default YearSelector;