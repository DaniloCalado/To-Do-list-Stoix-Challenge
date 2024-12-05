import express from 'express';
import { getTasks, addTask, removeTask, editTask, editCompletedStatus } from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', removeTask);
router.put('/:id', editTask);
router.put('/:id/completed', editCompletedStatus);


export default router;
