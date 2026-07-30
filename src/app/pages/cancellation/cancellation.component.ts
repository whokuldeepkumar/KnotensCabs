import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cancellation',
  standalone: true,
  template: `
    <div class="page-container section-padding">
      <div class="container">
        <h1 class="section-title">Cancellation & Refund Policy</h1>
        <p class="section-desc">Transparent cancellation guidelines and 100% full refund policy before cab dispatch.</p>
      </div>
    </div>
  `
})
export class CancellationPolicyComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Cancellation & Refund Policy | Knotens Cabs Jaipur',
      description: 'Zero cancellation fee policy up to 2 hours prior to pickup time with Knotens Cabs Jaipur.'
    });
  }
}
