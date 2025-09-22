import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';

export async function seedEmergencyContacts(prisma: PrismaClient) {
  console.log('Seeding emergency contacts...');
  const employees = await prisma.employee.findMany();
  if (employees.length === 0) {
    console.log('No employees found, skipping emergency contact seeding.');
    return;
  }

  for (const employee of employees) {
    await prisma.emergencyContact.create({
      data: {
        employeeId: employee.id,
        name: faker.person.fullName(),
        relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(true),
      },
    });
  }
  console.log('Emergency contacts seeded.');
}
