import 'dotenv/config';
import { Pool, QueryResult } from 'pg';
import { DbConnectionOptions, DbDataResult } from '../../models';
/**
 * Establish connection with heroku database
 * Execute queries on db
 */
const CONNECTION_OPTIONS: DbConnectionOptions = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
};

const pool: Pool = new Pool({
  ...CONNECTION_OPTIONS,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query<T>(
  text: string,
  params?: unknown[]
): Promise<DbDataResult<T>> {
  const res: QueryResult<T> = await pool.query(text, params);
  return res as unknown as DbDataResult<T>;
}

export default query;
