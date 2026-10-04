import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BookingService } from '../../core/services/booking.service';
import { HeroSliderComponent } from '../../shared/components/hero-slider/hero-slider.component';
import { BookingFormComponent } from '../../shared/components/booking-form/booking-form.component';
import { StatsComponent } from '../../shared/components/stats/stats.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { VehicleCardComponent } from '../../shared/components/vehicle-card/vehicle-card.component';
import { PopularRoutesComponent } from '../../shared/components/popular-routes/popular-routes.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

import { Testimonial } from '../../core/models/testimonial.model';
import { FaqItem } from '../../core/models/faq.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroSliderComponent,
    BookingFormComponent,
    StatsComponent,
    ServiceCardComponent,
    VehicleCardComponent,
    PopularRoutesComponent,
    TestimonialCardComponent,
    FaqAccordionComponent,
    CtaBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  private bookingService = inject(BookingService);

  readonly services = this.bookingService.services;
  readonly vehicles = this.bookingService.vehicles;

  readonly homeFaqs: FaqItem[] = [
    {
      id: 1,
      question: 'How do I book a cab with Knotens Cabs in Jaipur?',
      answer: 'You can book directly via our online booking form above, send us a WhatsApp message, or call our 24x7 helpline at +91 98290 12345. Instant confirmation is provided.',
      category: 'Booking'
    },
    {
      id: 2,
      question: 'What are the charges for Jaipur Airport pickup and drop?',
      answer: 'Jaipur Airport transfers start at a flat rate of ₹799 for Sedan cabs (Dzire/Etios) with zero hidden waiting charges or flight delay fees.',
      category: 'Airport'
    },
    {
      id: 3,
      question: 'Are tolls and state taxes included in the outstation fare?',
      answer: 'Our per-km rates cover vehicle rental and driver allowance. Toll taxes, state border entry taxes, and parking fees are paid transparently as per actual receipts.',
      category: 'Pricing & Payment'
    },
    {
      id: 4,
      question: 'What happens if my flight to Jaipur Airport is delayed?',
      answer: 'Our dispatch team tracks all incoming flights in real-time. Your driver will adjust pickup time automatically at no extra cost, including 45 minutes free wait time upon landing.',
      category: 'Airport'
    },
    {
      id: 5,
      question: 'Can I hire a Tempo Traveller for group tours in Jaipur?',
      answer: 'Yes! We offer 12-seater, 17-seater, and 26-seater luxury AC Tempo Travellers with push-back seats and sound systems for group and wedding events.',
      category: 'General'
    },
    {
      id: 6,
      question: 'What is your cancellation policy for cab bookings?',
      answer: 'We offer 100% free cancellation up to 2 hours prior to scheduled pickup time. No cancellation charges apply for early notifications.',
      category: 'Cancellation'
    }
  ];

  readonly testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Rohan Sharma',
      location: 'Delhi',
      tripType: 'Jaipur to Delhi Outstation',
      rating: 5,
      comment: 'Excellent service! The Innova Crysta was spotless and the driver Mr. Vikram was extremely courteous. On-time pickup from Malviya Nagar.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: '2 days ago',
      googleReview: true
    },
    {
      id: 't2',
      name: 'Priya Verma',
      location: 'Mumbai',
      tripType: 'Jaipur Airport Pickup',
      rating: 5,
      comment: 'Our flight arrived at 1 AM. Knotens Cabs driver was waiting at arrival gate with a namecard. Very safe for female solo travellers!',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      date: '1 week ago',
      googleReview: true
    },
    {
      id: 't3',
      name: 'Dr. Amit Khandelwal',
      location: 'Jaipur',
      tripType: 'Pink City Local Rental',
      rating: 5,
      comment: 'Booked an 8-hour local package for family visiting Amer Fort and Hawa Mahal. Clean Dzire cab, smooth driving, highly recommended!',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: '2 weeks ago',
      googleReview: true
    }
  ];

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Reliable Taxi & Cab Service in Jaipur',
      description: 'Book online local taxi, Jaipur airport transfer, one-way outstation cab, Dzire, Ertiga, Innova Crysta, and Tempo Traveller in Jaipur with Knotens Cabs.',
      keywords: 'Jaipur taxi service, Knotens Cabs, Jaipur airport cab, outstation taxi Jaipur, car rental Jaipur, Dzire, Ertiga, Innova Crysta, Jaipur taxi booking'
    });

    this.seo.injectStructuredData({
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      'name': 'Knotens Cabs',
      'url': 'https://knotens.cabs',
      'logo': 'https://knotens.cabs/assets/logo.png',
      'telephone': '+919103612859',
      'priceRange': '₹799 - ₹5500',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '17, Shree Hanuman vatika, Kalwar Road, hathoj',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'postalCode': '302012',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '26.9630615',
        'longitude': '75.6815056'
      },
      'openingHours': 'Mo-Su 00:00-23:59'
    });
  }
}
