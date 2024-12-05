import { Request, Response } from 'express';
import { getAllTasks, createTask } from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
};

export const addTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const result = await createTask(title, description);
        res.status(201).json({ id: result.insertId, title, description });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};
