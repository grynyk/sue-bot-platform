import { Component } from '@angular/core';
import { GuardsCheckEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  selector: 'sue-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-panel';
  isHeaderVisible$: Observable<boolean>;
  constructor(private readonly router: Router) {
    this.isHeaderVisible$ = this.router.events.pipe(
      filter((event) => event instanceof GuardsCheckEnd),
      map((route: GuardsCheckEnd) => route.url !== '/login')
    );
  }
}
