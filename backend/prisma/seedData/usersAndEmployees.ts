import { PrismaClient, Gender, MaritalStatus, ContractType, ContractStatus, UserRole } from '@prisma/frontend';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export async function seedUsersAndEmployees(prisma: PrismaClient) {
  console.log('Seeding users and employees...');

  const departments = await prisma.department.findMany();
  if (departments.length === 0) {
    console.error('Please seed departments first.');
    return;
  }

  // Create an admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      hashedPassword: adminPassword,
      role: UserRole.ADMIN,
      isSuperuser: true,
      name: 'Admin User',
      admin: {
        create: {
          name: 'Admin User',
          email: 'admin@example.com',
        },
      },
    },
  });
  console.log(`Admin user created: ${adminUser.email}`);

  // Create employee users
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = await bcrypt.hash('password123', 10);
    const department = faker.helpers.arrayElement(departments);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: password,
        role: UserRole.EMPLOYEE,
        name,
        employee: {
          create: {
            employeeCode: `EMP${faker.string.uuid()}`,
            name,
            email,
            departmentId: department.id,
            hireDate: faker.date.past(),
            position: faker.person.jobTitle(),
            faceEmbedding: [], // Placeholder
            gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
            dateOfBirth: faker.date.past({ years: 30, refDate: '2000-01-01' }),
            maritalStatus: faker.helpers.arrayElement([MaritalStatus.SINGLE, MaritalStatus.MARRIED]),
            contracts: {
              create: {
                contractNumber: `CON${faker.string.uuid()}`,
                contractType: ContractType.FULL_TIME,
                status: ContractStatus.ACTIVE,
                startDate: new Date(),
                jobTitle: faker.person.jobTitle(),
                salary: faker.number.int({ min: 30000, max: 100000 }),
              },
            },
          },
        },
      },
    });
    console.log(`Employee user created: ${user.email}`);
  }
  console.log('Users and employees seeded.');
}
