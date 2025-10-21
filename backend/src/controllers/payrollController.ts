import { PrismaClient } from '@prisma/client';
import express from 'express';
import * as payrollService from '../services/payrollService';
import { calculateEmployeeSalary } from '../services/payrollService';
import * as paymentService from '../services/paymentService';
type Request = express.Request;
type Response = express.Response;

export const getPayrollsList = async (req: Request, res: Response) => {
  try {
    const payrolls = await payrollService.getPayrollsList();
    res.json(payrolls);
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: 'Error fetching payrolls list', error: err.message });
  }
};

export const getPayrollDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Payroll ID is required' });
    }
    const payrollDetails = await payrollService.getPayrollDetails(id);
    if (!payrollDetails) {
      return res.status(404).json({ message: 'Payroll details not found' });
    }
    res.json(payrollDetails);
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: 'Error fetching payroll details', error: err.message });
  }
};

export const getPayrollSummary = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required' });
    }

    const summary = await payrollService.getPayrollSummary(Number(month), Number(year));
    res.json(summary);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Error fetching payroll summary', error: err.message });
  }
};

const prisma = new PrismaClient();

// GET /payrolls - Get all payroll runs
export const getAllPayrolls = async (req: Request, res: Response) => {
  try {
    const payrolls = await prisma.payroll.findMany({
      include: {
        items: {
          include: {
            employee: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(payrolls);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Failed to fetch payrolls', details: err.message });
  }
};

// GET /payrolls/:id - Get a single payroll run by ID
export const getPayrollById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Payroll ID is required' });
    }
    const payroll = await prisma.payroll.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            employee: {
              include: {
                user: true,
                department: true
              }
            }
          }
        }
      }
    });
    if (!payroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }
    res.json(payroll);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Failed to fetch payroll', details: err.message });
  }
};

// POST /payrolls/run
export const runPayrollCycle = async (req: Request, res: Response) => {
    const { month, year } = req.body;

    if (!month || !year) {
        return res.status(400).json({ error: 'Month and year are required.' });
    }

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // 1. Create a main Payroll record for this cycle
        const payrollRun = await prisma.payroll.create({
            data: {
                month: month.toString(),
                year: year,
                payPeriodStart: startDate,
                payPeriodEnd: endDate,
                payDate: new Date(), // Or a specific pay date logic
                status: 'PROCESSING',
            },
        });

        // 2. Get all employees
        const employees = await prisma.employee.findMany();

        // 3. Calculate and create PayrollItem for each employee
        for (const employee of employees) {
            try {
                const salaryDetails = await calculateEmployeeSalary(employee.id, startDate, endDate);
                await prisma.payrollItem.create({
                    data: {
                        payrollId: payrollRun.id,
                        employeeId: employee.id,
                        baseSalary: salaryDetails.baseSalary,
                        bonuses: salaryDetails.kpiBonus,
                        deductions: salaryDetails.totalDeductions,
                        netPay: salaryDetails.netPay,
                        status: 'PENDING', // Or 'CALCULATED'
                        details: salaryDetails.details as any, // Using any for now for the JSON field
                    },
                });
            } catch (error: any) {
                console.error(`Failed to calculate salary for employee ${employee.id}: ${error.message}`);
                // Optionally create a failed payroll item
                await prisma.payrollItem.create({
                    data: {
                        payrollId: payrollRun.id,
                        employeeId: employee.id,
                        status: 'FAILED',
                        netPay: 0,
                        baseSalary: 0,
                        bonuses: 0,
                        deductions: 0,
                        details: { error: error.message } as any,
                    },
                });
            }
        }

        // 4. Update the main Payroll run status
        await prisma.payroll.update({
            where: { id: payrollRun.id },
            data: { status: 'COMPLETED' },
        });

        res.status(201).json({ message: 'Payroll cycle completed successfully.', payrollRun });

    } catch (error) {
        res.status(500).json({ error: 'Failed to run payroll cycle', details: error });
    }
};

// POST /payrolls/:id/pay - pay all pending items in a payroll run
export const payPayroll = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Payroll ID is required' });
    const results = await paymentService.payAllPendingInPayroll(id);
    return res.json({ message: 'Payment processing finished', results });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: 'Failed to process payments', details: err.message });
  }
};

// POST /payrolls/items/:itemId/pay - pay a single payroll item
export const payPayrollItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    if (!itemId) return res.status(400).json({ error: 'Payroll Item ID is required' });
    const result = await paymentService.payPayrollItem(itemId);
    return res.json(result);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: 'Failed to process item payment', details: err.message });
  }
};

