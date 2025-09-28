import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seedLeaves(prisma: PrismaClient) {
  console.log('Seeding leaves...');
  const employees = await prisma.employee.findMany();
  if (employees.length === 0) {
    console.log('No employees found, skipping leave seeding.');
    return;
  }

  for (let i = 0; i < 15; i++) {
  const randomEmployee = faker.helpers.arrayElement(employees) as typeof employees[number];
    const startDate = faker.date.recent({ days: 30 });
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 1, max: 5 }) * 24 * 60 * 60 * 1000);

    await prisma.leave.create({
      data: {
        employeeId: randomEmployee.id,
        leaveType: faker.helpers.arrayElement(['ANNUAL', 'SICK', 'UNPAID']),
        startDate: startDate,
        endDate: endDate,
        reason: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']),
      },
    });
  }
  console.log('Leaves seeded.');
}
