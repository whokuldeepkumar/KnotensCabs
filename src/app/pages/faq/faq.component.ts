import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <span class="section-subtitle">Got Questions?</span>
        <h1 class="section-title">Frequently Asked Questions (FAQ)</h1>
        <p class="section-desc">
          Answers to common questions about booking, payments, airport transfers, toll charges, and cancellations.
        </p>
      </div>
    </div>
  `
})
export class FaqComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Frequently Asked Questions | Knotens Cabs Jaipur',
      description: 'Find answers to 15+ common questions about Jaipur taxi booking, outstation per km rates, airport waiting time, and payment options.'
    });
  }
}
