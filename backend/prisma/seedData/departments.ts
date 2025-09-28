import { PrismaClient } from '@prisma/client';

export async function seedDepartments(prisma: PrismaClient) {
  console.log('Seeding departments...');
  const departments = [
    { name: 'Human Resources' },
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Sales' },
    { name: 'Support' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
  }
  console.log('Departments seeded.');
}
