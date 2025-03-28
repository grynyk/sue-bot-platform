export enum ServerState {
  UP = 'up',
  CRASHED = 'crashed',
  STARTING = 'starting',
}
export interface ServerMetrics {
  releaseDate: string;
  maintenance: boolean;
  state: ServerState;
}

export interface HerokuResponse {
  released_at: string;
  maintenance: boolean;
  state: ServerState;
}
