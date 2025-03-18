import express from 'express';
import { registerUser } from '../controller/user.controller.js';
import {verifyUser } from '../controller/user.controller.js';

import { loginUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register',registerUser);
router.get('/verify/:token',verifyUser);
router.get("/login",loginUser);

export default router;