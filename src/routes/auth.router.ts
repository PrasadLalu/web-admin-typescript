import { Router } from 'express';
import { joiValidator } from '@middlewares';
import { AuthController } from '@controllers';
import { loginUser, registerUser } from '@schemas';

const router = Router();
const authController = new AuthController();

router.post('/login', joiValidator(loginUser), authController.login.bind(authController));
router.post('/register', joiValidator(registerUser), authController.register.bind(authController));

export default router;
