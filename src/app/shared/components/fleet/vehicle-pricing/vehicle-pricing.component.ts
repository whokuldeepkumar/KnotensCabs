import { Component, input } from '@angular/core';
import { Vehicle } from '../../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-pricing',
  standalone: true,
  template: `
    <div class="pricing-wrapper card">
      <h3 class="pricing-title">Tariff & Rate Breakdown</h3>

      <div class="pricing-table">
        <div class="table-row header">
          <span>Service Package</span>
          <span>Included Limit</span>
          <span>Standard Fare</span>
        </div>

        <div class="table-row">
          <span>Jaipur Airport Transfer (Pickup/Drop)</span>
          <span>Point-to-Point (30 Km)</span>
          <strong class="price">₹{{ vehicle().basePriceAirport }}</strong>
        </div>

        <div class="table-row">
          <span>Jaipur Local Rental (Half Day)</span>
          <span>4 Hours / 40 Km</span>
          <strong class="price">₹{{ Math.round(vehicle().hourlyRentalRate8Hours * 0.6) }}</strong>
        </div>

        <div class="table-row">
          <span>Jaipur Local Rental (Full Day)</span>
          <span>8 Hours / 80 Km</span>
          <strong class="price">₹{{ vehicle().hourlyRentalRate8Hours }}</strong>
        </div>

        <div class="table-row">
          <span>Outstation One-Way Taxi</span>
          <span>Per Km Fare</span>
          <strong class="price">₹{{ vehicle().pricePerKm }} / Km</strong>
        </div>

        <div class="table-row">
          <span>Outstation Round Trip</span>
          <span>Min 250 Km / Day</span>
          <strong class="price">₹{{ vehicle().pricePerKm }} / Km</strong>
        </div>
      </div>

      <!-- Additional Surcharges & Policy Info -->
      <div class="policy-grid">
        <div class="policy-box">
          <span class="material-symbols-outlined icon">speed</span>
          <div>
            <strong>Extra Km Charge</strong>
            <p>₹{{ vehicle().pricePerKm }}/Km after package limit</p>
          </div>
        </div>

        <div class="policy-box">
          <span class="material-symbols-outlined icon">schedule</span>
          <div>
            <strong>Waiting Charges</strong>
            <p>₹100 / hour (First 45 mins free at Airport)</p>
          </div>
        </div>

        <div class="policy-box">
          <span class="material-symbols-outlined icon">bedtime</span>
          <div>
            <strong>Driver Night Allowance</strong>
            <p>₹300 - ₹400 (Applicable 10:00 PM to 6:00 AM)</p>
          </div>
        </div>

        <div class="policy-box">
          <span class="material-symbols-outlined icon">toll</span>
          <div>
            <strong>Toll & State Tax Policy</strong>
            <p>Tolls, state taxes & parking paid per actual receipts</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pricing-wrapper {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .pricing-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .pricing-table {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      overflow: hidden;
      margin-bottom: 1.5rem;
    }
    .table-row {
      display: grid;
      grid-template-columns: 2fr 1.5fr 1fr;
      padding: 0.85rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }

      &.header {
        background: var(--primary-color);
        color: #FFFFFF;
        font-weight: 700;
      }

      .price {
        color: var(--primary-color);
        font-weight: 800;
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
        span:nth-child(2) { display: none; }
      }
    }
    .policy-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .policy-box {
      display: flex;
      gap: 0.75rem;
      padding: 0.85rem;
      background: var(--bg-color);
      border-radius: var(--border-radius-sm);

      .icon {
        color: var(--accent-dark);
        font-size: 24px;
      }

      strong {
        font-size: 0.875rem;
        display: block;
        color: var(--text-primary);
      }

      p {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin: 0;
      }
    }
  `]
})
export class VehiclePricingComponent {
  readonly vehicle = input.required<Vehicle>();
  readonly Math = Math;
}
