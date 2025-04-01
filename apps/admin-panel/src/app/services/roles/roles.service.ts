import { Injectable } from '@angular/core';
import { ADMIN_PANEL_USER_ROLE, LoginResponse } from '@sue-bot-platform/types';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  public hasRoles(acceptedRoles: ADMIN_PANEL_USER_ROLE[]): boolean {
    const currentUser: LoginResponse = JSON.parse(localStorage.getItem('current_user'));
    return acceptedRoles.includes(ADMIN_PANEL_USER_ROLE[currentUser.role]);
  }
}
