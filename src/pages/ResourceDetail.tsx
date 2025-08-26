import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Download } from "lucide-react";

const mockResourceMap: Record<string, { id: string; title: string; description: string; type: string; size: string; course: string; createdAt: string }>= {
	"res-1": { id: "res-1", title: "Lecture Slides: Anatomy I - Week 1", description: "Comprehensive slides covering musculoskeletal system basics.", type: "PDF", size: "3.2 MB", course: "anatomy-101", createdAt: "2025-01-08" },
	"res-2": { id: "res-2", title: "Physiology Lab Manual", description: "Guidelines and experiments for the physiology lab.", type: "PDF", size: "5.4 MB", course: "physiology-101", createdAt: "2025-01-06" },
	"res-3": { id: "res-3", title: "Pathology Case Studies", description: "Case-based learning materials for pathology.", type: "DOCX", size: "1.1 MB", course: "pathology-301", createdAt: "2025-01-05" },
	"res-4": { id: "res-4", title: "Cardiology ECG Basics (Video)", description: "Introductory video on ECG interpretation.", type: "Video", size: "12 min", course: "cardio-401", createdAt: "2025-01-04" },
};

const ResourceDetail = () => {
	const { id } = useParams();
	const resource = id ? mockResourceMap[id] : undefined;

	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="mb-6">
					<Link to="/resources" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
						<ArrowLeft className="w-4 h-4 mr-1" /> Back to Resources
					</Link>
				</div>

				{resource ? (
					<Card className="glass-card rounded-2xl p-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shrink-0">
								<FileText className="w-6 h-6 text-white" />
							</div>
							<div className="space-y-2">
								<h1 className="text-2xl md:text-3xl font-bold">{resource.title}</h1>
								<p className="text-muted-foreground">{resource.description}</p>
								<div className="flex items-center gap-2 text-sm">
									<Badge variant="outline" className="border-glass-border">{resource.type}</Badge>
									<span className="text-muted-foreground">{resource.size}</span>
									<span className="text-muted-foreground">· Course: {resource.course}</span>
									<span className="text-muted-foreground">· Added: {resource.createdAt}</span>
								</div>
								<div className="pt-4 flex gap-3">
									<Button className="gradient-primary" asChild>
										<a href="#download">
											<Download className="w-4 h-4 mr-1" /> Download
										</a>
									</Button>
									<Button variant="outline" className="glass-card-hover border-glass-border" asChild>
										<a href="#open">Open in viewer</a>
									</Button>
								</div>
							</div>
						</div>
					</Card>
				) : (
					<p className="text-muted-foreground">Resource not found.</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default ResourceDetail;