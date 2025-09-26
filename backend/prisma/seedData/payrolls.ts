import { PrismaClient } from '@prisma/frontend';
import { faker } from '@faker-js/faker';
import { mockPayrolls } from './employeeMockData.js';

export async function seedPayrolls(prisma: PrismaClient) {
  console.log('Seeding payrolls...');
  const employees = await prisma.employee.findMany({ include: { contracts: true } });
  if (employees.length === 0) {
    console.log('No employees found, skipping payroll seeding.');
    return;
  }

  for (const employee of employees) {
    const contract = employee.contracts.find(c => c.status === 'ACTIVE');
    if (!contract) continue;

    for (let i = 1; i <= 3; i++) {
      const payPeriodEnd = new Date();
      payPeriodEnd.setMonth(payPeriodEnd.getMonth() - i);
      const payPeriodStart = new Date(payPeriodEnd.getFullYear(), payPeriodEnd.getMonth(), 1);
      
      const grossPay = contract.salary / 12; // Assuming monthly pay frequency
      const deductions = faker.number.float({ min: 100, max: 500, fractionDigits: 2 });
      const bonuses = faker.number.float({ min: 0, max: 300, fractionDigits: 2 });
      const netPay = grossPay - deductions + bonuses;

      await prisma.payroll.create({
        data: {
          employeeId: employee.id,
          payPeriodStart: payPeriodStart,
          payPeriodEnd: payPeriodEnd,
          payDate: new Date(payPeriodEnd.getFullYear(), payPeriodEnd.getMonth() + 1, 5),
          payRate: contract.salary,
          payFrequency: 'MONTHLY',
          grossPay: grossPay,
          deductions: { tax: deductions, insurance: 50 },
          bonuses: { performance: bonuses },
          netPay: netPay,
          status: faker.helpers.arrayElement(['PAID', 'PENDING']),
          paymentMethod: 'Bank Transfer',
        },
      });
    }
  }
  console.log('Payrolls seeded.');

  console.log('Seeding payrolls from mock data...');
  for (const p of mockPayrolls) {
    await prisma.payroll.create({
      data: {
        employeeId: p.employeeId,
        month: p.month,
        year: p.year,
        baseSalary: p.baseSalary,
        allowance: p.allowance,
        bonus: p.bonus,
        deduction: p.deduction,
        tax: p.tax,
        kpiAttendance: p.kpiAttendance,
        kpiBehaviour: p.kpiBehaviour,
        kpiPerformance: p.kpiPerformance,
        kpiTotal: p.kpiTotal,
        bonusByKPI: p.bonusByKPI,
        penaltyByBehaviour: p.penaltyByBehaviour,
        netSalary: p.netSalary,
        paymentStatus: p.paymentStatus,
        paymentDate: p.paymentDate ? new Date(p.paymentDate) : undefined,
        autoDeducted: p.autoDeducted,
        payrollFileUrl: p.payrollFileUrl,
      }
    });
  }
  console.log('Payrolls seeded from mock data.');
}
