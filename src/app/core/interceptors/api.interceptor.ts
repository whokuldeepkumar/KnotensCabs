import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, finalize, timer } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/notification.service';
import { LoggerService } from '../services/logger.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const notificationService = inject(NotificationService);
  const logger = inject(LoggerService);

  // Show global loader
  loadingService.show();
  logger.log(`HTTP ${req.method} Request: ${req.url}`);

  // Clone request to add authorization and JSON headers if needed
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'X-Client-Platform': 'Knotens-Web-Angular21'
    }
  });

  return next(authReq).pipe(
    retry({
      count: 1,
      delay: (error) => {
        // Retry only on 5xx server errors or timeouts
        if (error.status >= 500 || error.status === 0) {
          logger.warn(`Retrying failed request: ${req.url}`);
          return timer(1000);
        }
        throw error;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (!navigator.onLine) {
        errorMessage = 'Internet connection lost. Please check your network connection.';
        notificationService.error('Offline Mode', errorMessage);
      } else if (error.status === 401) {
        errorMessage = 'Your session has expired. Please login again.';
        notificationService.warning('Unauthorized', errorMessage);
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
        notificationService.error('Access Denied', errorMessage);
      } else if (error.status === 404) {
        errorMessage = 'Requested service or resource not found.';
        notificationService.error('Not Found', errorMessage);
      } else if (error.status >= 500) {
        errorMessage = 'Server is currently undergoing maintenance. Please call hotline +91 98290 12345.';
        notificationService.error('Server Maintenance', errorMessage);
      }

      logger.error(`HTTP ${error.status} Error on ${req.url}:`, error.message);
      return throwError(() => new Error(errorMessage));
    }),
    finalize(() => {
      loadingService.hide();
    })
  );
};
