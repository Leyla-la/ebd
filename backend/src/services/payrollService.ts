import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This is a simplified mock. In a real app, this would be in the database.
const mockKpis = [
  { id: "kpi1", employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s", title: "Hoàn thành xuất sắc dự án EBD", reward: 1500000 },
  { id: "kpi2", employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s", title: "Sáng kiến cải tiến quy trình", reward: 500000 },
];

const mockWarnings = [
  { id: "warn1", employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s", title: "Đi trễ không lý do", deduction: 150000 },
];

export const getPayrollsList = async () => {
  const payrollItems = await prisma.payrollItem.findMany({
    include: {
      payroll: true,
      employee: {
        select: {
          name: true,
          employeeCode: true,
          department: {
            select: { name: true }
          }
        }
      }
    }
  });

  // This is a simplified mapping. A real implementation might need more aggregation.
  return payrollItems.map(item => ({
    id: item.id, // Using payroll item id for simplicity
    employee: {
      name: item.employee.name,
      employeeCode: item.employee.employeeCode,
      department: item.employee.department?.name || 'N/A',
    },
    netPay: item.netPay,
    status: item.status,
    payDate: item.payroll.payDate,
    // Mocking these for now, should be calculated and stored
    totalRewards: item.bonuses,
    totalDeductions: item.deductions,
  }));
};

export const getPayrollDetails = async (payrollItemId: string) => {
  const payrollItem = await prisma.payrollItem.findUnique({
    where: { id: payrollItemId },
    include: {
      employee: {
        include: {
          contracts: {
            where: { status: 'ACTIVE' },
            orderBy: { startDate: 'desc' },
            take: 1
          }
        }
      },
      payroll: true,
    }
  });

  if (!payrollItem) return null;

  const { employee, payroll } = payrollItem;
  const contract = employee.contracts[0];

  // --- Start Calculation Logic (similar to frontend action) ---
  const incomeItems: any[] = [];
  const deductionItems: any[] = [];

  const baseSalary = contract?.salary || 0;
  let totalAllowances = 0; // Assuming allowances are part of contract, not modeled yet
  
  // Mocked for now
  let totalRewards = 0;
  mockKpis.forEach(kpi => {
    if (kpi.employeeId === employee.id) {
      incomeItems.push({ type: "reward", name: kpi.title, amount: kpi.reward });
      totalRewards += kpi.reward;
    }
  });

  let totalDeductionsFromWarnings = 0;
  mockWarnings.forEach(warning => {
    if (warning.employeeId === employee.id) {
      deductionItems.push({ type: "deduction", name: `Vi phạm: ${warning.title}`, amount: warning.deduction });
      totalDeductionsFromWarnings += warning.deduction;
    }
  });

  const grossSalary = baseSalary + totalAllowances + totalRewards;

  const socialInsurance = grossSalary * 0.08;
  deductionItems.push({ type: "insurance", name: "Bảo hiểm xã hội (8%)", amount: socialInsurance });
  
  const healthInsurance = grossSalary * 0.015;
  deductionItems.push({ type: "insurance", name: "Bảo hiểm y tế (1.5%)", amount: healthInsurance });

  const unemploymentInsurance = grossSalary * 0.01;
  deductionItems.push({ type: "insurance", name: "Bảo hiểm thất nghiệp (1%)", amount: unemploymentInsurance });

  const taxableIncome = grossSalary - 11000000;
  const personalIncomeTax = taxableIncome > 0 ? taxableIncome * 0.1 : 0;
  if (personalIncomeTax > 0) {
    deductionItems.push({ type: "tax", name: "Thuế TNCN", amount: personalIncomeTax });
  }

  const totalDeductions = totalDeductionsFromWarnings + socialInsurance + healthInsurance + unemploymentInsurance + personalIncomeTax;
  const netSalary = grossSalary - totalDeductions;
  // --- End Calculation Logic ---

  return {
    id: payrollItem.id,
    month: payroll.month,
    year: payroll.year,
    status: payrollItem.status,
    paymentDate: payroll.payDate,
    transactionId: `TXN-BACKEND-${payrollItem.id.slice(0, 8)}`, // Mock transaction ID
    employee: {
      id: employee.id,
      firstName: employee.name.split(' ').slice(1).join(' '),
      lastName: employee.name.split(' ')[0],
      position: employee.position,
      avatar: employee.avatarUrl,
      employeeId: employee.employeeCode,
    },
    contract: contract,
    baseSalary,
    totalAllowances,
    totalRewards,
    totalDeductions,
    incomeItems,
    deductionItems,
    paidLeaveDays: 1, // Mock
    unpaidLeaveDays: 0, // Mock
    grossSalary,
    netSalary,
  };
};

// TODO: Implement actual salary calculation logic
export const calculateEmployeeSalary = async (employeeId: string, startDate: Date, endDate: Date) => {
  // Placeholder implementation that matches the controller's expectations
  console.log(`Calculating salary for employee ${employeeId} from ${startDate} to ${endDate}`);
  
  // In a real implementation, you would fetch employee data, contract details,
  // attendance, performance, etc., from the database to calculate the salary.
  
  return {
    baseSalary: 5000, // Placeholder
    kpiBonus: 500,    // Placeholder
    totalDeductions: 200, // Placeholder
    netPay: 5300,     // Placeholder
    details: {        // Placeholder for the JSON field
      workDays: 22,
      absentDays: 0,
      tax: 150,
      insurance: 50,
    },
  };
};
