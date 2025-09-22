import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';

export async function seedAuditLogs(prisma: PrismaClient) {
  console.log('Seeding audit logs...');
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found, skipping audit log seeding.');
    return;
  }

  const actions = ['login', 'logout', 'create_user', 'update_policy', 'delete_employee'];

  for (let i = 0; i < 30; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    await prisma.auditLog.create({
      data: {
        actor: randomUser.email,
        action: faker.helpers.arrayElement(actions),
        target: `user:${faker.string.uuid()}`,
        details: { success: faker.datatype.boolean() },
        ipAddress: faker.internet.ip(),
      },
    });
  }
  console.log('Audit logs seeded.');
}
