import { getSources } from "@/lib/data";
import { SourcesClient } from "@/components/sources-client";
export default async function SourcesPage() { return <SourcesClient sources={await getSources()} />; }
