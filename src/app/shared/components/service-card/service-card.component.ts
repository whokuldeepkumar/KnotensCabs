import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CabServiceItem } from '../../../core/models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="service-card card">
      <!-- Top Icon & Price Badge -->
      <div class="card-header-row">
        <div class="service-icon-box">
          <span class="material-symbols-outlined icon">{{ service().icon }}</span>
        </div>
        <span class="price-badge">Starts ₹{{ service().startingPrice }}</span>
      </div>

      <!-- Title & Short Description -->
      <h3 class="service-title">{{ service().title }}</h3>
      <p class="service-desc">{{ service().shortDesc }}</p>

      <!-- Key Feature Highlights -->
      <ul class="feature-list">
        @for (feat of service().features.slice(0, 3); track feat) {
          <li>
            <span class="material-symbols-outlined check-icon">check_circle</span>
            <span>{{ feat }}</span>
          </li>
        }
      </ul>

      <!-- Card Action Button -->
      <div class="card-action">
        <a [routerLink]="['/', service().slug]" class="btn btn-service-cta w-full">
          <span>Book {{ service().title }}</span>
          <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .service-card {
      padding: 1.35rem 1.25rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #FFFFFF;
      border: 1px solid var(--border-color, #E5E7EB);
      border-radius: 18px;
      box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.04);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #1565C0 0%, #FF9800 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 32px -8px rgba(21, 101, 192, 0.14);
        border-color: rgba(21, 101, 192, 0.3);

        &::before {
          opacity: 1;
        }

        .service-icon-box {
          transform: scale(1.08) rotate(-3deg);
          background: #1565C0;
          color: #FFFFFF;
        }

        .btn-service-cta {
          background-color: var(--primary-color, #1565C0);
          color: #FFFFFF;
          border-color: var(--primary-color, #1565C0);

          .arrow-icon {
            transform: translateX(5px);
          }
        }
      }
    }

    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
    }

    .service-icon-box {
      width: 46px;
      height: 46px;
      background: #EFF6FF;
      color: #1565C0;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      .icon {
        font-size: 24px;
      }
    }

    .price-badge {
      background: #FFFBEB;
      color: #D97706;
      border: 1px solid #FDE68A;
      font-size: 0.775rem;
      font-weight: 700;
      padding: 0.25rem 0.7rem;
      border-radius: 50px;
    }

    .service-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }

    .service-desc {
      font-size: 0.875rem;
      color: #6B7280;
      margin-bottom: 0.85rem;
      line-height: 1.45;
    }

    .feature-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 1.15rem;
      margin-top: auto;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.825rem;
        color: #374151;
        font-weight: 500;

        .check-icon {
          font-size: 16px;
          color: #16A34A;
        }
      }
    }

    .card-action {
      .w-full {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .btn-service-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.65rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 50px;
      background-color: #F8FAFC;
      border: 1px solid #E5E7EB;
      color: #111827;
      text-decoration: none;
      transition: all 0.25s ease;

      .arrow-icon {
        font-size: 18px;
        transition: transform 0.25s ease;
      }
    }
  `]
})
export class ServiceCardComponent {
  readonly service = input.required<CabServiceItem>();
}
