import { mockContracts } from "./employeeMockData.js";

export async function seedContracts(prisma: any) {
  console.log('Seeding contracts from mock data...');
  for (const c of mockContracts) {
    await prisma.contract.create({
      data: {
        id: c.id,
        employeeId: c.employeeId,
        contractNumber: c.contractNumber,
        contractType: c.contractType,
        status: c.status,
        startDate: new Date(c.startDate),
        endDate: c.endDate ? new Date(c.endDate) : undefined,
        jobTitle: c.jobTitle,
        salary: c.salary,
        salaryCurrency: c.salaryCurrency,
        filePath: c.filePath,
      }
    });
  }
}