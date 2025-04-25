import { Router } from 'express';
import { joiValidator } from '../middlewares';
import { loginUser, registerUser } from '../schemas';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/login', joiValidator(loginUser), AuthController.login);
router.post('/register', joiValidator(registerUser), AuthController.register);

export default router;