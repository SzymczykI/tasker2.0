
import { Router } from 'express';
import {
  register,
  login,
  logout,
} from '../controllers/auth.controller'

const router = Router();
router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;