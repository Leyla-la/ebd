import { create } from 'zustand';
import { PayrollWithDetails, runPayrollGeneration } from '@/lib/actions/payroll';

type PayrollStatus = 'PENDING' | 'PAID' | 'FAILED';

export type PayrollFilters = {
  searchTerm: string;
  department: string;
  status: string;
};

type PayrollState = {
  payrolls: PayrollWithDetails[];
  filteredPayrolls: PayrollWithDetails[];
  filters: PayrollFilters;
  isGenerating: boolean;
  selectedPayroll: PayrollWithDetails | null;
  initializePayrolls: (payrolls: PayrollWithDetails[]) => void;
  setFilter: (filter: Partial<PayrollFilters>) => void;
  runGeneration: () => Promise<void>;
  setSelectedPayroll: (payroll: PayrollWithDetails | null) => void;
};

const filterPayrolls = (payrolls: PayrollWithDetails[], filters: PayrollFilters): PayrollWithDetails[] => {
  return payrolls.filter(p => {
    const searchTermMatch = !filters.searchTerm || 
      p.employee.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      p.employee.employeeCode.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const departmentMatch = !filters.department || !p.employee.department || p.employee.department.name === filters.department;
    
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
  },
  isGenerating: false,
  selectedPayroll: null,

  initializePayrolls: (payrolls) => {
    set({ payrolls, filteredPayrolls: payrolls });
  },

  setFilter: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    const payrolls = get().payrolls;
    const filteredPayrolls = filterPayrolls(payrolls, filters);
    set({ filters, filteredPayrolls });
  },

  runGeneration: async () => {
    set({ isGenerating: true });
    await runPayrollGeneration();
    // Here you would re-fetch the payrolls
    // For now, we just stop the loading state
    set({ isGenerating: false });
  },

  setSelectedPayroll: (payroll) => {
    set({ selectedPayroll: payroll });
  },
}));
