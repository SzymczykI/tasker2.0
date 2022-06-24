
import { Router } from 'express';
import { addTask, allListTask } from '../controllers/task.controller'

const router = Router();
router.post('/', addTask);
router.get('/:id', allListTask);
// router.post('/list/:id', deleteList)

export default router;