import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Grid,
  List,
  Filter,
  BookOpen,
  Microscope,
  Brain,
  Heart,
  Eye,
  Baby,
  Activity,
  FlaskConical,
  UserCheck,
  GraduationCap,
  Video,
  FileText,
  Users
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";

const Timetable = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState<'pre-clinical' | 'clinical'>('pre-clinical');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const preClinicalYears = [
    { year: 1, title: "First Year", icon: Microscope },
    { year: 2, title: "Second Year", icon: Brain },
    { year: 3, title: "Third Year", icon: FlaskConical }
  ];

  const clinicalYears = [
    { year: 4, title: "Fourth Year", icon: Heart },
    { year: 5, title: "Fifth Year", icon: Eye },
    { year: 6, title: "Sixth Year", icon: Baby },
    { year: 7, title: "Seventh Year", icon: UserCheck }
  ];

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00", 
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const mockTimetable = {
    1: {
      Monday: [
        { time: "08:00 - 09:00", subject: "Human Anatomy", type: "Lecture", room: "Lecture Hall A", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "09:00 - 10:00", subject: "Human Anatomy", type: "Practical", room: "Anatomy Lab 1", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "10:00 - 11:00", subject: "Physiology", type: "Lecture", room: "Lecture Hall B", instructor: "Dr. Michael Chen", color: "bg-green-500" },
        { time: "11:00 - 12:00", subject: "Physiology", type: "Tutorial", room: "Tutorial Room 3", instructor: "Dr. Michael Chen", color: "bg-green-500" },
        { time: "14:00 - 15:00", subject: "Biochemistry", type: "Lecture", room: "Lecture Hall C", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "15:00 - 16:00", subject: "Biochemistry", type: "Lab", room: "Biochemistry Lab", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" }
      ],
      Tuesday: [
        { time: "08:00 - 09:00", subject: "Cell Biology", type: "Lecture", room: "Lecture Hall A", instructor: "Dr. Lisa Thompson", color: "bg-indigo-500" },
        { time: "09:00 - 10:00", subject: "Cell Biology", type: "Practical", room: "Cell Biology Lab", instructor: "Dr. Lisa Thompson", color: "bg-indigo-500" },
        { time: "10:00 - 11:00", subject: "Medical Ethics", type: "Seminar", room: "Seminar Room 1", instructor: "Dr. Robert Davis", color: "bg-orange-500" },
        { time: "11:00 - 12:00", subject: "Medical Ethics", type: "Discussion", room: "Seminar Room 1", instructor: "Dr. Robert Davis", color: "bg-orange-500" },
        { time: "14:00 - 15:00", subject: "Anatomy", type: "Tutorial", room: "Tutorial Room 2", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "15:00 - 16:00", subject: "Physiology", type: "Lab", room: "Physiology Lab", instructor: "Dr. Michael Chen", color: "bg-green-500" }
      ],
      Wednesday: [
        { time: "08:00 - 09:00", subject: "Biochemistry", type: "Lecture", room: "Lecture Hall C", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "09:00 - 10:00", subject: "Biochemistry", type: "Practical", room: "Biochemistry Lab", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "10:00 - 11:00", subject: "Anatomy", type: "Lecture", room: "Lecture Hall A", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "11:00 - 12:00", subject: "Anatomy", type: "Dissection", room: "Dissection Lab", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "14:00 - 15:00", subject: "Physiology", type: "Lecture", room: "Lecture Hall B", instructor: "Dr. Michael Chen", color: "bg-green-500" },
        { time: "15:00 - 16:00", subject: "Physiology", type: "Tutorial", room: "Tutorial Room 4", instructor: "Dr. Michael Chen", color: "bg-green-500" }
      ],
      Thursday: [
        { time: "08:00 - 09:00", subject: "Medical Skills", type: "Workshop", room: "Skills Lab", instructor: "Dr. Amanda Foster", color: "bg-pink-500" },
        { time: "09:00 - 10:00", subject: "Medical Skills", type: "Practice", room: "Skills Lab", instructor: "Dr. Amanda Foster", color: "bg-pink-500" },
        { time: "10:00 - 11:00", subject: "Biochemistry", type: "Tutorial", room: "Tutorial Room 1", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "11:00 - 12:00", subject: "Cell Biology", type: "Lecture", room: "Lecture Hall A", instructor: "Dr. Lisa Thompson", color: "bg-indigo-500" },
        { time: "14:00 - 15:00", subject: "Anatomy", type: "Lecture", room: "Lecture Hall A", instructor: "Dr. Sarah Johnson", color: "bg-blue-500" },
        { time: "15:00 - 16:00", subject: "Physiology", type: "Lab", room: "Physiology Lab", instructor: "Dr. Michael Chen", color: "bg-green-500" }
      ],
      Friday: [
        { time: "08:00 - 09:00", subject: "Physiology", type: "Lecture", room: "Lecture Hall B", instructor: "Dr. Michael Chen", color: "bg-green-500" },
        { time: "09:00 - 10:00", subject: "Physiology", type: "Tutorial", room: "Tutorial Room 3", instructor: "Dr. Michael Chen", color: "bg-green-500" },
        { time: "10:00 - 11:00", subject: "Biochemistry", type: "Lecture", room: "Lecture Hall C", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "11:00 - 12:00", subject: "Biochemistry", type: "Lab", room: "Biochemistry Lab", instructor: "Dr. Emily Rodriguez", color: "bg-purple-500" },
        { time: "14:00 - 15:00", subject: "Medical Skills", type: "Workshop", room: "Skills Lab", instructor: "Dr. Amanda Foster", color: "bg-pink-500" },
        { time: "15:00 - 16:00", subject: "Medical Skills", type: "Assessment", room: "Skills Lab", instructor: "Dr. Amanda Foster", color: "bg-pink-500" }
      ],
      Saturday: [
        { time: "08:00 - 09:00", subject: "Self Study", type: "Independent", room: "Library", instructor: "Self", color: "bg-gray-500" },
        { time: "09:00 - 10:00", subject: "Tutorial Support", type: "Optional", room: "Tutorial Room 1", instructor: "Various", color: "bg-yellow-500" },
        { time: "10:00 - 11:00", subject: "Tutorial Support", type: "Optional", room: "Tutorial Room 2", instructor: "Various", color: "bg-yellow-500" },
        { time: "11:00 - 12:00", subject: "Tutorial Support", type: "Optional", room: "Tutorial Room 3", instructor: "Various", color: "bg-yellow-500" }
      ]
    }
  };

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      dates.push(day);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCurrentWeekSchedule = () => {
    return mockTimetable[selectedYear as keyof typeof mockTimetable] || {};
  };

  const weekDates = getWeekDates(currentWeek);
  const currentSchedule = getCurrentWeekSchedule();

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
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
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Academic Schedule</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Weekly
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Timetable
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                View your weekly schedule, track classes, and manage your academic activities efficiently.
              </p>
            </div>

            {/* Controls */}
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Year and Cycle Selector */}
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Cycle Selector */}
                <div className="bg-gray-100 rounded-2xl p-2">
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
                      Pre-Clinical
                    </Button>
                    <Button
                      variant={selectedCycle === 'clinical' ? 'default' : 'ghost'}
                      className={selectedCycle === 'clinical' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                      onClick={() => {
                        setSelectedCycle('clinical');
                        setSelectedYear(4);
                      }}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Clinical
                    </Button>
                  </div>
                </div>

                {/* Year Selector */}
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                  <div className="flex space-x-2">
                    {(selectedCycle === 'pre-clinical' ? preClinicalYears : clinicalYears).map((year) => (
                      <Button
                        key={year.year}
                        variant={selectedYear === year.year ? 'default' : 'ghost'}
                        className={selectedYear === year.year ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                        onClick={() => setSelectedYear(year.year)}
                      >
                        <year.icon className="w-4 h-4 mr-2" />
                        Year {year.year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Week Navigation */}
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigateWeek('prev')}
                  className="border-gray-200 hover:border-primary/50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Week
                </Button>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Week of {formatDate(weekDates[0])} - {formatDate(weekDates[5])}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentWeek.getFullYear()} Academic Year
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigateWeek('next')}
                  className="border-gray-200 hover:border-primary/50"
                >
                  Next Week
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className={viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4 mr-2" />
                      Grid View
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className={viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary'}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4 mr-2" />
                      List View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timetable */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                  <div className="p-4 text-center font-semibold text-gray-700">Time</div>
                  {days.map((day, index) => (
                    <div key={day} className="p-4 text-center border-l border-gray-200">
                      <div className="font-semibold text-gray-900">{day}</div>
                      <div className="text-sm text-gray-600">{formatDate(weekDates[index])}</div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="divide-y divide-gray-200">
                  {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="grid grid-cols-7 min-h-24">
                      <div className="p-4 text-center border-r border-gray-200 bg-gray-50">
                        <div className="text-sm font-medium text-gray-900">{timeSlot}</div>
                      </div>
                      {days.map((day) => {
                        const sessions = currentSchedule[day as keyof typeof currentSchedule] || [];
                        const session = sessions.find(s => s.time === timeSlot);
                        
                        return (
                          <div key={day} className="p-2 border-r border-gray-200 last:border-r-0">
                            {session ? (
                              <Card className={`${session.color} text-white p-3 h-full cursor-pointer hover:shadow-md transition-all duration-300`}>
                                <div className="space-y-2">
                                  <div className="font-semibold text-sm">{session.subject}</div>
                                  <div className="text-xs opacity-90">{session.type}</div>
                                  <div className="text-xs opacity-75 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {session.room}
                                  </div>
                                  <div className="text-xs opacity-75 flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    {session.instructor}
                                  </div>
                                </div>
                              </Card>
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                Free
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {days.map((day, dayIndex) => {
                  const sessions = currentSchedule[day as keyof typeof currentSchedule] || [];
                  
                  return (
                    <Card key={day} className="bg-white border border-gray-100">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{day}</h3>
                          <div className="text-sm text-gray-600">{formatDate(weekDates[dayIndex])}</div>
                        </div>
                        
                        {sessions.length > 0 ? (
                          <div className="space-y-3">
                            {sessions.map((session, index) => (
                              <div key={index} className={`${session.color} text-white p-4 rounded-xl`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h4 className="font-semibold">{session.subject}</h4>
                                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                        {session.type}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                      <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{session.time}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{session.room}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4" />
                                        <span>{session.instructor}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No scheduled sessions for this day</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Timetable;