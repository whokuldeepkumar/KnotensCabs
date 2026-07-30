import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <span class="section-subtitle">About Knotens Cabs</span>
        <h1 class="section-title">Jaipur's Premier Cab & Travel Service</h1>
        <p class="section-desc">
          Founded in Jaipur, Rajasthan, Knotens Cabs provides safe, comfortable, and affordable cab rides across Pink City and North India.
        </p>
      </div>
    </div>
  `
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'About Us | Knotens Cabs Jaipur',
      description: 'Learn about Knotens Cabs Jaipur, our mission, vision, licensed drivers, and commitment to safe Rajasthan taxi services.'
    });
  }
}
