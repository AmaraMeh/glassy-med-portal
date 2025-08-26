import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, BookOpen, FileText, Calendar, Plus } from "lucide-react";

const sections = [
	{ key: "announcements", title: "Announcements", icon: Megaphone, description: "Create, edit, and publish announcements.", action: "New Announcement" },
	{ key: "courses", title: "Courses", icon: BookOpen, description: "Manage courses and assignments.", action: "Add Course" },
	{ key: "resources", title: "Resources", icon: FileText, description: "Upload and organize study materials.", action: "Upload Resource" },
	{ key: "timetable", title: "Timetable", icon: Calendar, description: "Configure and publish schedules.", action: "New Timetable" },
];

const Admin = () => {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="text-center mb-10">
					<h1 className="text-3xl md:text-5xl font-bold">Admin Panel</h1>
					<p className="text-muted-foreground mt-2">Manage your portal using mock controls.</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sections.map((s, i) => (
						<Card key={s.key} className="glass-card rounded-2xl p-6 animate-scale-in" style={{animationDelay: `${i*0.05}s`}}>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
									<s.icon className="w-6 h-6 text-white" />
								</div>
								<div>
									<h2 className="text-lg font-semibold">{s.title}</h2>
									<p className="text-muted-foreground text-sm">{s.description}</p>
								</div>
							</div>
							<div className="mt-4">
								<Button className="gradient-primary">
									<Plus className="w-4 h-4 mr-1" /> {s.action}
								</Button>
							</div>
						</Card>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Admin;