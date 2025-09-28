import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seedDesks(prisma: PrismaClient) {
  console.log('Seeding desks...');
  for (let i = 1; i <= 20; i++) {
    await prisma.desk.upsert({
      where: { label: `D${i.toString().padStart(3, '0')}` },
      update: {},
      create: {
        label: `D${i.toString().padStart(3, '0')}`,
        zone: `Zone ${faker.helpers.arrayElement(['A', 'B', 'C'])}`,
        isActive: true,
      },
    });
  }
  console.log('Desks seeded.');
}
