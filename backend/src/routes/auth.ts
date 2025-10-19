import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// This route is a placeholder. In a real Cognito setup, 
// it would be a protected route that only authenticated users can access.
router.post('/login', login);

export default router;
