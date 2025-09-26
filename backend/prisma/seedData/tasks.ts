import { mockTasks } from "./employeeMockData.js";

export async function seedTasks(prisma: any) {
  console.log('Seeding tasks from mock data...');
  for (const t of mockTasks) {
    await prisma.task.create({
      data: {
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
        // Lưu ý: history nên seed vào bảng riêng nếu có
      }
    });
  }
}