export enum ServerState {
  UP = 'up',
  CRASHED = 'crashed',
  STARTING = 'starting',
}

export interface ServerMetrics {
  state: string | null;
  maintenance: boolean | null;
  releaseDate: string | null;
}

export interface HerokuResponse {
  released_at: string;
  maintenance: boolean;
  state: ServerState;
}
