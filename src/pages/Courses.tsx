import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const mockCourses = [
	{ id: "anatomy-101", title: "Anatomy I", year: 1, summary: "Introduction to human anatomy.", resources: 12 },
	{ id: "physiology-101", title: "Physiology I", year: 1, summary: "Foundations of physiology.", resources: 10 },
	{ id: "biochem-201", title: "Biochemistry", year: 2, summary: "Biomolecules and metabolism.", resources: 8 },
	{ id: "pathology-301", title: "Pathology", year: 3, summary: "Mechanisms of disease.", resources: 16 },
	{ id: "cardio-401", title: "Cardiology", year: 4, summary: "Cardiovascular system in clinic.", resources: 20 },
	{ id: "neuro-502", title: "Neurology", year: 5, summary: "Neurological disorders and care.", resources: 14 },
];

const years = [1,2,3,4,5,6,7];

const Courses = () => {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="text-center mb-10">
					<div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-3">
						<GraduationCap className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">Courses</span>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold">Browse Courses</h1>
					<p className="text-muted-foreground mt-2">Filter by academic year and open a course to view resources.</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
					{years.map((y) => (
						<a key={y} href={`#year-${y}`} className="glass-card-hover rounded-xl p-3 text-center text-sm">
							Year {y}
						</a>
					))}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockCourses.map((c, i) => (
						<Card key={c.id} id={`year-${c.year}`} className="glass-card-hover rounded-2xl p-6 animate-scale-in" style={{animationDelay: `${i*0.05}s`}}>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
									<BookOpen className="w-6 h-6 text-white" />
								</div>
								<div className="space-y-1">
									<h3 className="text-lg font-semibold">{c.title}</h3>
									<p className="text-muted-foreground text-sm">Year {c.year} · {c.summary}</p>
									<p className="text-xs text-muted-foreground">{c.resources} resources</p>
								</div>
							</div>
							<div className="mt-4 flex gap-3">
								<Button asChild className="gradient-primary">
									<a href={`/resources?course=${c.id}`}>
										Open Resources
										<ArrowRight className="w-4 h-4 ml-1" />
									</a>
								</Button>
								<Button variant="outline" className="glass-card-hover border-glass-border">Open Course</Button>
							</div>
						</Card>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Courses;