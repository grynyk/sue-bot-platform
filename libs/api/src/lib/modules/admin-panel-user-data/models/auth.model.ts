export interface AuthRequest<T> extends Request {
  user: T;
}
