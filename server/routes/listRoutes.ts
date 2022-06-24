
import { Router } from 'express';
import { addList, allUserLists, deleteList } from '../controllers/list.controller'

const router = Router();
router.post('/', addList);
router.get('/:id', allUserLists);
router.delete('/list/:id', deleteList)

export default router;