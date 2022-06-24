
import { Router } from 'express';
import { addList, allUserLists } from '../controllers/list.controller'

const router = Router();
router.post('/', addList);
router.get('/:id', allUserLists);
// router.post('/list/:id', deleteList)

export default router;