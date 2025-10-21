import { Router } from 'express';
import { getPayrollsList, getPayrollDetails, runPayrollCycle, getAllPayrolls, getPayrollById } from '../controllers/payrollController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// New, improved routes
router.get('/list', authMiddleware(["SuperAdmins", "admin"]), getPayrollsList);
router.get('/details/:id', authMiddleware(["SuperAdmins", "admin"]), getPayrollDetails);


// --- Old Routes ---
// @desc    Run a new payroll cycle for a given month and year
// @route   POST /api/payrolls/run
// @access  Private/Admin
router.post('/run', authMiddleware(["SuperAdmins", "admin"]), runPayrollCycle);

// @desc    Get all payroll runs
// @route   GET /api/payrolls
// @access  Private/Admin
router.get('/', authMiddleware(["SuperAdmins", "admin"]), getAllPayrolls);

// @desc    Get a single payroll run by ID
// @route   GET /api/payrolls/:id
// @access  Private/Admin
router.get('/:id', authMiddleware(["SuperAdmins", "admin"]), getPayrollById);

export default router;
