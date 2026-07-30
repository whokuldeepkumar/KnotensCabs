import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { SeoService } from '../../core/services/seo.service';
import { FaqItem } from '../../core/models/faq.model';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { PopularRoutesComponent } from '../../shared/components/popular-routes/popular-routes.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-outstation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaqAccordionComponent,
    PopularRoutesComponent,
    CtaBannerComponent
  ],
  templateUrl: './outstation.component.html',
  styleUrl: './outstation.component.scss'
})
export class OutstationComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly seoService = inject(SeoService);

  readonly vehicles = this.bookingService.vehicles;
  readonly showSuccessModal = signal<boolean>(false);
  readonly tripType = signal<'one-way' | 'round-trip'>('one-way');

  readonly bookingForm = this.fb.group({
    tripType: ['one-way', Validators.required],
    pickupCity: ['Jaipur', Validators.required],
    destinationCity: ['', Validators.required],
    journeyDate: [new Date().toISOString().split('T')[0], Validators.required],
    journeyTime: ['06:00', Validators.required],
    returnDate: [''],
    vehicleId: ['dzire', Validators.required],
    passengerName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
  });

  readonly outstationFaqs: FaqItem[] = [
    {
      id: 301,
      category: 'Pricing & Payment',
      question: 'How is outstation fare calculated for One-Way and Round-Trips?',
      answer: 'For One-Way trips, you pay only for the distance traveled from pickup to destination plus state tolls. For Round Trips, a minimum of 250 km/day is applicable at the per-km rate of your selected vehicle.'
    },
    {
      id: 302,
      category: 'Pricing & Payment',
      question: 'Are toll taxes, state permit taxes, and driver allowance included?',
      answer: 'Our itemized fare breakdown clearly lists base fare, estimated toll tax, state tax, and driver allowance (₹400/day). You receive total transparent pricing before booking.'
    },
    {
      id: 303,
      category: 'Booking',
      question: 'Can we stop for food or sightseeing along the highway?',
      answer: 'Yes! Our drivers will gladly stop at highway dhabas, tea stalls, or roadside attractions like Chand Baori Stepwell on Jaipur-Agra route.'
    },
    {
      id: 304,
      category: 'General',
      question: 'Are driver night charges applicable?',
      answer: 'A nominal driver night charge of ₹250 applies if the vehicle is driven between 10:00 PM and 06:00 AM.'
    }
  ];

  constructor() {
    this.seoService.setPageMeta({
      title: 'Jaipur Outstation Taxi Service - One-Way & Round Trip Cabs ₹11/Km',
      description: 'Book outstation cabs from Jaipur to Delhi, Ajmer, Udaipur, Jodhpur, Agra & Ranthambore starting at ₹11/km. One-way & round-trip taxi with expert highway drivers.',
      keywords: 'jaipur outstation taxi, jaipur to delhi cab, jaipur to udaipur taxi, jaipur to ajmer cab, one way outstation taxi jaipur'
    });
  }

  setTripType(type: 'one-way' | 'round-trip') {
    this.tripType.set(type);
    this.bookingForm.patchValue({ tripType: type });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const val = this.bookingForm.value;
    this.bookingService.createBooking({
      category: val.tripType === 'one-way' ? 'outstation-one-way' : 'outstation-round',
      pickupLocation: 'Jaipur (' + val.pickupCity + ')',
      dropLocation: val.destinationCity!,
      journeyDate: val.journeyDate!,
      journeyTime: val.journeyTime!,
      returnDate: val.returnDate || undefined,
      vehicleId: val.vehicleId!,
      customer: {
        fullName: val.passengerName!,
        mobileNumber: val.phone!,
        email: 'passenger@knotens.cabs',
        pickupAddress: 'Jaipur Pickup',
        dropAddress: val.destinationCity!
      }
    }).subscribe(() => {
      this.showSuccessModal.set(true);
    });
  }

  whatsappBook() {
    const val = this.bookingForm.value;
    const msg = `Hi Knotens Cabs, I want to book an Outstation ${val.tripType?.toUpperCase()} taxi:\n- Route: Jaipur → ${val.destinationCity}\n- Date: ${val.journeyDate} at ${val.journeyTime}\n- Vehicle: ${val.vehicleId}\n- Name: ${val.passengerName}\n- Phone: ${val.phone}`;
    window.open(`https://wa.me/919829012345?text=${encodeURIComponent(msg)}`, '_blank');
  }

  closeModal() {
    this.showSuccessModal.set(false);
  }
}
