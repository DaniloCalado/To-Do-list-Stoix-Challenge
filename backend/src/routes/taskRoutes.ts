import express from 'express';
import * as taskController from '../controllers/taskController';

const router = express.Router();

router.get('/', taskController.getTasks);

export default router;
