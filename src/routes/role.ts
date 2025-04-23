import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const router = Router();

router.get('/', RoleController.findAll);
router.post('/', RoleController.create);
router.get('/:id', RoleController.findById);
router.delete('/:id', RoleController.deleteById);

export default router;
