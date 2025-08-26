import { useState } from "react";
import { Link } from "react-router-dom";
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
  Microscope,
  FlaskConical,
  UserCheck
} from "lucide-react";

const YearSelector = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState<'pre-clinical' | 'clinical'>('pre-clinical');

  const preClinicalYears = [
    {
      year: 1,
      title: "First Year",
      subtitle: "Foundation Sciences",
      icon: Microscope,
      description: "Basic medical sciences, anatomy, physiology",
      subjects: ["Anatomy", "Physiology", "Biochemistry", "Cell Biology"],
      students: 450,
      color: "bg-blue-500"
    },
    {
      year: 2,
      title: "Second Year",
      subtitle: "Pre-Clinical Sciences",
      icon: Brain,
      description: "Advanced basic sciences and pathology",
      subjects: ["Pathology", "Pharmacology", "Microbiology", "Immunology"],
      students: 420,
      color: "bg-indigo-500"
    },
    {
      year: 3,
      title: "Third Year",
      subtitle: "Clinical Introduction",
      icon: FlaskConical,
      description: "Introduction to clinical medicine and laboratory sciences",
      subjects: ["Internal Medicine", "Surgery", "Radiology", "Clinical Skills"],
      students: 380,
      color: "bg-purple-500"
    }
  ];

  const clinicalYears = [
    {
      year: 4,
      title: "Fourth Year",
      subtitle: "Clinical Rotations",
      icon: Heart,
      description: "Core clinical rotations and specialties",
      subjects: ["Cardiology", "Gastroenterology", "Neurology", "Psychiatry"],
      students: 360,
      color: "bg-red-500"
    },
    {
      year: 5,
      title: "Fifth Year",
      subtitle: "Advanced Clinical",
      icon: Eye,
      description: "Advanced clinical practice and subspecialties",
      subjects: ["Ophthalmology", "ENT", "Dermatology", "Emergency Medicine"],
      students: 340,
      color: "bg-orange-500"
    },
    {
      year: 6,
      title: "Sixth Year",
      subtitle: "Clinical Clerkship",
      icon: Baby,
      description: "Specialized rotations and electives",
      subjects: ["Pediatrics", "Obstetrics", "Gynecology", "Anesthesiology"],
      students: 320,
      color: "bg-pink-500"
    },
    {
      year: 7,
      title: "Seventh Year",
      subtitle: "Internship",
      icon: UserCheck,
      description: "Clinical internship and preparation for residency",
      subjects: ["Clinical Internship", "Research", "Board Preparation", "Ethics"],
      students: 290,
      color: "bg-green-500"
    }
  ];

  const allYears = [...preClinicalYears, ...clinicalYears];
  const selectedYearData = allYears.find(y => y.year === selectedYear);

  return (
    <section id="courses" className="py-20 relative bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Academic Years</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Choose Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Medical Year
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each year has its own curriculum, resources, and specialized content tailored to your level of study.
          </p>
        </div>

        {/* Cycle Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              <Button
                variant={selectedCycle === 'pre-clinical' ? 'default' : 'ghost'}
                className={selectedCycle === 'pre-clinical' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                onClick={() => {
                  setSelectedCycle('pre-clinical');
                  setSelectedYear(1);
                }}
              >
                <Brain className="w-4 h-4 mr-2" />
                Pre-Clinical (Years 1-3)
              </Button>
              <Button
                variant={selectedCycle === 'clinical' ? 'default' : 'ghost'}
                className={selectedCycle === 'clinical' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                onClick={() => {
                  setSelectedCycle('clinical');
                  setSelectedYear(4);
                }}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Clinical (Years 4-7)
              </Button>
            </div>
          </div>
        </div>

        {/* Year Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {(selectedCycle === 'pre-clinical' ? preClinicalYears : clinicalYears).map((year, index) => (
            <Button
              key={year.year}
              variant={selectedYear === year.year ? "default" : "outline"}
              className={`
                h-24 flex-col bg-white hover:bg-gray-50 border-2 animate-scale-in
                ${selectedYear === year.year ? 'bg-primary text-white border-primary shadow-lg' : 'border-gray-200 hover:border-primary/50'}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedYear(year.year)}
            >
              <year.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Year {year.year}</span>
              <span className="text-xs opacity-75">{year.subtitle}</span>
            </Button>
          ))}
        </div>

        {/* Selected Year Details */}
        {selectedYearData && (
          <div className="animate-fade-in">
            <Card className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Year Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl ${selectedYearData.color} flex items-center justify-center shadow-lg`}>
                      <selectedYearData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedYearData.title}</h3>
                      <p className="text-lg text-primary font-medium">{selectedYearData.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {selectedYearData.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">{selectedYearData.students}</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                      <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">{selectedYearData.subjects.length}</div>
                      <div className="text-sm text-gray-600">Core Subjects</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/courses">
                      <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Courses
                      </Button>
                    </Link>
                    <Link to="/timetable">
                      <Button variant="outline" className="border-gray-200 hover:border-primary/50 hover:bg-primary/5">
                        <Calendar className="w-4 h-4 mr-2" />
                        Timetable
                      </Button>
                    </Link>
                    <Link to="/resources">
                      <Button variant="outline" className="border-gray-200 hover:border-primary/50 hover:bg-primary/5">
                        <FileText className="w-4 h-4 mr-2" />
                        Resources
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Subject List */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Core Subjects</h4>
                  <div className="grid gap-3">
                    {selectedYearData.subjects.map((subject, index) => (
                      <div 
                        key={subject}
                        className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group border border-gray-100"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {subject}
                          </span>
                          <div className="flex items-center space-x-2 text-gray-500">
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
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/5 rounded-full animate-float hidden lg:block" style={{ animationDelay: "3s" }}></div>
    </section>
  );
};

export default YearSelector;