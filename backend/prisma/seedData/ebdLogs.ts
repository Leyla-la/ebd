import { mockEbdLogs } from "./employeeMockData.js";

export async function seedEbdLogs(prisma: any) {
  console.log('Seeding EBD logs from mock data...');
  for (const log of mockEbdLogs) {
    await prisma.ebdLog.create({
      data: {
        id: log.id,
        employeeId: log.employeeId,
        timestamp: new Date(log.timestamp),
        eventType: log.eventType,
        value: log.value,
        description: log.description,
        severity: log.severity,
      }
    });
  }
}