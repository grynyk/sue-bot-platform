import { ADMIN_PANEL_USER_ROLE } from "./admin-panel-user.enum";

export interface LoginResponse {
  access_token: string;
  email: string;
  role: ADMIN_PANEL_USER_ROLE;
}

export interface LoginData {
  email: string | null;
  password: string | null;
}

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
}
