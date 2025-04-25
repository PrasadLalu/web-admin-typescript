import { Router } from 'express';
import { createRole } from '@schemas';
import { joiValidator } from '@middlewares';
import { RoleController } from '@controllers';

const router = Router();
const roleController = new RoleController();

router.get('/', roleController.findAll.bind(roleController));
router.get('/:id', roleController.findById.bind(roleController));
router.delete('/:id', roleController.deleteById.bind(roleController));
router.post('/', joiValidator(createRole), roleController.create.bind(roleController));

export default router;
