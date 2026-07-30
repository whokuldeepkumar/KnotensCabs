import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <h1 class="section-title">Privacy Policy</h1>
        <p class="section-desc">At Knotens Cabs, we respect your privacy and protect your personal information.</p>
      </div>
    </div>
  `
})
export class PrivacyPolicyComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Privacy Policy | Knotens Cabs Jaipur',
      description: 'Privacy policy and data protection terms for Knotens Cabs Jaipur.'
    });
  }
}
