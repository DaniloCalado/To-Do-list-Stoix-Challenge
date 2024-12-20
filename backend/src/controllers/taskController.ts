import { Request, Response } from 'express';
import { TaskInput } from '../interfaces/interfaces';
import { getAllTasks, createTask, deleteTask, updateTask, updateCompletedStatus } from '../models/task';

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
        const rowsAffected = await deleteTask(Number(id));
        if (rowsAffected === 0) {
            res.status(404).json({ error: 'Tarefa não encontrada' });
            return;
        }

        res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
};

export const editTask = async (
    req: Request<{ id: string }, {}, Partial<TaskInput>>,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const rowsAffected = await updateTask(Number(id), { title, description });
        if (rowsAffected === 0) {
            res.status(404).json({ error: 'Tarefa não encontrada' });
            return;
        }

        res.json({ id: Number(id), title, description });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar tarefa' });
    }
};

export const editCompletedStatus = async (
    req: Request<{ id: string }, {}, { completed: number }>,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const rowsAffected = await updateCompletedStatus(Number(id), { completed });

        if (rowsAffected === 0) {
            res.status(404).json({ error: 'Tarefa não encontrada' });
            return;
        }

        res.json({ id: Number(id), completed });
    } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
        res.status(500).json({ error: 'Erro ao atualizar o status da tarefa' });
    }
};



