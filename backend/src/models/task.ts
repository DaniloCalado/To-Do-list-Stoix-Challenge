import { pool } from '../config/database';
import { TaskInput } from '../interfaces/interfaces';

export const getAllTasks = async () => {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
};

export const createTask = async (title: string, description: string) => {
    const { rows } = await pool.query(
        'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
        [title, description]
    );
    return rows[0];
};

export const deleteTask = async (id: number): Promise<number> => {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return result.rowCount || 0;
};

export const updateTask = async (
    id: number,
    task: Partial<TaskInput & { completed: boolean }>
): Promise<number> => {
    const { title, description } = task;

    const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2 WHERE id = $3',
        [title, description, id]
    );

    return result.rowCount || 0;
};

export const updateCompletedStatus = async (
    id: number,
    task: { completed: number }
): Promise<number> => {
    const { completed } = task;

    const query = `
    UPDATE tasks
    SET 
      completed = $1,
      completed_at = NOW()
    WHERE id = $2
    AND completed != $1
  `;

    const result = await pool.query(query, [completed, id]);

    return result.rowCount || 0;
}


