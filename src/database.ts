import { config } from 'dotenv'; // Load environment variables from .env file
import { Pool } from 'pg';

config(); // Initialize environment variables

let pool: Pool;

export function initializeDatabase(): void {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL connection string is not defined in the environment variables');
    }
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
}

export async function select(query: string) {
    try {
        const result = await pool.query(
        'SELECT $1',
            [query]
        );

    console.log(result.rows);
    } catch (err) {
        console.error('Query error:', err);
    } finally {
        await pool.end();
    }
}

export async function insert(table: string, column: string, value: string) {
    try {
        const result = await pool.query(
            `INSERT INTO ${table} (${column}) VALUES ($1) RETURNING *`,
            [value]
        );
        console.log(result.rows);
    } catch (err) {
        console.error('Query error:', err);
    } finally {
        await pool.end();
    }
}