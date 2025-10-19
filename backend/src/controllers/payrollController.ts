import { PrismaClient } from '@prisma/client';
import express from 'express';
import { calculateEmployeeSalary } from '../services/payrollService';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

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


// GET /payrolls
export const getAllPayrolls = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (roles.includes("admin")) {
      // Admin: get all payrolls
      const payrolls = await prisma.payroll.findMany({ include: { items: true } });
      return res.json(payrolls);
    } else {
      // Non-admins should not access this
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payrolls', details: error });
  }
};

// GET /payrolls/:id
export const getPayrollById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const payroll = await prisma.payroll.findUnique({ 
        where: { id: id as string }, 
        include: { 
            items: {
                include: {
                    employee: true
                }
            } 
        } 
    });
    if (!payroll) return res.status(404).json({ error: "Not found" });
    
    const roles = req.user?.role || [];
    if (roles.includes("admin")) return res.json(payroll);

    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll', details: error });
  }
};

