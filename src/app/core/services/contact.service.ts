import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from './api.service';

export interface ContactRequest {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = inject(ApiService);

  sendContactMessage(data: ContactRequest): Observable<{ success: boolean; message: string }> {
    // Backend API ready structure
    // return this.api.post<{ success: boolean }>('contact', data);
    return of({
      success: true,
      message: 'Thank you! Your message has been sent to Knotens Cabs Jaipur support team. We will call you within 15 minutes.'
    }).pipe(delay(800));
  }
}
