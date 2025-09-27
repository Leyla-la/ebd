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

  // Seed fixed admins for mock data
  const adminPassword = await bcrypt.hash('admin123', 10);
  const fixedAdmins = [
    { id: 'admin-001', name: 'Admin One', email: 'admin1@example.com' },
    { id: 'admin-002', name: 'Admin Two', email: 'admin2@example.com' }
  ];
  for (const a of fixedAdmins) {
    await prisma.user.upsert({
      where: { email: a.email },
      update: {},
      create: {
        id: a.id,
        email: a.email,
        hashedPassword: adminPassword,
        role: UserRole.ADMIN,
        isSuperuser: true,
        name: a.name,
        admin: {
          create: {
            id: a.id,
            name: a.name,
            email: a.email,
          },
        },
      },
    });
    console.log(`Fixed admin created: ${a.email}`);
  }

  // Seed fixed employees for mock data
  const employeePassword = await bcrypt.hash('password123', 10);
  const fixedEmployees = [
    { id: 'emp-001', name: 'Nguyen Van A', email: 'a@example.com' },
    { id: 'emp-002', name: 'Tran Thi B', email: 'b@example.com' },
    { id: 'emp-003', name: 'Le Van C', email: 'c@example.com' }
  ];
  for (const e of fixedEmployees) {
    const department = departments[0] || { id: 'default-dept' };
    await prisma.user.upsert({
      where: { email: e.email },
      update: {},
      create: {
        id: e.id,
        email: e.email,
        hashedPassword: employeePassword,
        role: UserRole.EMPLOYEE,
        name: e.name,
        employee: {
          create: {
            id: e.id,
            employeeCode: e.id.toUpperCase(),
            name: e.name,
            email: e.email,
            departmentId: department.id,
            hireDate: new Date('2020-01-01'),
            position: 'Nhân viên',
            faceEmbedding: [],
            gender: Gender.MALE,
            dateOfBirth: new Date('1990-01-01'),
            maritalStatus: MaritalStatus.SINGLE,
            contracts: {
              create: {
                contractNumber: `CON${e.id}`,
                contractType: ContractType.FULL_TIME,
                status: ContractStatus.ACTIVE,
                startDate: new Date('2020-01-01'),
                jobTitle: 'Nhân viên',
                salary: 15000000,
              },
            },
          },
        },
      },
    });
    console.log(`Fixed employee created: ${e.email}`);
  }

  // Create random admin user for demo
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

  // Create random employee users
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
