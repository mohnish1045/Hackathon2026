import { PrismaClient } from "@prisma/client";
import { demoItems } from "../lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@orbit.local" },
    update: {},
    create: { email: "demo@orbit.local", name: "Demo Student" },
  });

  for (const item of demoItems) {
    await prisma.plannerItem.upsert({
      where: { userId_source_sourceId: { userId: user.id, source: item.source.toUpperCase() as any, sourceId: item.sourceId ?? item.id } },
      update: {},
      create: {
        userId: user.id, source: item.source.toUpperCase() as any, sourceId: item.sourceId ?? item.id,
        title: item.title, type: item.type.toUpperCase() as any, course: item.course,
        startAt: item.startAt ? new Date(item.startAt) : null, endAt: item.endAt ? new Date(item.endAt) : null,
        dueAt: item.dueAt ? new Date(item.dueAt) : null, location: item.location, url: item.url,
        priority: item.priority.toUpperCase() as any, estimatedMinutes: item.estimatedMinutes, isFixed: item.isFixed ?? false,
      },
    });
  }
  console.log("Seeded Orbit demo student.");
}

main().finally(() => prisma.$disconnect());
