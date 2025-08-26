import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Users, 
  BookOpen, 
  FileText, 
  Megaphone, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Server,
  Monitor,
  Globe,
  Bell,
  Lock,
  Key,
  Palette,
  Globe2,
  Smartphone,
  Tablet,
  Laptop
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'resources', name: 'Resources', icon: FileText },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const stats = [
    { title: "Total Students", value: "2,847", change: "+12%", trend: "up", icon: Users },
    { title: "Active Courses", value: "156", change: "+5%", trend: "up", icon: BookOpen },
    { title: "Resources", value: "1,234", change: "+8%", trend: "up", icon: FileText },
    { title: "System Health", value: "98.5%", change: "+2%", trend: "up", icon: Activity }
  ];

  const recentActivities = [
    { id: 1, action: "New programming course added", user: "Dr. Sarah Johnson", time: "2 minutes ago", type: "course" },
    { id: 2, action: "Software development resource uploaded", user: "Dr. Michael Chen", time: "15 minutes ago", type: "resource" },
    { id: 3, action: "Tech workshop announcement published", user: "Admin", time: "1 hour ago", type: "announcement" },
    { id: 4, action: "New student registered", user: "Student Portal", time: "2 hours ago", type: "user" },
    { id: 5, action: "Server backup completed", user: "System", time: "3 hours ago", type: "system" }
  ];

  const mockUsers = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@univ-bejaia.edu", role: "Professor", department: "Computer Science", status: "active", avatar: "SJ" },
    { id: 2, name: "Dr. Michael Chen", email: "michael.chen@univ-bejaia.edu", role: "Associate Professor", department: "Software Engineering", status: "active", avatar: "MC" },
    { id: 3, name: "Dr. Emily Rodriguez", email: "emily.rodriguez@univ-bejaia.edu", role: "Assistant Professor", department: "Information Technology", status: "active", avatar: "ER" },
    { id: 4, name: "Dr. James Wilson", email: "james.wilson@univ-bejaia.edu", role: "Professor", department: "Architecture", status: "inactive", avatar: "JW" },
    { id: 5, name: "Dr. Lisa Thompson", email: "lisa.thompson@univ-bejaia.edu", role: "Lecturer", department: "Network Engineering", status: "active", avatar: "LT" }
  ];

  const mockCourses = [
    { id: 1, title: "Programming Fundamentals", instructor: "Dr. Sarah Johnson", year: 1, students: 450, status: "active", lastUpdated: "2024-12-15" },
    { id: 2, title: "Computer Architecture", instructor: "Dr. Michael Chen", year: 1, students: 420, status: "active", lastUpdated: "2024-12-14" },
    { id: 3, title: "Data Structures", instructor: "Dr. Emily Rodriguez", year: 1, students: 380, status: "active", lastUpdated: "2024-12-13" },
    { id: 4, title: "Software Engineering", instructor: "Dr. James Wilson", year: 2, students: 360, status: "draft", lastUpdated: "2024-12-12" },
    { id: 5, title: "Database Systems", instructor: "Dr. Lisa Thompson", year: 2, students: 340, status: "active", lastUpdated: "2024-12-11" }
  ];

  const mockResources = [
    { id: 1, title: "Programming Fundamentals Guide", type: "PDF", size: "45.2 MB", uploads: 1250, status: "published", lastUpdated: "2024-12-15" },
    { id: 2, title: "Computer Architecture Tutorials", type: "Video", size: "2.1 GB", uploads: 890, status: "published", lastUpdated: "2024-12-14" },
    { id: 3, title: "Data Structures Visual Guide", type: "Image", size: "156.7 MB", uploads: 2100, status: "published", lastUpdated: "2024-12-13" },
    { id: 4, title: "Software Engineering Case Studies", type: "PDF", size: "78.3 MB", uploads: 650, status: "draft", lastUpdated: "2024-12-12" },
    { id: 5, title: "Database Design Patterns", type: "Interactive", size: "12.5 MB", uploads: 1100, status: "published", lastUpdated: "2024-12-11" }
  ];

  const mockAnnouncements = [
    { id: 1, title: "Programming Competition Registration", author: "Computer Science Department", status: "published", views: 1250, date: "2024-12-15" },
    { id: 2, title: "New Software Development Lab", author: "IT Services", status: "published", views: 890, date: "2024-12-14" },
    { id: 3, title: "Hackathon Workshop", author: "Student Affairs", status: "draft", views: 0, date: "2024-12-13" },
    { id: 4, title: "Tech Innovation Symposium", author: "Research Committee", status: "published", views: 650, date: "2024-12-12" },
    { id: 5, title: "Server Maintenance Notice", author: "IT Services", status: "published", views: 1100, date: "2024-12-11" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'resource': return FileText;
      case 'announcement': return Megaphone;
      case 'user': return Users;
      case 'system': return Settings;
      default: return Activity;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 bg-white border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="p-6 bg-white border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ActivityIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">by {activity.user}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Web Server</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Database</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">File Storage</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Email Service</span>
              </div>
              <span className="text-sm text-yellow-600">Maintenance</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
            <Button variant="outline" className="border-gray-200 hover:border-primary/50">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
            <Button variant="outline" className="border-gray-200 hover:border-primary/50">
              <Megaphone className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
            <Button variant="outline" className="border-gray-200 hover:border-primary/50">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="border-gray-200 hover:border-primary/50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{user.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="grid gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} className="p-6 bg-white border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>Instructor: {course.instructor}</div>
                  <div>Year: {course.year}</div>
                  <div>Students: {course.students}</div>
                  <div>Updated: {formatDate(course.lastUpdated)}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <div className="grid gap-6">
        {mockResources.map((resource) => (
          <Card key={resource.id} className="p-6 bg-white border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  <Badge className={getStatusColor(resource.status)}>
                    {resource.status}
                  </Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>Type: {resource.type}</div>
                  <div>Size: {resource.size}</div>
                  <div>Downloads: {resource.uploads}</div>
                  <div>Updated: {formatDate(resource.lastUpdated)}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Announcement Management</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="grid gap-6">
        {mockAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="p-6 bg-white border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <Badge className={getStatusColor(announcement.status)}>
                    {announcement.status}
                  </Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>Author: {announcement.author}</div>
                  <div>Views: {announcement.views}</div>
                  <div>Date: {formatDate(announcement.date)}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      
      <div className="grid gap-6">
        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <Input defaultValue="University of Béjaïa Medical Portal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <Input defaultValue="admin@univ-bejaia.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <Input defaultValue="Africa/Algiers" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Require 2FA for all users</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
              </div>
              <Input defaultValue="30" className="w-20" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Maintenance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Automatic Backups</h4>
                <p className="text-sm text-gray-600">Daily database backups</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">System Maintenance</h4>
                <p className="text-sm text-gray-600">Schedule maintenance windows</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200 hover:border-primary/50">
                Schedule
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your medical education platform</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'courses' && renderCourses()}
              {activeTab === 'resources' && renderResources()}
              {activeTab === 'announcements' && renderAnnouncements()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;