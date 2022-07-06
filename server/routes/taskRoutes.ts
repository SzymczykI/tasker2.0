
import { Router } from 'express';
import { addTask, allListTask, updateTask, deleteTask } from '../controllers/task.controller'

const router = Router();
router.post('/', addTask);
router.get('/:id', allListTask);
router.delete('/task/:id', deleteTask);
router.put('/task/:id', updateTask);

export default router;