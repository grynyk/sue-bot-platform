import { ADMIN_PANEL_USER_ROLE, ADMIN_PANEL_USER_STATUS } from "@sue-bot-platform/types";
export interface AdminItem {
  id: number;
  name: string;
  email: string;
  status: ADMIN_PANEL_USER_STATUS;
  role: ADMIN_PANEL_USER_ROLE;
  lastLogin: string;
  createdAt: string;
}
