import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="vehicle-card card">
      @if (vehicle().popular) {
        <span class="popular-badge">Most Popular</span>
      }

      <div class="image-wrapper">
        <img [src]="vehicle().image" [alt]="vehicle().name" loading="lazy">
      </div>

      <div class="card-content">
        <div class="category-tag">{{ vehicle().category }}</div>
        <h3 class="vehicle-name">{{ vehicle().name }}</h3>

        <div class="specs-grid">
          <div class="spec-item">
            <span class="material-symbols-outlined icon">group</span>
            <span>{{ vehicle().passengerCapacity }} Seats</span>
          </div>
          <div class="spec-item">
            <span class="material-symbols-outlined icon">luggage</span>
            <span>{{ vehicle().luggageCapacity }} Bags</span>
          </div>
          <div class="spec-item">
            <span class="material-symbols-outlined icon">ac_unit</span>
            <span>{{ vehicle().hasAC ? 'Full AC' : 'Non-AC' }}</span>
          </div>
          <div class="spec-item">
            <span class="material-symbols-outlined icon">local_gas_station</span>
            <span>{{ vehicle().fuelType }}</span>
          </div>
        </div>

        <div class="price-row">
          <div class="price-info">
            <span class="amount">₹{{ vehicle().pricePerKm }}</span>
            <span class="unit">/ km</span>
          </div>
          <span class="airport-rate">Airport: ₹{{ vehicle().basePriceAirport }}</span>
        </div>

        <div class="card-actions">
          <a routerLink="/" fragment="quick-booking" class="btn btn-accent btn-sm w-full">
            Book Now
          </a>
          <a routerLink="/fleet" class="btn btn-outline btn-sm w-full">
            Details
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vehicle-card {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--card-bg, #FFFFFF);
    }
    .popular-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 2;
      background: var(--accent-color, #FF9800);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: var(--border-radius-full, 50px);
      box-shadow: 0 4px 10px rgba(255, 152, 0, 0.3);
    }
    .image-wrapper {
      height: 190px;
      overflow: hidden;
      background: #F1F5F9;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition, all 0.3s ease);
      }

      &:hover img {
        transform: scale(1.05);
      }
    }
    .card-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .category-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--primary-color, #1565C0);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.25rem;
    }
    .vehicle-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary, #0F172A);
      margin-bottom: 1rem;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
      margin-bottom: 1.25rem;
      background: var(--bg-color, #F8FAFC);
      padding: 0.75rem;
      border-radius: var(--border-radius-sm, 8px);
    }
    .spec-item {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8rem;
      color: var(--text-secondary, #64748B);

      .icon {
        font-size: 16px;
        color: var(--primary-color, #1565C0);
      }
    }
    .price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      margin-top: auto;
    }
    .price-info {
      .amount {
        font-size: 1.35rem;
        font-weight: 800;
        color: var(--primary-color);
      }
      .unit {
        font-size: 0.8rem;
        color: var(--text-secondary);
      }
    }
    .airport-rate {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--accent-dark);
      background: var(--accent-light);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .card-actions {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 0.5rem;

      .w-full {
        width: 100%;
      }
    }
  `]
})
export class VehicleCardComponent {
  readonly vehicle = input.required<Vehicle>();
}
