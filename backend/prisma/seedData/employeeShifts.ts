import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';

export async function seedEmployeeShifts(prisma: PrismaClient) {
  console.log('Seeding employee shifts...');
  const employees = await prisma.employee.findMany();
  const shifts = await prisma.shift.findMany();

  if (employees.length === 0 || shifts.length === 0) {
    console.log('No employees or shifts found, skipping employee shift seeding.');
    return;
  }

  for (const employee of employees) {
    // Assign each employee to 1 or 2 random shifts
    const shiftsToAssign = faker.helpers.arrayElements(shifts, faker.number.int({ min: 1, max: 2 }));
    for (const shift of shiftsToAssign) {
      await prisma.employeeShift.upsert({
        where: { employeeId_shiftId: { employeeId: employee.id, shiftId: shift.id } },
        update: {},
        create: {
          employeeId: employee.id,
          shiftId: shift.id,
        },
      });
    }
  }
  console.log('Employee shifts seeded.');
}
