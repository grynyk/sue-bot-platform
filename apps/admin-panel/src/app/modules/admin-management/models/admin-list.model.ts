import { ADMIN_ROLE } from "./admin-item.model";

export interface AdminItem {
    id: number;
    name: string;
    email: string;
    status: string;
    role: ADMIN_ROLE;
    lastLogin: string;
    createdAt: string;
}
