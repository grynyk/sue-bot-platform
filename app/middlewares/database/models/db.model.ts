export class DbDataResult<T> {
  rowCount: number;
  rows: T;
}
export interface DbConnectionOptions {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}
