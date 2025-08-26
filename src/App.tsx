import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import Timetable from "./pages/Timetable";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import FacultyHome from "./pages/FacultyHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Faculty root site duplication */}
          <Route path="/faculties/:slug" element={<FacultyHome />} />
          <Route path="/faculties/:slug/courses" element={<Courses />} />
          <Route path="/faculties/:slug/resources" element={<Resources />} />
          <Route path="/faculties/:slug/timetable" element={<Timetable />} />
          <Route path="/faculties/:slug/admin" element={<Admin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
