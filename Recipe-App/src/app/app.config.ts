import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { recipeInterceptor } from '../recipe.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([recipeInterceptor])),

    // 👇 Required for animations and toast
    importProvidersFrom(BrowserAnimationsModule),
    
    // 👇 Toast provider
    provideToastr({
      positionClass: 'toast-top-center',
      timeOut: 200,
      preventDuplicates: true,
      maxOpened: 1,           // Only one toast visible at a time
      autoDismiss: true,      // Automatically dismiss previous toast
      closeButton: true,
      progressBar: true
    }),
  ],
};
