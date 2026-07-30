import { ApplicationConfig, provideZoneChangeDetection, Injectable, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions, TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Title } from '@angular/platform-browser';

import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title) {
      this.title.setTitle(`${title} | Knotens Cabs Jaipur`);
    } else {
      this.title.setTitle('Knotens Cabs | Reliable Taxi & Cab Service in Jaipur');
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withViewTransitions()
    ),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAnimationsAsync(),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy }
  ]
};
