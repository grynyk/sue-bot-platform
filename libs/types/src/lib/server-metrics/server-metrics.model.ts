import { ServerState } from "./server-metrics.enum";

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
