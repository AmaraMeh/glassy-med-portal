import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ArrowLeft, Calendar, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";

const mockAnnouncementMap: Record<string, any> = {
	"1": { id: 1, title: "Midterm Examination Schedule Released", content: "Full details about the midterm schedule, policies, and instructions.", type: "important", icon: AlertCircle, date: "2025-01-08", time: "09:30", year: "All Years", color: "bg-destructive/10 text-destructive border-destructive/20" },
	"2": { id: 2, title: "New Digital Library Resources Available", content: "How to access the digital library, login steps, and resource list.", type: "info", icon: Info, date: "2025-01-07", time: "14:15", year: "Years 3-7", color: "bg-primary/10 text-primary border-primary/20" },
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const AnnouncementDetail = () => {
	const { id } = useParams();
	const ann = id ? mockAnnouncementMap[id] : undefined;
	const Icon = ann?.icon ?? Megaphone;

	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="mb-6">
					<Link to="/announcements" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
						<ArrowLeft className="w-4 h-4 mr-1" /> Back to Announcements
					</Link>
				</div>

				{ann ? (
					<Card className="glass-card rounded-2xl p-6">
						<div className="flex items-start gap-4">
							<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ann.color}`}>
								<Icon className="w-6 h-6" />
							</div>
							<div className="space-y-2">
								<h1 className="text-2xl md:text-3xl font-bold">{ann.title}</h1>
								<p className="text-muted-foreground">{ann.content}</p>
								<div className="flex items-center gap-2 text-sm">
									<Badge variant="outline" className={`${ann.color} border-current`}>{ann.year}</Badge>
									<span className="text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(ann.date)}</span>
									<span className="text-muted-foreground inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {ann.time}</span>
								</div>
							</div>
						</div>
					</Card>
				) : (
					<p className="text-muted-foreground">Announcement not found.</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default AnnouncementDetail;