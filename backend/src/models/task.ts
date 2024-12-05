import { pool } from '../config/database';
import { ResultSetHeader } from 'mysql2';


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