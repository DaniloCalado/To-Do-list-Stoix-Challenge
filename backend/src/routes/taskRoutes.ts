import express from 'express';
import { getTasks, addTask, removeTask } from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', removeTask);


export default router;
