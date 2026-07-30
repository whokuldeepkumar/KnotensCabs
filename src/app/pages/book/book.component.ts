import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BookingService } from '../../core/services/booking.service';
import { BookingCategory } from '../../core/models/booking.model';

import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { BookingProgressComponent } from '../../shared/components/booking/booking-progress/booking-progress.component';
import { TripSelectorComponent } from '../../shared/components/booking/trip-selector/trip-selector.component';
import { PickupLocationComponent } from '../../shared/components/booking/pickup-location/pickup-location.component';
import { DropLocationComponent } from '../../shared/components/booking/drop-location/drop-location.component';
import { DateTimePickerComponent } from '../../shared/components/booking/date-time-picker/date-time-picker.component';
import { VehicleSelectorComponent } from '../../shared/components/booking/vehicle-selector/vehicle-selector.component';
import { CouponBoxComponent } from '../../shared/components/booking/coupon-box/coupon-box.component';
import { PaymentMethodComponent } from '../../shared/components/booking/payment-method/payment-method.component';
import { FareEstimatorComponent } from '../../shared/components/booking/fare-estimator/fare-estimator.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageBannerComponent,
    BookingProgressComponent,
    TripSelectorComponent,
    PickupLocationComponent,
    DropLocationComponent,
    DateTimePickerComponent,
    VehicleSelectorComponent,
    CouponBoxComponent,
    PaymentMethodComponent,
    FareEstimatorComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seo = inject(SeoService);
  private bookingService = inject(BookingService);
  private router = inject(Router);

  readonly currentStep = signal<number>(1);
  readonly appliedCoupon = signal<string>('');
  readonly isSubmitting = signal<boolean>(false);

  readonly bookingForm = this.fb.group({
    category: ['airport-pickup' as BookingCategory, Validators.required],
    pickupLocation: ['Jaipur International Airport (JAI)', [Validators.required, Validators.minLength(3)]],
    dropLocation: ['Malviya Nagar, Jaipur', [Validators.required, Validators.minLength(3)]],
    journeyDate: [new Date().toISOString().split('T')[0], Validators.required],
    journeyTime: ['10:00', Validators.required],
    returnDate: [''],
    vehicleId: ['dzire', Validators.required],
    paymentMethod: ['pay-to-driver' as 'pay-to-driver' | 'upi-advance' | 'card' | 'corporate-billing', Validators.required],
    customer: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      pickupAddress: [''],
      dropAddress: [''],
      specialInstructions: [''],
      gstNumber: ['']
    })
  });

  // Calculate live itemized fare based on form signals
  readonly itemizedFare = computed(() => {
    const category = (this.bookingForm.value.category as BookingCategory) || 'airport-pickup';
    const vehicleId = this.bookingForm.value.vehicleId || 'dzire';
    const coupon = this.appliedCoupon();
    return this.bookingService.calculateItemizedFare(category, vehicleId, 250, coupon);
  });

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Book Cab Online Jaipur | Instant Taxi Reservation',
      description: 'Book online Jaipur local taxi, airport pickup/drop, and outstation cab in 5 easy steps with Knotens Cabs Jaipur.',
      canonicalUrl: 'https://knotens.cabs/book'
    });
  }

  nextStep() {
    if (this.currentStep() === 2) {
      if (this.bookingForm.get('pickupLocation')?.invalid || this.bookingForm.get('dropLocation')?.invalid) {
        this.bookingForm.get('pickupLocation')?.markAsTouched();
        this.bookingForm.get('dropLocation')?.markAsTouched();
        return;
      }
    }
    if (this.currentStep() < 5) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  swapLocations() {
    const p = this.bookingForm.value.pickupLocation;
    const d = this.bookingForm.value.dropLocation;
    this.bookingForm.patchValue({
      pickupLocation: d,
      dropLocation: p
    });
  }

  onCouponApplied(code: string) {
    this.appliedCoupon.set(code);
  }

  submitBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const f = this.bookingForm.value;
    const payload = {
      category: f.category as BookingCategory,
      pickupLocation: f.pickupLocation!,
      dropLocation: f.dropLocation!,
      journeyDate: f.journeyDate!,
      journeyTime: f.journeyTime!,
      vehicleId: f.vehicleId!,
      customer: f.customer as any,
      fare: this.itemizedFare(),
      payment: {
        method: f.paymentMethod as any,
        status: 'pending' as const,
        advanceAmount: 0,
        dueAmount: this.itemizedFare().grandTotal
      }
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (record) => {
        this.isSubmitting.set(false);
        this.router.navigate(['/booking-success']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.router.navigate(['/booking-failed']);
      }
    });
  }
}
