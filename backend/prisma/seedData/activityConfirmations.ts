import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';

export async function seedActivityConfirmations(prisma: PrismaClient) {
  console.log('Seeding activity confirmations...');
  const employees = await prisma.employee.findMany();
  const admins = await prisma.admin.findMany();

  if (employees.length === 0 || admins.length === 0) {
    console.log('No employees or admins found, skipping activity confirmation seeding.');
    return;
  }

  for (let i = 0; i < 10; i++) {
    const randomEmployee = faker.helpers.arrayElement(employees);
    const randomAdmin = faker.helpers.arrayElement(admins);
    await prisma.activityConfirmation.create({
      data: {
        trackId: faker.string.uuid(),
        employeeId: randomEmployee.id,
        activity: faker.helpers.arrayElement(['PHONE_USAGE', 'SLEEPING']),
        value: faker.number.float({ min: 0.1, max: 1.0, fractionDigits: 2 }),
        reason: 'Violation of company policy.',
        confirmedBy: randomAdmin.id,
        timestamp: faker.date.recent({ days: 3 }),
      },
    });
  }
  console.log('Activity confirmations seeded.');
}
