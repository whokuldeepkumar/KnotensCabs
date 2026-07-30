import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly gaId = environment.gaId;

  // Track Page View (GA4 & Meta Pixel)
  trackPageView(pageUrl: string, pageTitle: string) {
    if (typeof window !== 'undefined') {
      if (window.gtag && this.gaId) {
        window.gtag('config', this.gaId, {
          page_path: pageUrl,
          page_title: pageTitle
        });
      }
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }

  // Track Conversion Events (e.g., Booking Submitted, WhatsApp Clicked)
  trackEvent(eventName: string, eventCategory: string, eventLabel?: string, value?: number) {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', eventName, {
          event_category: eventCategory,
          event_label: eventLabel,
          value: value
        });
      }
      if (window.fbq) {
        window.fbq('trackCustom', eventName, { category: eventCategory, label: eventLabel, value });
      }
    }
  }

  // Track Booking Conversion
  trackBookingSuccess(bookingId: string, amount: number, tripType: string) {
    this.trackEvent('purchase', 'Booking', `${tripType} - ${bookingId}`, amount);
  }
}
