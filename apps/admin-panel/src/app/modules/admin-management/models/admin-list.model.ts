import { ADMIN_ROLE, ADMIN_STATUS } from "./admin-item.model";

export interface AdminItem {
    id: number;
    name: string;
    email: string;
    status: ADMIN_STATUS;
    role: ADMIN_ROLE;
    lastLogin: string;
    createdAt: string;
}
