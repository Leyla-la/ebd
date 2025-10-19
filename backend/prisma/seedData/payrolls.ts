import { PrismaClient } from '@prisma/client';

export async function seedPayrolls(prisma: PrismaClient) {
  console.log('Seeding legacy payrolls...');
  // This seeder is for the legacy payroll table.
  // The new payroll structure will be populated by the payroll run service.
  // We will not seed any data here to avoid conflicts with the new system.
  const count = await prisma.payroll_Legacy.count();
  if (count === 0) {
    console.log('No legacy payrolls to seed.');
  } else {
    console.log(`${count} legacy payrolls already exist.`);
  }
}

