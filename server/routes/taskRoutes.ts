
import { Router } from 'express';
import { addTask, allListTask, deleteTask } from '../controllers/task.controller'

const router = Router();
router.post('/', addTask);
router.get('/:id', allListTask);
router.delete('/task/:id', deleteTask)

export default router;