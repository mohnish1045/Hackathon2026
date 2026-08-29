import type { PlannerItem, SourceStatus } from "@/lib/types";

const date = (offset: number, hour: number, minute = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); d.setHours(hour, minute, 0, 0); return d.toISOString(); };
export const demoItems: PlannerItem[] = [
  { id: "cal-1", title: "Calculus II lecture", type: "event", source: "google_calendar", course: "MATH 221", startAt: date(0, 10), endAt: date(0, 11, 15), location: "Science Hall 204", priority: "medium", completed: false, isFixed: true },
  { id: "canvas-1", title: "Physics problem set 4", type: "assignment", source: "canvas", sourceId: "ps4", course: "PHYS 201", dueAt: date(2, 23, 59), priority: "high", estimatedMinutes: 150, completed: false, isFixed: true },
  { id: "canvas-2", title: "Algorithms midterm", type: "exam", source: "canvas", sourceId: "midterm", course: "CS 301", startAt: date(5, 13), endAt: date(5, 15), priority: "high", completed: false, isFixed: true },
  { id: "cal-2", title: "Robotics club", type: "meeting", source: "google_calendar", startAt: date(1, 17), endAt: date(1, 18, 30), location: "Innovation Lab", priority: "medium", completed: false, isFixed: true },
  { id: "web-1", title: "Career fair", type: "event", source: "web", startAt: date(3, 12), endAt: date(3, 15), location: "Student Union", url: "https://university.example/events", priority: "low", completed: false, isFixed: true },
  { id: "task-1", title: "Outline history essay", type: "task", source: "manual", course: "HIST 110", dueAt: date(4, 17), priority: "high", estimatedMinutes: 90, completed: false },
  { id: "task-2", title: "Read chapter 7", type: "task", source: "manual", course: "MATH 221", dueAt: date(1, 20), priority: "medium", estimatedMinutes: 60, completed: false },
];
export const demoSources: SourceStatus[] = [ { id: "canvas", type: "canvas", name: "Canvas", status: "connected", lastSyncedAt: new Date(Date.now() - 12 * 60000).toISOString() }, { id: "calendar", type: "google_calendar", name: "Google Calendar", status: "connected", lastSyncedAt: new Date(Date.now() - 8 * 60000).toISOString() }, { id: "web", type: "web", name: "University Events", status: "pending" } ];
