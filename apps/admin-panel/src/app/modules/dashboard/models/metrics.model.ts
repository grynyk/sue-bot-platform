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
  STOPPED = '#9b000e',
  MAINTENANCE = '#f8ab37',
  RUNNING = '#508b1b',
  STARTING = '#9fd45f',
  UNKNOWN = '#646973',
}

export const SERVER_STATUS_MAP: Record<ServerState, StatusDisplay> = {
  [ServerState.UP]: StatusDisplay.RUNNING,
  [ServerState.CRASHED]: StatusDisplay.STOPPED,
  [ServerState.STARTING]: StatusDisplay.STARTING,
};

export const STATUS_COLOR_MAP: Record<ServerState, StatusColor> = {
  [ServerState.UP]: StatusColor.RUNNING,
  [ServerState.CRASHED]: StatusColor.STOPPED,
  [ServerState.STARTING]: StatusColor.STARTING,
};
