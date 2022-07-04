
import { Router } from 'express';
import { addList, allUserLists, updateList, deleteList } from '../controllers/list.controller'

const router = Router();
router.post('/', addList);
router.get('/:id', allUserLists);
router.delete('/list/:id', deleteList);
router.put('/list/:id', updateList);

export default router;