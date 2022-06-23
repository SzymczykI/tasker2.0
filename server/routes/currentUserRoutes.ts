
import { Router } from 'express';
import { getCurrentUser } from '../controllers/current.controller'

const router = Router();
router.post('/current', getCurrentUser);

export default router;