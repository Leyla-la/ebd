import { PrismaClient } from '@prisma/frontend';
import { seedAchievements } from './seedData/achievements.js';
import { seedActivities } from './seedData/activities.js';
import { seedActivityConfirmations } from './seedData/activityConfirmations.js';
import { seedAuditLogs } from './seedData/auditLogs.js';
import { seedCameras } from './seedData/cameras.js';
import { seedDepartments } from './seedData/departments.js';
import { seedDesks } from './seedData/desks.js';
import { seedEmergencyContacts } from './seedData/emergencyContacts.js';
import { seedEmployeeAchievements } from './seedData/employeeAchievements.js';
import { seedEmployeeShifts } from './seedData/employeeShifts.js';
import { seedLeaves } from './seedData/leaves.js';
import { seedPayrolls } from './seedData/payrolls.js';
import { seedPolicies } from './seedData/policies.js';
import { seedShifts } from './seedData/shifts.js';
import { seedSystemSettings } from './seedData/systemSettings.js';
import { seedUsersAndEmployees } from './seedData/usersAndEmployees.js';
import { seedWarnings } from './seedData/warnings.js';

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
