import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <h1 class="section-title">Terms & Conditions</h1>
        <p class="section-desc">Terms of service governing taxi bookings with Knotens Cabs in Jaipur and Rajasthan.</p>
      </div>
    </div>
  `
})
export class TermsComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Terms & Conditions | Knotens Cabs Jaipur',
      description: 'Terms of service, passenger safety guidelines, and ride rules for Knotens Cabs Jaipur.'
    });
  }
}
