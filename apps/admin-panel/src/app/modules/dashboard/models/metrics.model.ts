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

export enum StatusDisplay {
  STOPPED = 'Stopped',
  MAINTENANCE = 'Maintenance',
  RUNNING = 'Running',
  STARTING = 'Starting',
  UNKNOWN = 'Unknown',
}

export enum StatusColor {
  ERROR = '#9b000e',
  WARNING = '#f8ab37',
  SUCCESS = '#508b1b',
  LOADING = '#9fd45f',
  UNKNOWN = '#646973',
}

export const SERVER_STATUS_MAP: Record<ServerState, StatusDisplay> = {
  [ServerState.UP]: StatusDisplay.RUNNING,
  [ServerState.CRASHED]: StatusDisplay.STOPPED,
  [ServerState.STARTING]: StatusDisplay.STARTING,
};

export const STATUS_COLOR_MAP: Record<ServerState, StatusColor> = {
  [ServerState.UP]: StatusColor.SUCCESS,
  [ServerState.CRASHED]: StatusColor.ERROR,
  [ServerState.STARTING]: StatusColor.LOADING,
};
