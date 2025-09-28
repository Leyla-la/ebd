import { PrismaClient } from '@prisma/client';
import { seedAchievements } from './seedData/achievements.ts';
import { seedActivities } from './seedData/activities.ts';
import { seedActivityConfirmations } from './seedData/activityConfirmations.ts';
import { seedAuditLogs } from './seedData/auditLogs.ts';
import { seedCameras } from './seedData/cameras.ts';
import { seedContracts } from './seedData/contracts.ts';
import { seedDepartments } from './seedData/departments.ts';
import { seedDesks } from './seedData/desks.ts';
import { seedEbdLogs } from './seedData/ebdLogs.ts';
import { seedEmergencyContacts, seedEmergencyContactsFromMock } from './seedData/emergencyContacts.ts';
import { seedEmployeeAchievements } from './seedData/employeeAchievements.ts';
import { seedEmployeeShifts } from './seedData/employeeShifts.ts';
import { seedLeaves } from './seedData/leaves.ts';
import { seedNotifications } from './seedData/notifications.ts';
import { seedPayrolls } from './seedData/payrolls.ts';
import { seedPolicies } from './seedData/policies.ts';
import { seedShifts } from './seedData/shifts.ts';
import { seedSystemSettings } from './seedData/systemSettings.ts';
import { seedTasks } from './seedData/tasks.ts';
import { seedUsersAndEmployees } from './seedData/usersAndEmployees.ts';
import { seedWarnings } from './seedData/warnings.ts';



const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  
  // Seed entities that do not depend on others
  console.log('--- Seeding Independent Entities ---');
  await seedDepartments(prisma);
  await seedPolicies(prisma);
  await seedShifts(prisma);
  await seedAchievements(prisma);
  await seedSystemSettings(prisma);
  await seedDesks(prisma);
  await seedCameras(prisma);

  // Seed users and employees, which are central to other data
  console.log('--- Seeding Users, Admins, Employees and Contracts ---');
  await seedUsersAndEmployees(prisma);
  
  // Seed entities that depend on employees
  console.log('--- Seeding Employee-Dependent Entities ---');
  await seedEmergencyContacts(prisma);
  await seedWarnings(prisma);
  await seedLeaves(prisma);
  await seedPayrolls(prisma);

  // Seed mock data for tasks, EBD logs, notifications, contracts, emergency contacts
  console.log('--- Seeding Mock Data Entities ---');
  await seedTasks(prisma);
  await seedEbdLogs(prisma);
  await seedNotifications(prisma);
  await seedContracts(prisma);
  await seedEmergencyContactsFromMock(prisma);

  // Seed join tables and entities with multiple dependencies
  console.log('--- Seeding Relational and Activity-Based Entities ---');
  await seedEmployeeShifts(prisma);
  await seedEmployeeAchievements(prisma);
  await seedActivities(prisma);
  await seedActivityConfirmations(prisma);

  // Seed logs
  console.log('--- Seeding Log Entities ---');
  await seedAuditLogs(prisma);
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
