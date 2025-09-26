import { mockNotifications } from "./employeeMockData.js";

export async function seedNotifications(prisma: any) {
  console.log('Seeding notifications from mock data...');
  for (const n of mockNotifications) {
    await prisma.notification.create({
      data: {
        id: n.id,
        employeeId: n.employeeId,
        type: n.type,
        title: n.title,
        content: n.content,
        sentAt: new Date(n.sentAt),
        read: n.read,
      }
    });
  }
}