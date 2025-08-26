import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, ArrowRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const mockResources = [
	{ id: "res-1", title: "Lecture Slides: Anatomy I - Week 1", course: "anatomy-101", type: "PDF", size: "3.2 MB" },
	{ id: "res-2", title: "Physiology Lab Manual", course: "physiology-101", type: "PDF", size: "5.4 MB" },
	{ id: "res-3", title: "Pathology Case Studies", course: "pathology-301", type: "DOCX", size: "1.1 MB" },
	{ id: "res-4", title: "Cardiology ECG Basics (Video)", course: "cardio-401", type: "Video", size: "12 min" },
];

function useQuery() {
	const { search } = useLocation();
	return new URLSearchParams(search);
}

const Resources = () => {
	const query = useQuery();
	const courseFilter = query.get("course");
	const filtered = courseFilter ? mockResources.filter(r => r.course === courseFilter) : mockResources;

	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="text-center mb-10">
					<div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-3">
						<FileText className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">Resources</span>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold">Study Resources</h1>
					<p className="text-muted-foreground mt-2">Browse downloadable materials by course.</p>
					{courseFilter && (
						<div className="mt-3 inline-flex items-center gap-2 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
							<span>Filtered by course: {courseFilter}</span>
							<Link to="/resources" className="inline-flex items-center">
								<X className="w-4 h-4" />
							</Link>
						</div>
					)}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((r, i) => (
						<Card key={r.id} className="glass-card-hover rounded-2xl p-6 animate-scale-in" style={{animationDelay: `${i*0.05}s`}}>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shrink-0">
									<FileText className="w-6 h-6 text-white" />
								</div>
								<div className="space-y-1">
									<h3 className="text-lg font-semibold">{r.title}</h3>
									<p className="text-muted-foreground text-sm flex items-center gap-2">
										<BookOpen className="w-4 h-4" /> {r.course}
										<Badge variant="outline" className="border-glass-border">{r.type}</Badge>
										<span className="text-xs">{r.size}</span>
									</p>
								</div>
							</div>
							<div className="mt-4 flex gap-3">
								<Button asChild className="gradient-primary">
									<Link to={`/resources/${r.id}`}>
										View Details
										<ArrowRight className="w-4 h-4 ml-1" />
									</Link>
								</Button>
								<Button variant="outline" className="glass-card-hover border-glass-border" asChild>
									<Link to={`/resources/${r.id}`}>Download</Link>
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

export default Resources;