import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  Play, 
  Download,
  FileText,
  Video,
  Image,
  ArrowRight,
  Calendar,
  GraduationCap,
  Brain,
  Heart,
  Eye,
  Baby,
  Activity,
  Microscope,
  FlaskConical,
  UserCheck
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";

const Courses = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState<'pre-clinical' | 'clinical'>('pre-clinical');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const preClinicalYears = [
    { year: 1, title: "First Year", icon: Microscope, color: "bg-blue-500" },
    { year: 2, title: "Second Year", icon: Brain, color: "bg-indigo-500" },
    { year: 3, title: "Third Year", icon: FlaskConical, color: "bg-purple-500" }
  ];

  const clinicalYears = [
    { year: 4, title: "Fourth Year", icon: Heart, color: "bg-red-500" },
    { year: 5, title: "Fifth Year", icon: Eye, color: "bg-orange-500" },
    { year: 6, title: "Sixth Year", icon: Baby, color: "bg-pink-500" },
    { year: 7, title: "Seventh Year", icon: UserCheck, color: "bg-green-500" }
  ];

  const mockCourses = [
    {
      id: 1,
      title: "Human Anatomy",
      description: "Comprehensive study of human body structure and organization",
      year: 1,
      subject: "Anatomy",
      instructor: "Dr. Sarah Johnson",
      duration: "16 weeks",
      students: 450,
      rating: 4.8,
      resources: [
        { type: "pdf", name: "Anatomy Textbook", icon: FileText },
        { type: "video", name: "Dissection Guide", icon: Video },
        { type: "image", name: "Anatomical Atlas", icon: Image }
      ],
      topics: ["Skeletal System", "Muscular System", "Nervous System", "Cardiovascular System"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Physiology Fundamentals",
      description: "Understanding the functions and mechanisms of human body systems",
      year: 1,
      subject: "Physiology",
      instructor: "Dr. Michael Chen",
      duration: "14 weeks",
      students: 420,
      rating: 4.7,
      resources: [
        { type: "pdf", name: "Physiology Notes", icon: FileText },
        { type: "video", name: "Lab Demonstrations", icon: Video }
      ],
      topics: ["Cell Physiology", "Neurophysiology", "Cardiovascular Physiology", "Respiratory Physiology"],
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Biochemistry",
      description: "Study of chemical processes within living organisms",
      year: 1,
      subject: "Biochemistry",
      instructor: "Dr. Emily Rodriguez",
      duration: "12 weeks",
      students: 380,
      rating: 4.6,
      resources: [
        { type: "pdf", name: "Biochemistry Manual", icon: FileText },
        { type: "video", name: "Molecular Biology", icon: Video }
      ],
      topics: ["Protein Structure", "Enzyme Kinetics", "Metabolism", "Molecular Biology"],
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Pathology",
      description: "Study of disease processes and their effects on the body",
      year: 2,
      subject: "Pathology",
      instructor: "Dr. James Wilson",
      duration: "18 weeks",
      students: 360,
      rating: 4.9,
      resources: [
        { type: "pdf", name: "Pathology Atlas", icon: FileText },
        { type: "image", name: "Histopathology Slides", icon: Image },
        { type: "video", name: "Case Studies", icon: Video }
      ],
      topics: ["General Pathology", "Systemic Pathology", "Clinical Pathology", "Molecular Pathology"],
      color: "bg-red-500"
    },
    {
      id: 5,
      title: "Pharmacology",
      description: "Study of drugs and their effects on biological systems",
      year: 2,
      subject: "Pharmacology",
      instructor: "Dr. Lisa Thompson",
      duration: "15 weeks",
      students: 340,
      rating: 4.7,
      resources: [
        { type: "pdf", name: "Drug Database", icon: FileText },
        { type: "video", name: "Drug Mechanisms", icon: Video }
      ],
      topics: ["Pharmacokinetics", "Pharmacodynamics", "Drug Interactions", "Clinical Pharmacology"],
      color: "bg-orange-500"
    },
    {
      id: 6,
      title: "Internal Medicine",
      description: "Comprehensive study of adult medical conditions",
      year: 4,
      subject: "Internal Medicine",
      instructor: "Dr. Robert Davis",
      duration: "20 weeks",
      students: 320,
      rating: 4.8,
      resources: [
        { type: "pdf", name: "Clinical Guidelines", icon: FileText },
        { type: "video", name: "Patient Cases", icon: Video },
        { type: "image", name: "Clinical Images", icon: Image }
      ],
      topics: ["Cardiology", "Gastroenterology", "Endocrinology", "Rheumatology"],
      color: "bg-indigo-500"
    },
    {
      id: 7,
      title: "Surgery",
      description: "Principles and practice of surgical procedures",
      year: 4,
      subject: "Surgery",
      instructor: "Dr. Amanda Foster",
      duration: "22 weeks",
      students: 300,
      rating: 4.9,
      resources: [
        { type: "pdf", name: "Surgical Techniques", icon: FileText },
        { type: "video", name: "Surgical Procedures", icon: Video }
      ],
      topics: ["General Surgery", "Orthopedic Surgery", "Cardiovascular Surgery", "Neurosurgery"],
      color: "bg-pink-500"
    },
    {
      id: 8,
      title: "Pediatrics",
      description: "Medical care of infants, children, and adolescents",
      year: 6,
      subject: "Pediatrics",
      instructor: "Dr. David Martinez",
      duration: "16 weeks",
      students: 280,
      rating: 4.8,
      resources: [
        { type: "pdf", name: "Pediatric Guidelines", icon: FileText },
        { type: "video", name: "Child Development", icon: Video }
      ],
      topics: ["Neonatology", "Child Development", "Pediatric Emergencies", "Adolescent Medicine"],
      color: "bg-yellow-500"
    }
  ];

  const subjects = Array.from(new Set(mockCourses.map(course => course.subject)));

  const filteredCourses = mockCourses.filter(course => {
    const matchesYear = course.year === selectedYear;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || course.subject === selectedSubject;
    
    return matchesYear && matchesSearch && matchesSubject;
  });

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedSubject(null);
  };

  const handleCycleChange = (cycle: 'pre-clinical' | 'clinical') => {
    setSelectedCycle(cycle);
    setSelectedYear(cycle === 'pre-clinical' ? 1 : 4);
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Course Catalog</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Medical
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore comprehensive medical courses designed to provide you with the knowledge and skills needed for your medical career.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary"
                />
              </div>

              {/* Cycle Selector */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-2xl p-2">
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedCycle === 'pre-clinical' ? 'default' : 'ghost'}
                      className={selectedCycle === 'pre-clinical' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                      onClick={() => handleCycleChange('pre-clinical')}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Pre-Clinical (Years 1-3)
                    </Button>
                    <Button
                      variant={selectedCycle === 'clinical' ? 'default' : 'ghost'}
                      className={selectedCycle === 'clinical' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                      onClick={() => handleCycleChange('clinical')}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Clinical (Years 4-7)
                    </Button>
                  </div>
                </div>
              </div>

              {/* Year Selector */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                  <div className="flex space-x-2">
                    {(selectedCycle === 'pre-clinical' ? preClinicalYears : clinicalYears).map((year) => (
                      <Button
                        key={year.year}
                        variant={selectedYear === year.year ? 'default' : 'ghost'}
                        className={selectedYear === year.year ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                        onClick={() => handleYearChange(year.year)}
                      >
                        <year.icon className="w-4 h-4 mr-2" />
                        Year {year.year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Filter */}
              {subjects.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant={!selectedSubject ? 'default' : 'outline'}
                    size="sm"
                    className={!selectedSubject ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                    onClick={() => setSelectedSubject(null)}
                  >
                    All Subjects
                  </Button>
                  {subjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={selectedSubject === subject ? 'default' : 'outline'}
                      size="sm"
                      className={selectedSubject === subject ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCycle === 'pre-clinical' ? 'Pre-Clinical' : 'Clinical'} Courses - Year {selectedYear}
              </h2>
              <p className="text-gray-600">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
                    <div className="p-6 space-y-4">
                      {/* Course Header */}
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="outline" className="border-gray-200 text-gray-600">
                          {course.subject}
                        </Badge>
                      </div>

                      {/* Course Info */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{course.duration}</div>
                          <div className="text-xs text-gray-500">Duration</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{course.students}</div>
                          <div className="text-xs text-gray-500">Students</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{course.rating}</div>
                          <div className="text-xs text-gray-500 flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            Rating
                          </div>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{course.instructor}</span>
                      </div>

                      {/* Topics */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Topics:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {topic}
                            </Badge>
                          ))}
                          {course.topics.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              +{course.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Resources:</h4>
                        <div className="flex space-x-2">
                          {course.resources.map((resource, index) => (
                            <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
                              <resource.icon className="w-3 h-3" />
                              <span>{resource.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-4">
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Start Course
                        </Button>
                        <Button variant="outline" className="border-gray-200 hover:border-primary/50">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;