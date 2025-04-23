import { Router, Request, Response } from 'express';
import roleRoutes from './role';

const router = Router();

router.use('/role', roleRoutes);

router.get('/health-check', (request: Request, response: Response) => {
    response.send({ message: 'App running...' });
});

export default router;
