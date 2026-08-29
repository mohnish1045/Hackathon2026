import { getPlannerItems } from "@/lib/data";
import { PlannerShell } from "@/components/planner-shell";
export default async function PlannerPage() { return <PlannerShell initialItems={await getPlannerItems()} />; }
