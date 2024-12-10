import express from 'express';
import { getTasks, addTask, removeTask, editTask, editCompletedStatus } from '../controllers/taskController';
import csrf from 'csurf';

const router = express.Router();


router.get('/', getTasks);  

router.post('/', csrf(), addTask);  
router.delete('/:id', csrf(), removeTask); 
router.put('/:id', csrf(), editTask);  
router.put('/:id/completed', csrf(), editCompletedStatus);

export default router;
