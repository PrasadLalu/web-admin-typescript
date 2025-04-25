import { Router } from 'express';
import { UserController } from '@controllers';

const router = Router();
const userController = new UserController();

router.get('/', userController.findAll.bind(userController));
router.get('/:id', userController.findById.bind(userController));

export default router;