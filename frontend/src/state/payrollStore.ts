import { create } from 'zustand';
import { PayrollWithDetails, runPayrollGeneration, getPayrollSummary, PayrollSummaryData } from '@/lib/actions/payroll';

type PayrollStatus = 'PENDING' | 'PAID' | 'FAILED';

export type PayrollFilters = {
  searchTerm: string;
  department: string;
  status: string;
  month: number;
  year: number;
};

type PayrollState = {
  payrolls: PayrollWithDetails[];
  filteredPayrolls: PayrollWithDetails[];
  filters: PayrollFilters;
  isGenerating: boolean;
  selectedPayroll: PayrollWithDetails | null;
  summary: PayrollSummaryData;
  initializePayrolls: (payrolls: PayrollWithDetails[]) => void;
  setFilter: (filter: Partial<PayrollFilters>) => void;
  runGeneration: (month: number, year: number) => Promise<void>;
  setSelectedPayroll: (payroll: PayrollWithDetails | null) => void;
  fetchSummary: (month: number, year: number) => Promise<void>;
};

const filterPayrolls = (payrolls: PayrollWithDetails[], filters: PayrollFilters): PayrollWithDetails[] => {
  return payrolls.filter(p => {
    const searchTermMatch = !filters.searchTerm || 
      p.employee.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      p.employee.employeeCode.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const departmentMatch = !filters.department || (p.employee.department && p.employee.department.name === filters.department);
    
    const statusMatch = !filters.status || p.status === filters.status;

    return searchTermMatch && departmentMatch && statusMatch;
  });
};

export const usePayrollStore = create<PayrollState>((set, get) => ({
  payrolls: [],
  filteredPayrolls: [],
  filters: {
    searchTerm: '',
    department: '',
    status: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
  isGenerating: false,
  selectedPayroll: null,
  summary: {
    totalSalary: 0,
    totalEmployees: 0,
    totalBonus: 0,
    totalDeductions: 0,
  },

  initializePayrolls: (payrolls) => {
    set({ payrolls, filteredPayrolls: payrolls });
    const { month, year } = get().filters;
    get().fetchSummary(month, year);
  },

  setFilter: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    const payrolls = get().payrolls;
    const filteredPayrolls = filterPayrolls(payrolls, filters);
    set({ filters, filteredPayrolls });
    if (newFilters.month !== undefined || newFilters.year !== undefined) {
      get().fetchSummary(filters.month, filters.year);
    }
  },

  runGeneration: async (month: number, year: number) => {
    set({ isGenerating: true });
    await runPayrollGeneration();
    // In a real app, you would re-fetch the payrolls here
    set({ isGenerating: false });
  },

  setSelectedPayroll: (payroll) => {
    set({ selectedPayroll: payroll });
  },

  fetchSummary: async (month, year) => {
    const summaryData = await getPayrollSummary(month, year);
    set({ summary: summaryData });
  },
}));
