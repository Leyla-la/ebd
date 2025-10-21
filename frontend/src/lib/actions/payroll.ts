import { Payroll, Employee, Contract, Warning, Kpi, User, Department } from "@/types/prismaTypes";
import { API_BASE } from "@/lib/constants";

// Mock data for demonstration purposes
const mockKpis: (Kpi & { employeeId: string })[] = [
  {
    id: "kpi1",
    employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    title: "Hoàn thành xuất sắc dự án EBD",
    description: "Vượt chỉ tiêu và hoàn thành trước thời hạn.",
    reward: 1500000,
    month: 9,
    year: 2025,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "kpi2",
    employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    title: "Sáng kiến cải tiến quy trình",
    description: "Đề xuất và áp dụng thành công quy trình mới, tiết kiệm 20% thời gian.",
    reward: 500000,
    month: 9,
    year: 2025,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockWarnings: (Warning & { employeeId: string })[] = [
  {
    id: "warn1",
    employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    title: "Đi trễ không lý do",
    description: "Đi trễ 30 phút vào ngày 2025-09-15",
    deduction: 150000,
    date: new Date("2025-09-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock leave data
const mockLeaves = {
  paidLeaveDays: 1,
  unpaidLeaveDays: 0.5,
};

// --- Type Definitions ---

interface IncomeItem {
  type: "allowance" | "reward";
  name: string;
  amount: number;
}

interface DeductionItem {
  type: "deduction" | "tax" | "insurance";
  name: string;
  amount: number;
}

// Define a full details shape used by the UI. We don't extend the Prisma `Payroll` type
// because the UI expects some additional convenience fields (month/year, paymentDate
// and transactionId) that are not present on the raw `Payroll` Zod-inferred type.
export interface PayrollFullDetails {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  status: "PAID" | "PENDING" | "FAILED";
  paymentDate: Date | null;
  transactionId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  employee: Employee;
  contract: Contract | null;
  // Detailed breakdown
  baseSalary: number;
  totalAllowances: number;
  totalRewards: number;
  totalDeductions: number;
  // Itemized lists
  incomeItems: IncomeItem[];
  deductionItems: DeductionItem[];
  // Other info
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  // Final calculated amounts
  grossSalary: number;
  netSalary: number; // Lương thực nhận
}

// --- Server Action ---

export async function getPayrollFullDetails(
  payrollId: string
): Promise<PayrollFullDetails | null> {
  // In a real app, you would fetch this from your database
  // For now, we'll use mock data and a mock payroll record.
  
  const mockPayroll: Payroll = {
    id: payrollId,
    employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    payPeriodStart: new Date("2025-09-01"),
    payPeriodEnd: new Date("2025-09-30"),
    payDate: new Date(),
    grossPay: 0,
    netPay: 0,
    status: "PAID",
    // Keep only fields defined by the Payroll type
  };
  const mockEmployee: Employee = {
    id: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    cognitoId: "cognito_emp_1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    avatarUrl: "/avatars/01.png",
    employeeCode: "NV001",
    department: { name: "Engineering" },
    createdAt: new Date(),
    updatedAt: new Date(),
    personalEmail: null,
    phoneNumber: "0987654321",
    gender: "MALE",
    dateOfBirth: new Date("1995-10-20"),
    maritalStatus: null,
    nationality: null,
    religion: null,
    placeOfBirth: null,
    address: null,
    bankAccountNumber: null,
    bankName: null,
    position: "Software Engineer",
    hireDate: new Date("2023-01-15"),
    endDate: null,
    status: "ACTIVE",
    role: null,
    lastClockIn: null,
  };

  const mockContract: Contract = {
    id: "contract1",
    employeeId: "emp_2iNx4i9W4S2j4n4V3s2j4n4V3s",
    contractType: "FullTime",
    startDate: new Date("2023-01-15"),
    endDate: null,
    baseSalary: 25000000,
    positionAllowance: 2000000,
    transportationAllowance: 500000,
    workingHours: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!mockPayroll || !mockEmployee || !mockContract) {
    return null;
  }

  const incomeItems: IncomeItem[] = [];
  const deductionItems: DeductionItem[] = [];

  // 1. Base Salary & Allowances from Contract
  const baseSalary = mockContract.baseSalary;
  let totalAllowances = 0;
  if (mockContract.positionAllowance > 0) {
    incomeItems.push({ type: "allowance", name: "Phụ cấp chức vụ", amount: mockContract.positionAllowance });
    totalAllowances += mockContract.positionAllowance;
  }
  if (mockContract.transportationAllowance > 0) {
    incomeItems.push({ type: "allowance", name: "Phụ cấp đi lại", amount: mockContract.transportationAllowance });
    totalAllowances += mockContract.transportationAllowance;
  }

  // 2. Rewards from KPIs
  let totalRewards = 0;
  const employeeKpis = mockKpis.filter(k => k.employeeId === mockPayroll.employeeId);
  employeeKpis.forEach(kpi => {
    incomeItems.push({ type: "reward", name: kpi.title, amount: kpi.reward });
    totalRewards += kpi.reward;
  });

  // 3. Deductions from Warnings
  let totalDeductionsFromWarnings = 0;
  const employeeWarnings = mockWarnings.filter(w => w.employeeId === mockPayroll.employeeId);
  employeeWarnings.forEach(warning => {
    deductionItems.push({ type: "deduction", name: `Vi phạm: ${warning.title}`, amount: warning.deduction });
    totalDeductionsFromWarnings += warning.deduction;
  });
  
  // 4. Calculate Gross Salary
  const grossSalary = baseSalary + totalAllowances + totalRewards;

  // 5. Mock Taxes and Insurance
  const socialInsurance = grossSalary * 0.08; // 8%
  deductionItems.push({ type: "insurance", name: "Bảo hiểm xã hội (8%)", amount: socialInsurance });
  
  const healthInsurance = grossSalary * 0.015; // 1.5%
  deductionItems.push({ type: "insurance", name: "Bảo hiểm y tế (1.5%)", amount: healthInsurance });

  const unemploymentInsurance = grossSalary * 0.01; // 1%
  deductionItems.push({ type: "insurance", name: "Bảo hiểm thất nghiệp (1%)", amount: unemploymentInsurance });

  // Simple mock tax calculation
  const taxableIncome = grossSalary - 11000000; // Giảm trừ gia cảnh bản thân
  const personalIncomeTax = taxableIncome > 0 ? taxableIncome * 0.1 : 0; // Giả sử thuế suất 10%
  if (personalIncomeTax > 0) {
    deductionItems.push({ type: "tax", name: "Thuế TNCN", amount: personalIncomeTax });
  }

  const totalDeductions = totalDeductionsFromWarnings + socialInsurance + healthInsurance + unemploymentInsurance + personalIncomeTax;

  // 6. Calculate Net Salary
  const netSalary = grossSalary - totalDeductions;

  // Construct a PayrollFullDetails object matching the UI-friendly interface
  const fullDetails: PayrollFullDetails = {
    id: payrollId,
    employeeId: mockPayroll.employeeId,
    month: 9,
    year: 2025,
    status: "PAID",
    paymentDate: mockPayroll.payDate ?? new Date(),
    transactionId: "TXN123456789",
  createdAt: new Date(),
  updatedAt: new Date(),

    employee: mockEmployee,
    contract: mockContract,
    baseSalary,
    totalAllowances,
    totalRewards,
    totalDeductions,
    incomeItems,
    deductionItems,
    paidLeaveDays: mockLeaves.paidLeaveDays,
    unpaidLeaveDays: mockLeaves.unpaidLeaveDays,
    grossSalary,
    netSalary,
  };

  return fullDetails;
}

// We keep the old getPayrolls function for now, but it should be updated or removed later.
// A more complete Payroll type for UI purposes
export type PayrollWithDetails = Payroll & {
  employee: Employee & {
    // User and Department are not directly on the Employee model from prismaTypes
    // but we are shaping the data to include them for the UI.
    user: User;
    department: Department | null;
  };
};

/**
 * Fetches payroll data from the database.
 * @returns A promise that resolves to an array of payrolls.
 */
export async function getPayrolls(filters?: any): Promise<PayrollWithDetails[]> {
  console.log("Fetching payrolls with filters:", filters);
  try {
    // Mock data that matches the `PayrollWithDetails` type structure
    const mockPayrolls: PayrollWithDetails[] = [
      {
        id: "pay_1",
        employeeId: "emp_1",
        payPeriodStart: new Date("2025-10-01"),
        payPeriodEnd: new Date("2025-10-31"),
        payDate: new Date("2025-10-25"),
        grossPay: 55000000,
        netPay: 52500000,
        status: "PAID",
        employee: {
          id: "emp_1",
          cognitoId: "cognito_1",
          name: "Alice Johnson",
          email: "alice@example.com",
          employeeCode: "EBD001",
          position: "Senior Developer",
          hireDate: new Date("2022-01-15"),
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: "user_1",
            email: "alice@example.com",
            role: "EMPLOYEE",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          department: {
            id: "dept_1",
            name: "Engineering",
          },
        },
      },
      {
        id: "pay_2",
        employeeId: "emp_2",
        payPeriodStart: new Date("2025-10-01"),
        payPeriodEnd: new Date("2025-10-31"),
        payDate: new Date("2025-10-25"),
        grossPay: 70000000,
        netPay: 65500000,
        status: "PENDING",
        employee: {
          id: "emp_2",
          cognitoId: "cognito_2",
          name: "Bob Williams",
          email: "bob@example.com",
          employeeCode: "EBD002",
          position: "Project Manager",
          hireDate: new Date("2021-05-20"),
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: "user_2",
            email: "bob@example.com",
            role: "EMPLOYEE",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          department: {
            id: "dept_1",
            name: "Engineering",
          },
        },
      },
       {
        id: "pay_3",
        employeeId: "emp_3",
        payPeriodStart: new Date("2025-09-01"),
        payPeriodEnd: new Date("2025-09-30"),
        payDate: new Date("2025-09-25"),
        grossPay: 48000000,
        netPay: 45000000,
        status: "FAILED",
        employee: {
          id: "emp_3",
          cognitoId: "cognito_3",
          name: "Charlie Brown",
          email: "charlie@example.com",
          employeeCode: "EBD003",
          position: "UI/UX Designer",
          hireDate: new Date("2023-02-10"),
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: "user_3",
            email: "charlie@example.com",
            role: "EMPLOYEE",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          department: {
            id: "dept_2",
            name: "Design",
          },
        },
      },
    ];

    // The 'as any' is a temporary workaround because the mock `employee` object 
    // doesn't have all optional fields from the complex `Employee` type.
    // This is safe for UI development.
    return mockPayrolls as any;
  } catch (error) {
    console.error("Failed to fetch payrolls:", error);
    return [];
  }
}

/**
 * Triggers the payroll generation process on the backend.
 */
export async function runPayrollGeneration() {
  try {
    console.log("Triggering payroll generation...");
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Payroll generation completed.");
    return { success: true, message: "Payroll generation completed successfully." };
  } catch (error) {
    console.error("Error running payroll generation:", error);
    return { success: false, message: "Failed to run payroll generation." };
  }
}

// --- Payroll Summary Action ---

export type PayrollSummaryData = {
  totalSalary: number;
  totalEmployees: number;
  totalBonus: number;
  totalDeductions: number;
};

// Try to obtain the Cognito idToken (client-side). On server, this will return null.
async function getIdToken(): Promise<string | null> {
  try {
    // Dynamic import to avoid bundling issues when used server-side.
    const { fetchAuthSession } = await import('@aws-amplify/auth');
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch (e) {
    return null;
  }
}

export async function getPayrollSummary(month: number, year: number): Promise<PayrollSummaryData> {
  try {
    const idToken = await getIdToken();
    const res = await fetch(`${API_BASE}/payrolls/summary?month=${month}&year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      // credentials or auth header can be added here if needed
      next: { revalidate: 0 },
    });
    if (res.ok) {
      const data = await res.json();
      return data as PayrollSummaryData;
    }

  // Fallback mock
  console.log(`Using fallback summary for ${month}/${year}`);
  await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalSalary: 1250000000,
      totalEmployees: 78,
      totalBonus: 85000000,
      totalDeductions: 32000000,
    };
  } catch (error) {
    console.error("Failed to fetch payroll summary:", error);
    return {
      totalSalary: 0,
      totalEmployees: 0,
      totalBonus: 0,
      totalDeductions: 0,
    };
  }
}
