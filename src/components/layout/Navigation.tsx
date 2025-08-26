import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Megaphone, 
  Settings, 
  Moon, 
  Sun,
  Menu,
  X,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFaculty } from "@/lib/faculty-context";
import { FACULTIES } from "@/lib/faculties";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const params = useParams();
  const { faculty } = useFaculty();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const slug = (params as any)?.slug as string | undefined;
  const base = slug ? `/faculties/${slug}` : "";
  const navItems = [
    { icon: BookOpen, label: "Courses", href: `${base}/courses` || "/courses" },
    { icon: Calendar, label: "Timetable", href: `${base}/timetable` || "/timetable" },
    { icon: FileText, label: "Resources", href: `${base}/resources` || "/resources" },
    { icon: Megaphone, label: "Announcements", href: slug ? `${base}#announcements` : "/#announcements" },
    { icon: Settings, label: "Admin", href: `${base}/admin` || "/admin" },
  ];

  const isActive = (href: string) => {
    if (href.endsWith("#announcements")) {
      return location.hash === "#announcements";
    }
    return location.pathname === href;
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={slug ? `/faculties/${slug}` : "/"} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">
                {faculty.displayName}
              </h1>
              <p className="text-xs text-gray-600">{faculty.frenchName}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className={cn(
                  "text-gray-700 hover:text-primary hover:bg-primary/5",
                  isActive(item.href) && "text-primary bg-primary/5"
                )}
                asChild
              >
                <Link to={item.href} className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Faculties dropdown */}
            <div className="hidden md:block relative">
              <select
                className="border border-gray-200 rounded-lg p-2 text-sm text-gray-700 hover:border-primary/50"
                value={slug || "medicine"}
                onChange={(e) => {
                  const next = e.target.value;
                  if (next === "medicine") {
                    window.location.href = "/";
                  } else {
                    window.location.href = `/faculties/${next}`;
                  }
                }}
              >
                <option value="medicine">Faculté de Médecine</option>
                {FACULTIES.filter(f => f.slug !== "medicine").map(f => (
                  <option key={f.slug} value={f.slug}>{f.frenchName}</option>
                ))}
              </select>
            </div>
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-10 h-10 p-0 text-gray-700 hover:text-primary hover:bg-primary/5"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Login button */}
            <Button 
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Sign In
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-10 h-10 p-0 text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl p-4 animate-slide-up shadow-lg border border-gray-100">
            <div className="flex flex-col space-y-2">
              <div className="mb-2">
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700"
                  value={slug || "medicine"}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next === "medicine") {
                      window.location.href = "/";
                    } else {
                      window.location.href = `/faculties/${next}`;
                    }
                  }}
                >
                  <option value="medicine">Faculté de Médecine</option>
                  {FACULTIES.filter(f => f.slug !== "medicine").map(f => (
                    <option key={f.slug} value={f.slug}>{f.frenchName}</option>
                  ))}
                </select>
              </div>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "justify-start text-gray-700 hover:text-primary hover:bg-primary/5",
                    isActive(item.href) && "text-primary bg-primary/5"
                  )}
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={item.href} className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
              <Button 
                className="bg-primary hover:bg-primary/90 text-white justify-start mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;