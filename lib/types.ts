export type PlannerItemType = "assignment" | "exam" | "event" | "deadline" | "task" | "meeting" | "study_block";
export type PlannerSource = "canvas" | "google_calendar" | "web" | "manual" | "ai";
export type Priority = "low" | "medium" | "high";
export type PlannerItem = { id: string; title: string; description?: string | null; type: PlannerItemType; source: PlannerSource; sourceId?: string | null; course?: string | null; startAt?: string | null; endAt?: string | null; dueAt?: string | null; location?: string | null; url?: string | null; priority: Priority; estimatedMinutes?: number | null; completed: boolean; isFixed?: boolean; metadata?: Record<string, unknown> | null };
export type ScheduleSuggestion = { id?: string; title: string; date: string; startTime: string; endTime: string; reason: string; relatedItemId?: string };
export type SourceStatus = { id: string; type: "canvas" | "google_calendar" | "web"; name: string; status: "connected" | "pending" | "error"; lastSyncedAt?: string; error?: string };
