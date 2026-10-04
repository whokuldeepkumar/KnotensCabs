import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="cta-wrapper">
      <div class="container">
        <section class="cta-banner">
          <div class="cta-content">
            <span class="cta-tag">{{ tag() }}</span>
            <h2 class="cta-title">{{ title() }}</h2>
            <p class="cta-desc">{{ description() }}</p>
          </div>
          <div class="cta-actions">
            <a [routerLink]="buttonLink()" class="btn btn-accent btn-lg">
              {{ buttonText() }}
            </a>
            <a href="tel:+919103612859" class="btn btn-outline-white btn-lg">
              <span class="material-symbols-outlined">call</span> Call +91 91036 12859
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .cta-wrapper {
      padding-top: 2rem;
      padding-bottom: 3.5rem;
      background-color: var(--bg-color);
    }
    .cta-banner {
      background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
      color: #FFFFFF;
      padding: 3.5rem 3rem;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(13, 71, 161, 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      @media (max-width: 992px) {
        flex-direction: column;
        text-align: center;
        padding: 2.5rem 1.5rem;
      }
    }
    .cta-content {
      max-width: 650px;
    }
    .cta-tag {
      color: #FF9800;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 0.5rem;
      display: block;
    }
    .cta-title {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      color: #FFFFFF;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }
    .cta-desc {
      color: #E3F2FD;
      font-size: 1rem;
      margin: 0;
    }
    .cta-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 992px) {
        justify-content: center;
      }
    }
    .btn-outline-white {
      background: transparent;
      border: 2px solid #FFFFFF;
      color: #FFFFFF;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  `]
})
export class CtaBannerComponent {
  readonly title = input<string>('Ready to Book Your Taxi Ride in Jaipur?');
  readonly description = input<string>('Get guaranteed on-time pick up, clean cars, and transparent pricing with Knotens Cabs.');
  readonly tag = input<string>('24x7 Cab Booking');
  readonly buttonText = input<string>('Book Online Now');
  readonly buttonLink = input<string>('/book');
}
