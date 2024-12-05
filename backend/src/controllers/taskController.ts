import { Request, Response } from 'express';
import * as Task from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
};
