import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Video, 
  Image, 
  Search, 
  Download, 
  Play, 
  Eye, 
  Calendar,
  User,
  Star,
  Filter,
  BookOpen,
  Microscope,
  Brain,
  Heart,
  Eye as EyeIcon,
  Baby,
  Activity,
  FlaskConical,
  UserCheck,
  Folder,
  File,
  Book,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const categories = [
    { id: "textbooks", name: "Textbooks", icon: Book, color: "bg-blue-500" },
    { id: "lectures", name: "Lecture Notes", icon: FileText, color: "bg-green-500" },
    { id: "videos", name: "Video Lectures", icon: Video, color: "bg-purple-500" },
    { id: "atlases", name: "Anatomical Atlases", icon: Image, color: "bg-red-500" },
    { id: "cases", name: "Case Studies", icon: File, color: "bg-orange-500" },
    { id: "exams", name: "Past Exams", icon: BookOpen, color: "bg-indigo-500" },
    { id: "guidelines", name: "Clinical Guidelines", icon: Folder, color: "bg-pink-500" }
  ];

  const years = [
    { year: 1, title: "First Year", icon: Microscope },
    { year: 2, title: "Second Year", icon: Brain },
    { year: 3, title: "Third Year", icon: FlaskConical },
    { year: 4, title: "Fourth Year", icon: Heart },
    { year: 5, title: "Fifth Year", icon: EyeIcon },
    { year: 6, title: "Sixth Year", icon: Baby },
    { year: 7, title: "Seventh Year", icon: UserCheck }
  ];

  const resourceTypes = [
    { id: "pdf", name: "PDF Documents", icon: FileText },
    { id: "video", name: "Videos", icon: Video },
    { id: "image", name: "Images", icon: Image },
    { id: "interactive", name: "Interactive", icon: Monitor }
  ];

  const mockResources = [
    {
      id: 1,
      title: "Gray's Anatomy for Students",
      description: "Comprehensive anatomical reference with detailed illustrations",
      category: "textbooks",
      year: 1,
      type: "pdf",
      size: "45.2 MB",
      downloads: 1250,
      rating: 4.9,
      author: "Dr. Richard Drake",
      date: "2024-12-15",
      tags: ["Anatomy", "Reference", "Illustrations"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Cardiovascular Physiology Lecture Series",
      description: "Complete video series covering cardiovascular system physiology",
      category: "videos",
      year: 1,
      type: "video",
      size: "2.1 GB",
      downloads: 890,
      rating: 4.8,
      author: "Dr. Sarah Johnson",
      date: "2024-12-10",
      tags: ["Physiology", "Cardiovascular", "Video Lectures"],
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Netter's Atlas of Human Anatomy",
      description: "High-resolution anatomical illustrations and diagrams",
      category: "atlases",
      year: 1,
      type: "image",
      size: "156.7 MB",
      downloads: 2100,
      rating: 4.9,
      author: "Frank H. Netter",
      date: "2024-12-08",
      tags: ["Anatomy", "Atlas", "Illustrations"],
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "Pathology Case Studies Collection",
      description: "Comprehensive collection of pathological case studies with images",
      category: "cases",
      year: 2,
      type: "pdf",
      size: "78.3 MB",
      downloads: 650,
      rating: 4.7,
      author: "Dr. James Wilson",
      date: "2024-12-05",
      tags: ["Pathology", "Case Studies", "Clinical"],
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "Pharmacology Drug Database",
      description: "Complete database of drugs with mechanisms, interactions, and dosages",
      category: "guidelines",
      year: 2,
      type: "interactive",
      size: "12.5 MB",
      downloads: 1100,
      rating: 4.8,
      author: "Department of Pharmacology",
      date: "2024-12-03",
      tags: ["Pharmacology", "Drugs", "Database"],
      color: "bg-pink-500"
    },
    {
      id: 6,
      title: "Internal Medicine Clinical Guidelines",
      description: "Updated clinical guidelines for internal medicine practice",
      category: "guidelines",
      year: 4,
      type: "pdf",
      size: "34.8 MB",
      downloads: 750,
      rating: 4.9,
      author: "Internal Medicine Department",
      date: "2024-12-01",
      tags: ["Internal Medicine", "Guidelines", "Clinical"],
      color: "bg-indigo-500"
    },
    {
      id: 7,
      title: "Surgical Techniques Video Library",
      description: "Comprehensive video library of surgical procedures and techniques",
      category: "videos",
      year: 4,
      type: "video",
      size: "4.2 GB",
      downloads: 520,
      rating: 4.9,
      author: "Dr. Amanda Foster",
      date: "2024-11-28",
      tags: ["Surgery", "Techniques", "Procedures"],
      color: "bg-purple-500"
    },
    {
      id: 8,
      title: "Pediatric Clinical Cases",
      description: "Collection of pediatric clinical cases with diagnostic approaches",
      category: "cases",
      year: 6,
      type: "pdf",
      size: "67.2 MB",
      downloads: 420,
      rating: 4.6,
      author: "Dr. David Martinez",
      date: "2024-11-25",
      tags: ["Pediatrics", "Clinical Cases", "Diagnosis"],
      color: "bg-orange-500"
    },
    {
      id: 9,
      title: "Biochemistry Lecture Notes",
      description: "Comprehensive lecture notes covering all biochemistry topics",
      category: "lectures",
      year: 1,
      type: "pdf",
      size: "28.9 MB",
      downloads: 980,
      rating: 4.7,
      author: "Dr. Emily Rodriguez",
      date: "2024-11-20",
      tags: ["Biochemistry", "Lecture Notes", "Study Material"],
      color: "bg-green-500"
    },
    {
      id: 10,
      title: "Past Examination Papers (2020-2024)",
      description: "Collection of past examination papers with answer keys",
      category: "exams",
      year: 3,
      type: "pdf",
      size: "89.1 MB",
      downloads: 1800,
      rating: 4.8,
      author: "Academic Office",
      date: "2024-11-15",
      tags: ["Examinations", "Past Papers", "Practice"],
      color: "bg-indigo-500"
    }
  ];

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    const matchesYear = !selectedYear || resource.year === selectedYear;
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesYear && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      case 'interactive': return Monitor;
      default: return File;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : File;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
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
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Study Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Medical
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access comprehensive study materials, textbooks, videos, and clinical resources to support your medical education.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search resources, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary"
                />
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedCategory ? 'default' : 'outline'}
                      size="sm"
                      className={!selectedCategory ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'outline'}
                        size="sm"
                        className={selectedCategory === category.id ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <category.icon className="w-3 h-3 mr-1" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedYear ? 'default' : 'outline'}
                      size="sm"
                      className={!selectedYear ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                      onClick={() => setSelectedYear(null)}
                    >
                      All Years
                    </Button>
                    {years.map((year) => (
                      <Button
                        key={year.year}
                        variant={selectedYear === year.year ? 'default' : 'outline'}
                        size="sm"
                        className={selectedYear === year.year ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                        onClick={() => setSelectedYear(year.year)}
                      >
                        <year.icon className="w-3 h-3 mr-1" />
                        Year {year.year}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedType ? 'default' : 'outline'}
                      size="sm"
                      className={!selectedType ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                      onClick={() => setSelectedType(null)}
                    >
                      All Types
                    </Button>
                    {resourceTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? 'default' : 'outline'}
                        size="sm"
                        className={selectedType === type.id ? 'bg-primary text-white' : 'border-gray-200 hover:border-primary/50'}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <type.icon className="w-3 h-3 mr-1" />
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Resources
              </h2>
              <p className="text-gray-600">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  const CategoryIcon = getCategoryIcon(resource.category);
                  
                  return (
                    <Card key={resource.id} className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
                      <div className="p-6 space-y-4">
                        {/* Resource Header */}
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl ${resource.color} flex items-center justify-center`}>
                            <TypeIcon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="outline" className="border-gray-200 text-gray-600">
                            {resource.type.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Resource Info */}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {resource.description}
                          </p>
                        </div>

                        {/* Resource Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{resource.size}</div>
                            <div className="text-xs text-gray-500">Size</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">{resource.downloads}</div>
                            <div className="text-xs text-gray-500">Downloads</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">{resource.rating}</div>
                            <div className="text-xs text-gray-500 flex items-center justify-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              Rating
                            </div>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{resource.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(resource.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="w-4 h-4" />
                            <span>{categories.find(c => c.id === resource.category)?.name}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-4">
                          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" className="border-gray-200 hover:border-primary/50">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {resource.type === 'video' && (
                            <Button variant="outline" className="border-gray-200 hover:border-primary/50">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
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

export default Resources;