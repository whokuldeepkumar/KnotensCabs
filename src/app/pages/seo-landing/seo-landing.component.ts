import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BookingService } from '../../core/services/booking.service';
import { SeoLandingService, SeoLandingConfig } from '../../core/services/seo-landing.service';

import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { BookingFormComponent } from '../../shared/components/booking-form/booking-form.component';
import { PopularPickupsComponent } from '../../shared/components/seo/popular-pickups/popular-pickups.component';
import { PopularDestinationsComponent } from '../../shared/components/seo/popular-destinations/popular-destinations.component';
import { PricingTableComponent } from '../../shared/components/seo/pricing-table/pricing-table.component';
import { VehicleCardComponent } from '../../shared/components/vehicle-card/vehicle-card.component';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { Testimonial } from '../../core/models/testimonial.model';

@Component({
  selector: 'app-seo-landing',
  standalone: true,
  imports: [
    PageBannerComponent,
    BookingFormComponent,
    PopularPickupsComponent,
    PopularDestinationsComponent,
    PricingTableComponent,
    VehicleCardComponent,
    FaqAccordionComponent,
    CtaBannerComponent
  ],
  templateUrl: './seo-landing.component.html',
  styleUrl: './seo-landing.component.scss'
})
export class SeoLandingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private seoLandingService = inject(SeoLandingService);
  private bookingService = inject(BookingService);

  readonly allVehicles = this.bookingService.vehicles;
  readonly pageSlug = signal<string>('services');

  readonly config = computed<SeoLandingConfig>(() => {
    return this.seoLandingService.getConfig(this.pageSlug());
  });

  readonly testimonials: Testimonial[] = [
    {
      id: 'r1',
      name: 'Sunil Agarwal',
      location: 'Jaipur',
      tripType: 'Jaipur Airport Transfer',
      rating: 5,
      comment: 'Punctual service! Driver arrived 10 mins early at Malviya Nagar and helped with luggage at Airport T2.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: '3 days ago',
      googleReview: true
    },
    {
      id: 'r2',
      name: 'Kavita Mehta',
      location: 'Ahmedabad',
      tripType: 'Jaipur Sightseeing Tour',
      rating: 5,
      comment: 'Very polite driver who guided us through Amer Fort and recommended authentic Hawa Mahal lassi shops.',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      date: '1 week ago',
      googleReview: true
    }
  ];

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const slug = urlSegments.length > 0 ? urlSegments[0].path : 'services';
      this.pageSlug.set(slug);
      this.injectSeoData();
    });
  }

  private injectSeoData() {
    const cfg = this.config();
    this.seo.setPageMeta({
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      canonicalUrl: `https://knotens.cabs/${cfg.slug}`
    });

    // Inject Rich JSON-LD Schemas: TaxiService, LocalBusiness, FAQPage & BreadcrumbList
    this.seo.injectStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TaxiService',
          'name': `Knotens Cabs - ${cfg.title}`,
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'Knotens Cabs',
            'telephone': '+919829012345',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Malviya Nagar Sector 3',
              'addressLocality': 'Jaipur',
              'addressRegion': 'Rajasthan',
              'addressCountry': 'IN'
            }
          },
          'areaServed': 'Jaipur, Rajasthan',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'price': cfg.startingPrice
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': cfg.faqs.map(f => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer
            }
          }))
        }
      ]
    });
  }
}
