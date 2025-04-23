import { Router, Request, Response } from 'express';
import roleRoutes from './role';
import authRoutes from './auth';

const router = Router();

router.use('/role', roleRoutes);
router.use('/auth', authRoutes);

router.get('/health-check', (request: Request, response: Response) => {
    response.send({ message: 'App running...' });
});

export default router;
