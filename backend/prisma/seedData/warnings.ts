import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seedWarnings(prisma: PrismaClient) {
  console.log('Seeding warnings...');
  const employees = await prisma.employee.findMany();
  if (employees.length === 0) {
    console.log('No employees found, skipping warning seeding.');
    return;
  }

  for (let i = 0; i < 10; i++) {
    const randomEmployee = faker.helpers.arrayElement(employees) as typeof employees[number];
    await prisma.warning.create({
      data: {
        employeeId: randomEmployee.id,
        reason: faker.lorem.sentence(),
        timestamp: faker.date.past(),
        severity: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
      },
    });
  }
  console.log('Warnings seeded.');
}
