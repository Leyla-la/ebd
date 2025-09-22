import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';

export async function seedCameras(prisma: PrismaClient) {
  console.log('Seeding cameras...');
  for (let i = 1; i <= 5; i++) {
    await prisma.camera.create({
      data: {
        name: `Camera ${i}`,
        source: `rtsp://fake.source/camera${i}`,
        location: `Location ${faker.helpers.arrayElement(['Entrance', 'Hallway', 'Office Area'])}`,
        isActive: true,
      },
    });
  }
  console.log('Cameras seeded.');
}
