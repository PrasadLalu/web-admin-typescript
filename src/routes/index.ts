import { Router, Request, Response } from 'express';
import roleRoutes from './role';
import authRoutes from './auth';
import userRoutes from './user';

const router = Router();

router.use('/role', roleRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('/health-check', (request: Request, response: Response) => {
    response.send({ message: 'App running...' });
});

export default router;
