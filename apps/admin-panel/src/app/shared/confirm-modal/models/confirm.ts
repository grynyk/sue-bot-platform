import { Observable } from 'rxjs';
import { ConfirmModalData } from './confirm-modal.model';

export interface ConfirmBase {
  confirm(data: ConfirmModalData): Observable<boolean | undefined>;
}
