import { PrismaClient } from '@prisma/frontend';

export async function seedShifts(prisma: PrismaClient) {
  console.log('Seeding shifts...');
  const shifts = [
    { name: 'Morning Shift', startTime: '08:00', endTime: '16:00' },
    { name: 'Afternoon Shift', startTime: '16:00', endTime: '00:00' },
    { name: 'Night Shift', startTime: '00:00', endTime: '08:00' },
  ];

  for (const shift of shifts) {
    await prisma.shift.upsert({
      where: { name: shift.name },
      update: {},
      create: shift,
    });
  }
  console.log('Shifts seeded.');
}
