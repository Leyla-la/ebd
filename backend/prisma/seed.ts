import { PrismaClient } from '@prisma/client';
import { seedAchievements } from './seedData/achievements';
import { seedActivities } from './seedData/activities';
import { seedActivityConfirmations } from './seedData/activityConfirmations';
import { seedAuditLogs } from './seedData/auditLogs';
import { seedCameras } from './seedData/cameras';
import { seedContracts } from './seedData/contracts';
import { seedDepartments } from './seedData/departments';
import { seedDesks } from './seedData/desks';
import { seedEbdLogs } from './seedData/ebdLogs';
import { seedEmergencyContacts, seedEmergencyContactsFromMock } from './seedData/emergencyContacts';
import { seedEmployeeAchievements } from './seedData/employeeAchievements';
import { seedEmployeeShifts } from './seedData/employeeShifts';
import { seedLeaves } from './seedData/leaves';
import { seedNotifications } from './seedData/notifications';
import { seedPayrolls } from './seedData/payrolls';
import { seedPolicies } from './seedData/policies';
import { seedShifts } from './seedData/shifts';
import { seedSystemSettings } from './seedData/systemSettings';
import { seedTasks } from './seedData/tasks';
import { seedUsersAndEmployees } from './seedData/usersAndEmployees';
import { seedWarnings } from './seedData/warnings';



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
