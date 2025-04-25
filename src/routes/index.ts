import { Router, Request, Response } from 'express';
import roleRoutes from './role.router';
import authRoutes from './auth.router';
import userRoutes from './user.router';

const router = Router();

router.use('/role', roleRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('/health-check', (request: Request, response: Response) => {
    response.send({ message: 'App running...' });
});

export default router;
