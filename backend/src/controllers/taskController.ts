import { Request, Response } from 'express';
import { getAllTasks, createTask, deleteTask } from '../models/task';

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

export const removeTask = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await deleteTask(Number(id));
        res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
};