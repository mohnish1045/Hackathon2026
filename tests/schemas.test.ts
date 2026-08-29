import { describe, expect, it } from "vitest";
import { extractionSchema, plannerItemInput } from "@/lib/schemas";
describe("planner validation", () => { it("rejects an empty manual task", () => expect(plannerItemInput.safeParse({ title: "", type: "task" }).success).toBe(false)); it("requires confidence for web extraction", () => expect(extractionSchema.safeParse({ items: [{ title: "Event", type: "event" }] }).success).toBe(false)); });
