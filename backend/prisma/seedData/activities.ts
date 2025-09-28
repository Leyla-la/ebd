import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seedActivities(prisma: PrismaClient) {
  console.log('Seeding activities...');
  const employees = await prisma.employee.findMany();
  const desks = await prisma.desk.findMany();
  const cameras = await prisma.camera.findMany();

  if (employees.length === 0 || desks.length === 0 || cameras.length === 0) {
    console.log('Not enough data to seed activities. Skipping.');
    return;
  }

  for (let i = 0; i < 50; i++) {
  const randomEmployee = faker.helpers.arrayElement(employees) as typeof employees[number];
  const randomDesk = faker.helpers.arrayElement(desks) as typeof desks[number];
  const randomCamera = faker.helpers.arrayElement(cameras) as typeof cameras[number];
    const startTime = faker.date.recent({ days: 7 });
    const endTime = new Date(startTime.getTime() + faker.number.int({ min: 5, max: 60 }) * 60 * 1000);

    await prisma.activity.create({
      data: {
        employeeId: randomEmployee.id,
        deskId: randomDesk.id,
        cameraId: randomCamera.id,
        activityType: faker.helpers.arrayElement([
          'WORKING',
          'TYPING',
          'USING_COMPUTER',
          'READING_DOCUMENT',
          'ABSENT',
          'PHONE_USAGE',
          'SLEEPING',
          'TALKING',
          'WALKING',
          'BREAK',
          'OTHER',
        ]),
        startTime: startTime,
        endTime: endTime,
        details: { source: 'automatic-detection' },
      },
    });
  }
  console.log('Activities seeded.');
}
