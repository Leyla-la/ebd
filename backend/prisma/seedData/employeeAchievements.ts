import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seedEmployeeAchievements(prisma: PrismaClient) {
  console.log('Seeding employee achievements...');
  const employees = await prisma.employee.findMany();
  const achievements = await prisma.achievement.findMany();

  if (employees.length === 0 || achievements.length === 0) {
    console.log('No employees or achievements found, skipping employee achievement seeding.');
    return;
  }

  for (const employee of employees) {
    // Award each employee 1 to 3 random achievements
  const achievementsToAward = faker.helpers.arrayElements(achievements, faker.number.int({ min: 1, max: 3 })) as typeof achievements;
  for (const achievement of achievementsToAward) {
      await prisma.employeeAchievement.upsert({
        where: { employeeId_achievementId: { employeeId: employee.id, achievementId: achievement.id } },
        update: {},
        create: {
          employeeId: employee.id,
          achievementId: achievement.id,
        },
      });
      // Add points to employee
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          points: {
            increment: achievement.points,
          },
        },
      });
    }
  }
  console.log('Employee achievements seeded.');
}
