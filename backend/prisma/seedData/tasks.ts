import { mockTasks } from "./employeeMockData";

export async function seedTasks(prisma: any) {
  console.log('Seeding tasks from mock data...');
  // Get all valid employee and admin IDs
  const employees: { id: string }[] = await prisma.employee.findMany({ select: { id: true } });
  const admins: { id: string }[] = await prisma.admin.findMany({ select: { id: true } });
  const validEmployeeIds = new Set(employees.map((e: { id: string }) => e.id));
  const validAdminIds = new Set(admins.map((a: { id: string }) => a.id));
  let skipped = 0;
  for (const t of mockTasks) {
    if (!validEmployeeIds.has(t.assignedToId)) {
      console.warn(`Skipping task for non-existent assignedToId: ${t.assignedToId}`);
      skipped++;
      continue;
    }
    if (t.assignedById && !validAdminIds.has(t.assignedById)) {
      console.warn(`Skipping task for non-existent assignedById: ${t.assignedById}`);
      skipped++;
      continue;
    }
    await prisma.task.upsert({
      where: { id: t.id },
      update: {
        title: t.title,
        description: t.description,
        type: t.type,
        status: t.status,
        deadline: t.deadline ? new Date(t.deadline) : undefined,
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
        assignedToId: t.assignedToId,
        assignedById: t.assignedById,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
        history: t.history ?? undefined,
      },
      create: {
        id: t.id,
        title: t.title,
        description: t.description,
        type: t.type,
        status: t.status,
        deadline: t.deadline ? new Date(t.deadline) : undefined,
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
        assignedToId: t.assignedToId,
        assignedById: t.assignedById,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
        history: t.history ?? undefined,
      }
    });
  }
  if (skipped > 0) {
    console.warn(`Skipped ${skipped} task(s) due to invalid assignedToId or assignedById.`);
  }
}