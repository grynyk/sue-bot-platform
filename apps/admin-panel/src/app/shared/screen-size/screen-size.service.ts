import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private breakpoint = 768;
  private isMobileView$: BehaviorSubject<boolean>;

  constructor() {
    this.isMobileView$ = new BehaviorSubject<boolean>(this.isMobileView());
    window.addEventListener('resize', () => this.onResize());
  }

  public isMobile$(): Observable<boolean> {
    return this.isMobileView$.asObservable();
  }

  public isMobile(): boolean {
    return this.isMobileView$.getValue();
  }

  private isMobileView(): boolean {
    return window.innerWidth <= this.breakpoint;
  }

  private onResize(): void {
    const isMobile: boolean = this.isMobileView();
    this.isMobileView$.next(isMobile);
  }
}
