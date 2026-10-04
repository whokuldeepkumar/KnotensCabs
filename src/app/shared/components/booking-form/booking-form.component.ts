import { Component, inject, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { BookingType } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private router = inject(Router);

  readonly vehicles = this.bookingService.vehicles;
  readonly isSubmitted = signal<boolean>(false);
  readonly showSuccessModal = signal<boolean>(false);

  readonly bookingForm = this.fb.group({
    serviceType: ['airport-pickup' as BookingType, Validators.required],
    pickupLocation: ['', [Validators.required, Validators.minLength(3)]],
    dropLocation: ['', [Validators.required, Validators.minLength(3)]],
    journeyDate: [new Date().toISOString().split('T')[0], Validators.required],
    journeyTime: ['10:00', Validators.required],
    selectedVehicleId: ['dzire', Validators.required],
    passengerName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  // Calculate fare preview reactively
  readonly fareEstimate = computed(() => {
    const type = (this.bookingForm.value.serviceType as BookingType) || 'airport-pickup';
    const vehicleId = this.bookingForm.value.selectedVehicleId || 'dzire';
    return this.bookingService.calculateFare(type, vehicleId, 250);
  });

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formData = this.bookingForm.value;
    console.log('Cab Booking Request Submitted:', formData);
    
    // Save to service signal
    this.bookingService.activeBooking.set(formData as any);
    
    // Show success confirmation modal
    this.showSuccessModal.set(true);
  }

  closeModal() {
    this.showSuccessModal.set(false);
    this.bookingForm.reset({
      serviceType: 'airport-pickup',
      journeyDate: new Date().toISOString().split('T')[0],
      journeyTime: '10:00',
      selectedVehicleId: 'dzire'
    });
    this.isSubmitted.set(false);
  }

  whatsappBook() {
    const f = this.bookingForm.value;
    const vehicleName = this.vehicles().find(v => v.id === f.selectedVehicleId)?.name || 'Sedan';
    const text = `*New Cab Booking Request - Knotens Cabs*%0A%0A` +
      `*Service:* ${f.serviceType}%0A` +
      `*Pickup:* ${f.pickupLocation}%0A` +
      `*Drop:* ${f.dropLocation}%0A` +
      `*Date:* ${f.journeyDate} at ${f.journeyTime}%0A` +
      `*Vehicle:* ${vehicleName}%0A` +
      `*Name:* ${f.passengerName}%0A` +
      `*Phone:* ${f.phone}`;
      
    window.open(`https://wa.me/919103612859?text=${text}`, '_blank');
  }
}
