import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <span class="section-subtitle">Transparent Pricing</span>
        <h1 class="section-title">Taxi Fares & Rental Packages in Jaipur</h1>
        <p class="section-desc">
          No hidden charges, no unexpected night surcharges. Transparent rate charts for local, airport, and outstation trips.
        </p>
      </div>
    </div>
  `
})
export class PricingComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Taxi Fare Chart Jaipur | Transparent Cab Pricing & Packages',
      description: 'Check transparent Jaipur cab rates for local 8hr rental, airport drop ₹799, outstation ₹11/km with Knotens Cabs.'
    });
  }
}
