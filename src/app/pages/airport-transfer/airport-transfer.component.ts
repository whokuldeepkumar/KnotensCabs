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
  selector: 'app-airport-transfer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaqAccordionComponent,
    CtaBannerComponent
  ],
  templateUrl: './airport-transfer.component.html',
  styleUrl: './airport-transfer.component.scss'
})
export class AirportTransferComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly seoService = inject(SeoService);

  readonly vehicles = this.bookingService.vehicles;
  readonly showSuccessModal = signal<boolean>(false);
  readonly transferType = signal<'pickup' | 'drop'>('pickup');

  readonly bookingForm = this.fb.group({
    transferType: ['pickup', Validators.required],
    flightNumber: [''],
    location: ['', Validators.required],
    journeyDate: [new Date().toISOString().split('T')[0], Validators.required],
    journeyTime: ['10:00', Validators.required],
    vehicleId: ['dzire', Validators.required],
    passengerName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
  });

  readonly airportFaqs: FaqItem[] = [
    {
      id: 101,
      category: 'Airport',
      question: 'How does live flight tracking work if my flight is delayed?',
      answer: 'We track your flight number in real-time. If your flight is delayed or arrives early, your chauffeur automatically adjusts pickup timing with ZERO waiting fees.'
    },
    {
      id: 102,
      category: 'Airport',
      question: 'Where will the driver meet me at Jaipur Airport (JAI)?',
      answer: 'Your driver will be waiting right outside Terminal 2 Arrival Exit Gate holding a name placard with your name.'
    },
    {
      id: 103,
      category: 'Airport',
      question: 'Are toll charges and airport parking included in the flat rate?',
      answer: 'Yes! Our ₹799 flat rate for Sedans includes fuel, driver allowance, tolls, and airport entry parking. No hidden charges.'
    },
    {
      id: 104,
      category: 'Airport',
      question: 'Can I book an early morning or midnight airport pickup at 3:00 AM?',
      answer: 'Absolutely! Knotens Cabs operates 24 hours a day, 7 days a week. Night pickups receive guaranteed on-time driver arrival.'
    }
  ];

  constructor() {
    this.seoService.setPageMeta({
      title: 'Jaipur Airport Taxi Service - 24x7 Airport Pickup & Drop ₹799',
      description: 'Book reliable Jaipur Airport (JAI) taxi starting at ₹799. Flight tracking, 45-min free wait time, sanitized AC cabs & instant WhatsApp confirmation.',
      keywords: 'jaipur airport taxi, jaipur airport pickup cab, jaipur airport drop taxi, jaipur airport to hotel taxi, JAI airport cab'
    });
  }

  setTransferType(type: 'pickup' | 'drop') {
    this.transferType.set(type);
    this.bookingForm.patchValue({ transferType: type });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const val = this.bookingForm.value;
    this.bookingService.createBooking({
      category: val.transferType === 'pickup' ? 'airport-pickup' : 'airport-drop',
      pickupLocation: val.transferType === 'pickup' ? 'Jaipur Airport Terminal 2' : val.location!,
      dropLocation: val.transferType === 'pickup' ? val.location! : 'Jaipur Airport Terminal 2',
      journeyDate: val.journeyDate!,
      journeyTime: val.journeyTime!,
      vehicleId: val.vehicleId!,
      customer: {
        fullName: val.passengerName!,
        mobileNumber: val.phone!,
        email: 'passenger@knotens.cabs',
        pickupAddress: val.location!,
        dropAddress: 'Terminal 2 Jaipur Airport'
      }
    }).subscribe(() => {
      this.showSuccessModal.set(true);
    });
  }

  whatsappBook() {
    const val = this.bookingForm.value;
    const msg = `Hi Knotens Cabs, I want to book an Airport ${val.transferType?.toUpperCase()} taxi:\n- Date: ${val.journeyDate} at ${val.journeyTime}\n- Destination/Pickup: ${val.location}\n- Flight No: ${val.flightNumber || 'N/A'}\n- Name: ${val.passengerName}\n- Phone: ${val.phone}`;
    window.open(`https://wa.me/919829012345?text=${encodeURIComponent(msg)}`, '_blank');
  }

  closeModal() {
    this.showSuccessModal.set(false);
  }
}
