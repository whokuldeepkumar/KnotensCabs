import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  template: `
    <section class="trust-indicators section-padding">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon-bg">
              <span class="material-symbols-outlined icon">route</span>
            </div>
            <div class="stat-info">
              <span class="stat-number">10,000+</span>
              <span class="stat-label">Trips Completed</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon-bg">
              <span class="material-symbols-outlined icon">sentiment_very_satisfied</span>
            </div>
            <div class="stat-info">
              <span class="stat-number">5,000+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon-bg">
              <span class="material-symbols-outlined icon">support_agent</span>
            </div>
            <div class="stat-info">
              <span class="stat-number">24×7</span>
              <span class="stat-label">Customer Support</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon-bg">
              <span class="material-symbols-outlined icon">badge</span>
            </div>
            <div class="stat-info">
              <span class="stat-number">100%</span>
              <span class="stat-label">Verified Drivers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .trust-indicators {
      background-color: var(--bg-color, #F8FAFC);
      padding: 3rem 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 540px) {
        grid-template-columns: 1fr;
      }
    }
    .stat-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      background: var(--card-bg, #FFFFFF);

      .stat-icon-bg {
        width: 54px;
        height: 54px;
        border-radius: var(--border-radius-md, 16px);
        background: var(--primary-light, #E3F2FD);
        color: var(--primary-color, #1565C0);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .icon {
          font-size: 28px;
        }
      }

      .stat-info {
        display: flex;
        flex-direction: column;
      }

      .stat-number {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--text-primary, #0F172A);
        line-height: 1.1;
      }

      .stat-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary, #64748B);
      }
    }
  `]
})
export class StatsComponent {}
