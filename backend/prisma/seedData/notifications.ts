import { mockNotifications } from "./employeeMockData.ts";

export async function seedNotifications(prisma: any) {
  console.log('Seeding notifications from mock data...');
  const employees: { id: string }[] = await prisma.employee.findMany({ select: { id: true } });
  const admins: { id: string }[] = await prisma.admin.findMany({ select: { id: true } });
  const validEmployeeIds = new Set(employees.map((e: { id: string }) => e.id));
  const validAdminIds = new Set(admins.map((a: { id: string }) => a.id));
  let skipped = 0;
  for (const n of mockNotifications) {
    // Only one of employeeId or adminId should be set
    if (n.employeeId && !validEmployeeIds.has(n.employeeId)) {
      console.warn(`Skipping notification for non-existent employeeId: ${n.employeeId}`);
      skipped++;
      continue;
    }
    if (n.adminId && !validAdminIds.has(n.adminId)) {
      console.warn(`Skipping notification for non-existent adminId: ${n.adminId}`);
      skipped++;
      continue;
    }
    await prisma.notification.upsert({
      where: { id: n.id },
      update: {
        employeeId: n.employeeId || null,
        adminId: n.adminId || null,
        type: n.type,
        title: n.title,
        content: n.content,
        sentAt: new Date(n.sentAt),
        read: n.read,
      },
      create: {
        id: n.id,
        employeeId: n.employeeId || null,
        adminId: n.adminId || null,
        type: n.type,
        title: n.title,
        content: n.content,
        sentAt: new Date(n.sentAt),
        read: n.read,
      }
    });
  }
  if (skipped > 0) {
    console.warn(`Skipped ${skipped} notification(s) due to invalid employeeId or adminId.`);
  }
}