import { Router } from 'express';
import { runPayrollCycle, getAllPayrolls, getPayrollById } from '../controllers/payrollController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// @desc    Run a new payroll cycle for a given month and year
// @route   POST /api/payrolls/run
// @access  Private/Admin
router.post('/run', authMiddleware(['admin']), runPayrollCycle);

// @desc    Get all payroll runs
// @route   GET /api/payrolls
// @access  Private/Admin
router.get('/', authMiddleware(['admin']), getAllPayrolls);

// @desc    Get a single payroll run by ID
// @route   GET /api/payrolls/:id
// @access  Private/Admin
router.get('/:id', authMiddleware(['admin']), getPayrollById);

export default router;
