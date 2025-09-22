import { PrismaClient } from '@prisma/frontend';

export async function seedAchievements(prisma: PrismaClient) {
  console.log('Seeding achievements...');
  const achievements = [
    { name: 'Employee of the Month', description: 'Awarded for outstanding performance.', points: 100, icon: '🏆' },
    { name: 'Perfect Attendance', description: 'Awarded for 100% attendance in a month.', points: 50, icon: '✅' },
    { name: 'Top Performer', description: 'Awarded for exceeding sales targets.', points: 150, icon: '🚀' },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: achievement,
    });
  }
  console.log('Achievements seeded.');
}
