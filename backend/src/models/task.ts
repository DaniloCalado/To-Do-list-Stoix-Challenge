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
    completed: number // 0 ou 1, representando o estado da tarefa
  ): Promise<ResultSetHeader> => {
    const query = `
      UPDATE tasks
      SET 
        completed = ?, 
        completed_at = CASE 
          WHEN ? = 1 THEN NOW()  -- Atualiza a data se o status for 1
          ELSE completed_at     -- Mantém a data atual se o status for 0
        END
      WHERE id = ?
        AND completed != ?;    -- Garante que a atualização só ocorre se houver mudança no status
    `;
  
    const [result] = await pool.query<ResultSetHeader>(
      query,
      [completed, completed, id, completed] // Parâmetros para os placeholders
    );
  
    return result;
  };
  