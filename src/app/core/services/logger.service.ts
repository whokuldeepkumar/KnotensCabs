import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string, ...args: any[]) {
    if (!environment.production) {
      console.log(`[LOG] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (!environment.production) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
