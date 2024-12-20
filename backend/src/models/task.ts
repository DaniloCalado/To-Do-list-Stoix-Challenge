import { pool } from '../config/database';
import { ResultSetHeader } from 'mysql2';
import { TaskInput } from '../interfaces/interfaces';


export const getAllTasks = async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
};

export const createTask = async (title: string, description: string): Promise<ResultSetHeader> => {
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description]
    );
    return result;
};

export const deleteTask = async (id: number): Promise<ResultSetHeader> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM tasks WHERE id = ?', [id]);
    return result;
};

export const updateTask = async (
    id: number,
    task: Partial<TaskInput & { completed: boolean }>
): Promise<ResultSetHeader> => {
    const { title, description } = task;
    const [result] = await pool.query<ResultSetHeader>(
        'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
    );
    return result;
};

export const updateCompletedStatus = async (
    id: number,
    task: Partial<TaskInput & { completed: boolean }>
  ): Promise<ResultSetHeader> => {
    const { completed } = task;
  
    const query = `
      UPDATE tasks
      SET 
        completed = ?,
        completed_at = CASE
          WHEN ? THEN NOW() 
          ELSE completed_at
        END
      WHERE id = ?
    `;
  
    const [result] = await pool.query<ResultSetHeader>(
      query,
      [completed, completed, id]
    );
  
    return result;
  };
  