import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const mockTimetable = [
	{ day: "Monday", slots: [{ time: "08:00 - 10:00", course: "Anatomy I", room: "A101" }, { time: "10:30 - 12:00", course: "Physiology I", room: "B203" }] },
	{ day: "Tuesday", slots: [{ time: "09:00 - 11:00", course: "Biochemistry", room: "Lab 2" }] },
	{ day: "Wednesday", slots: [{ time: "08:00 - 10:00", course: "Pathology", room: "C301" }] },
	{ day: "Thursday", slots: [{ time: "13:00 - 15:00", course: "Clinical Skills", room: "Skills Center" }] },
	{ day: "Friday", slots: [{ time: "10:00 - 12:00", course: "Radiology", room: "Imaging Lab" }] },
];

const Timetable = () => {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="container mx-auto px-4 pt-28 pb-16">
				<div className="text-center mb-10">
					<div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-3">
						<Calendar className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">Timetable</span>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold">Weekly Schedule</h1>
					<p className="text-muted-foreground mt-2">Mock schedule for demonstration purposes.</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockTimetable.map((d, i) => (
						<Card key={d.day} className="glass-card rounded-2xl p-6 animate-scale-in" style={{animationDelay: `${i*0.05}s`}}>
							<h3 className="text-lg font-semibold mb-3">{d.day}</h3>
							<div className="space-y-3">
								{d.slots.map((s, idx) => (
									<div key={idx} className="glass-card-hover border border-glass-border rounded-xl p-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="w-4 h-4" /> {s.time}
										</div>
										<div className="flex items-center justify-between mt-1">
											<span className="font-medium">{s.course}</span>
											<span className="text-sm text-muted-foreground">{s.room}</span>
										</div>
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Timetable;