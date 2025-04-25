import { Router } from 'express';
import { joiValidator } from '../middlewares';
import { createRole } from '../schemas';
import RoleController from '../controllers/RoleController';

const router = Router();

router.get('/', RoleController.findAll);
router.get('/:id', RoleController.findById);
router.delete('/:id', RoleController.deleteById);
router.post('/', joiValidator(createRole), RoleController.create);

export default router;
