import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { SeoService } from '../../core/services/seo.service';
import { FaqItem } from '../../core/models/faq.model';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-local-taxi',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaqAccordionComponent,
    CtaBannerComponent
  ],
  templateUrl: './local-taxi.component.html',
  styleUrl: './local-taxi.component.scss'
})
export class LocalTaxiComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly seoService = inject(SeoService);

  readonly vehicles = this.bookingService.vehicles;
  readonly showSuccessModal = signal<boolean>(false);

  readonly bookingForm = this.fb.group({
    packageType: ['8hrs-80km', Validators.required],
    pickupAddress: ['', Validators.required],
    journeyDate: [new Date().toISOString().split('T')[0], Validators.required],
    journeyTime: ['09:00', Validators.required],
    vehicleId: ['dzire', Validators.required],
    passengerName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
  });

  readonly localFaqs: FaqItem[] = [
    {
      id: 201,
      category: 'Booking',
      question: 'What is included in the 8 Hours / 80 Km Jaipur local package?',
      answer: 'Our 8 Hrs / 80 Km package includes a dedicated AC cab with a professional driver, fuel, and driver allowance. It covers all major Pink City monuments like Amber Fort, Hawa Mahal, Jal Mahal, City Palace, and local shopping bazaars.'
    },
    {
      id: 202,
      category: 'Pricing & Payment',
      question: 'What happens if our tour exceeds 8 hours or 80 km?',
      answer: 'Extra km beyond 80 km is billed at nominal vehicle rate (e.g. ₹11/km for Sedan) and extra time beyond 8 hours is billed at ₹150/hour.'
    },
    {
      id: 203,
      category: 'General',
      question: 'Are monument entrance tickets and parking fees included?',
      answer: 'Monument entry tickets, guide fees, and palace parking fees are paid directly by passengers. Fuel, driver allowance, and car charges are 100% included in the package.'
    },
    {
      id: 204,
      category: 'Booking',
      question: 'Can the driver suggest authentic Rajasthani restaurants and shopping markets?',
      answer: 'Yes! Our drivers are courteous local Jaipur residents who can guide you to authentic Dal Baati Churma restaurants and verified handicraft markets in Johari Bazaar and Bapu Bazaar.'
    }
  ];

  constructor() {
    this.seoService.setPageMeta({
      title: 'Jaipur Local Taxi Service - Full Day Sightseeing Cab ₹2,000',
      description: 'Book Jaipur local taxi for Amber Fort, Hawa Mahal & Pink City sightseeing. Full day (8 Hrs / 80 Km) cab hire starting at ₹2,000 with expert local drivers.',
      keywords: 'jaipur local taxi, jaipur sightseeing cab, full day cab hire jaipur, jaipur local rental taxi, amber fort taxi jaipur'
    });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const val = this.bookingForm.value;
    this.bookingService.createBooking({
      category: 'local',
      pickupLocation: val.pickupAddress!,
      dropLocation: 'Jaipur Local City Tour (' + val.packageType + ')',
      journeyDate: val.journeyDate!,
      journeyTime: val.journeyTime!,
      vehicleId: val.vehicleId!,
      customer: {
        fullName: val.passengerName!,
        mobileNumber: val.phone!,
        email: 'passenger@knotens.cabs',
        pickupAddress: val.pickupAddress!,
        dropAddress: 'Pink City Tour'
      }
    }).subscribe(() => {
      this.showSuccessModal.set(true);
    });
  }

  whatsappBook() {
    const val = this.bookingForm.value;
    const msg = `Hi Knotens Cabs, I want to book a Jaipur Local Sightseeing Taxi:\n- Package: ${val.packageType}\n- Date: ${val.journeyDate} at ${val.journeyTime}\n- Pickup: ${val.pickupAddress}\n- Vehicle: ${val.vehicleId}\n- Name: ${val.passengerName}\n- Phone: ${val.phone}`;
    window.open(`https://wa.me/919103612859?text=${encodeURIComponent(msg)}`, '_blank');
  }

  closeModal() {
    this.showSuccessModal.set(false);
  }
}
