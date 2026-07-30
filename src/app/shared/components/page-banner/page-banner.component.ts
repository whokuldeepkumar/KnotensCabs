import { Component, input } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-page-banner',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <section class="page-banner">
      <div class="banner-bg-overlay"></div>
      <div class="container">
        @if (breadcrumbs().length > 0) {
          <app-breadcrumb [items]="breadcrumbs()"></app-breadcrumb>
        }
        <div class="tag-badge-glow">
          <span class="material-symbols-outlined icon">local_taxi</span>
          {{ subtitle() }}
        </div>
        <h1 class="title">{{ title() }}</h1>
        @if (description()) {
          <p class="description">{{ description() }}</p>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-banner {
      background: linear-gradient(135deg, #070F1E 0%, #0F2342 60%, #1565C0 100%);
      color: #FFFFFF;
      padding: 3.25rem 0 2.75rem;
      position: relative;
      overflow: hidden;
    }
    .banner-bg-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 80% 20%, rgba(21, 101, 192, 0.25) 0%, transparent 60%);
      pointer-events: none;
    }
    .tag-badge-glow {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      color: #7DD3FC;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 50px;
      margin-bottom: 0.85rem;

      .icon {
        font-size: 16px;
        color: #FF9800;
      }
    }
    .title {
      font-size: 2.35rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 0.75rem;
      color: #FFFFFF !important;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }
    }
    .description {
      color: #CBD5E1 !important;
      font-size: 1.025rem;
      max-width: 720px;
      line-height: 1.6;
      margin: 0;
    }
  `]
})
export class PageBannerComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('Knotens Cabs Jaipur');
  readonly description = input<string>('');
  readonly breadcrumbs = input<BreadcrumbItem[]>([]);
}
