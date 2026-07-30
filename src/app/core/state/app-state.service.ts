import { Injectable, signal, computed } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { BookingRecord, ItemizedFare } from '../models/booking.model';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // State Signals
  readonly currentUser = signal<UserProfile | null>(null);
  readonly activeBooking = signal<Partial<BookingRecord> | null>(null);
  readonly selectedVehicle = signal<Vehicle | null>(null);
  readonly currentFareEstimate = signal<ItemizedFare | null>(null);
  readonly currentTheme = signal<'light' | 'dark'>('light');
  readonly appConfig = signal<{ currency: string; language: string; isOnline: boolean }>({
    currency: 'INR',
    language: 'en',
    isOnline: navigator.onLine
  });

  readonly isAuthenticated = computed(() => !!this.currentUser()?.isAuthenticated);

  setUser(user: UserProfile | null) {
    this.currentUser.set(user);
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  updateOnlineStatus(status: boolean) {
    this.appConfig.update(cfg => ({ ...cfg, isOnline: status }));
  }
}
