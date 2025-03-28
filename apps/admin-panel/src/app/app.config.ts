import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom(NgxChartsModule),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    { provide: 'NODE_ENV', useValue: process.env['NODE_ENV'] },
  ],
};
