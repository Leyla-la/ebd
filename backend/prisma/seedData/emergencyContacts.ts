import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';
import { mockEmergencyContacts } from './employeeMockData.ts';

export async function seedEmergencyContacts(prisma: PrismaClient) {
  console.log('Seeding emergency contacts...');
  const employees = await prisma.employee.findMany();
  if (employees.length === 0) {
    console.log('No employees found, skipping emergency contact seeding.');
    return;
  }
  for (const employee of employees) {
    const name = faker.person.fullName();
    await prisma.emergencyContact.upsert({
      where: {
        employeeId_name: {
          employeeId: employee.id,
          name: name,
        },
      },
      update: {
        relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(true),
      },
      create: {
        employeeId: employee.id,
        name: name,
        relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(true),
      },
    });
  }
  console.log('Emergency contacts seeded.');
}

export async function seedEmergencyContactsFromMock(prisma: any) {
  console.log('Seeding emergency contacts from mock data...');
  for (const ec of mockEmergencyContacts) {
    await prisma.emergencyContact.upsert({
      where: ec.id
        ? { id: ec.id }
        : { employeeId_name: { employeeId: ec.employeeId, name: ec.name } },
      update: {
        relationship: ec.relationship,
        phoneNumber: ec.phoneNumber,
        email: ec.email,
        address: ec.address,
      },
      create: {
        id: ec.id,
        employeeId: ec.employeeId,
        name: ec.name,
        relationship: ec.relationship,
        phoneNumber: ec.phoneNumber,
        email: ec.email,
        address: ec.address,
      },
    });
  }
  console.log('Emergency contacts seeded from mock data.');
}
