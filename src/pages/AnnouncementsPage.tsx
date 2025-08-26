import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, Clock, ArrowRight, Pin, AlertCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const mockAnnouncements = [
	{ id: 1, title: "Midterm Examination Schedule Released", content: "The midterm examination schedule for all years has been published.", icon: AlertCircle, date: "2025-01-08", time: "09:30", pinned: true, year: "All Years", color: "bg-destructive/10 text-destructive border-destructive/20" },
	{ id: 2, title: "New Digital Library Resources Available", content: "Access to premium medical resources is now available.", icon: Info, date: "2025-01-07", time: "14:15", pinned: false, year: "Years 3-7", color: "bg-primary/10 text-primary border-primary/20" },
];

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const AnnouncementsPage = () => {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="text-center mb-10">
					<div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-3">
						<Megaphone className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">Announcements</span>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold">Latest Announcements</h1>
					<p className="text-muted-foreground mt-2">Browse all and open details.</p>
				</div>

				<div className="space-y-6">
					{mockAnnouncements.map((a, i) => {
						const Icon = a.icon;
						return (
							<Card key={a.id} className={`glass-card-hover p-6 rounded-2xl relative overflow-hidden animate-scale-in ${a.pinned ? "ring-2 ring-primary/20" : ""}`} style={{ animationDelay: `${i * 0.05}s` }}>
								{a.pinned && (<div className="absolute top-4 right-4"><Pin className="w-4 h-4 text-primary" /></div>)}
								<div className="flex items-start gap-6">
									<div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-2 md:items-center">
										<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.color}`}><Icon className="w-6 h-6" /></div>
										<Badge variant="outline" className={`${a.color} border-current hidden md:inline-flex`}>{a.year}</Badge>
									</div>
									<div className="flex-1 space-y-3">
										<h3 className="text-xl font-semibold text-foreground"><Link to={`/announcements/${a.id}`} className="hover:text-primary transition-colors">{a.title}</Link></h3>
										<p className="text-muted-foreground leading-relaxed">{a.content}</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4 text-sm text-muted-foreground">
												<div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(a.date)}</span></div>
												<div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{a.time}</span></div>
											</div>
											<Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark group" asChild>
												<Link to={`/announcements/${a.id}`}>View Page <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
											</Button>
										</div>
										<Badge variant="outline" className={`${a.color} border-current md:hidden`}>{a.year}</Badge>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default AnnouncementsPage;