import { Component, input } from '@angular/core';
import { ItemizedFare } from '../../../../core/models/booking.model';

@Component({
  selector: 'app-fare-estimator',
  standalone: true,
  template: `
    <div class="fare-estimator-card card">
      <div class="card-header">
        <span class="material-symbols-outlined icon">receipt</span>
        <h4>Itemized Fare Summary</h4>
      </div>

      <div class="breakdown-list">
        <div class="row">
          <span>Vehicle Selected:</span>
          <strong>{{ fare().vehicleName }}</strong>
        </div>

        <div class="row">
          <span>Base Ride Fare:</span>
          <span>₹{{ fare().baseFare }}</span>
        </div>

        @if (fare().distanceCharge > 0) {
          <div class="row">
            <span>Distance Charge ({{ fare().estimatedDistanceKm }} Km):</span>
            <span>₹{{ fare().distanceCharge }}</span>
          </div>
        }

        @if (fare().driverAllowance > 0) {
          <div class="row">
            <span>Driver Day/Night Allowance:</span>
            <span>₹{{ fare().driverAllowance }}</span>
          </div>
        }

        @if (fare().estimatedToll > 0) {
          <div class="row">
            <span>Est. Toll Charges:</span>
            <span>₹{{ fare().estimatedToll }}</span>
          </div>
        }

        @if (fare().estimatedStateTax > 0) {
          <div class="row">
            <span>Est. State Border Tax:</span>
            <span>₹{{ fare().estimatedStateTax }}</span>
          </div>
        }

        @if (fare().discountAmount > 0) {
          <div class="row discount">
            <span>Promo Discount ({{ fare().couponCodeApplied }}):</span>
            <span>- ₹{{ fare().discountAmount }}</span>
          </div>
        }

        <div class="divider"></div>

        <div class="row grand-total">
          <strong>Grand Total:</strong>
          <span class="total-price">₹{{ fare().grandTotal }}</span>
        </div>
      </div>

      <div class="policy-footer">
        <span class="material-symbols-outlined icon">check_circle</span>
        <span>Transparent fare. Tolls paid as per actual receipts.</span>
      </div>
    </div>
  `,
  styles: [`
    .fare-estimator-card {
      padding: 1.5rem;
      background: #FFFFFF;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);

      .icon { color: var(--primary-color); font-size: 22px; }
      h4 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
    }
    .breakdown-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.875rem;

      .row {
        display: flex;
        justify-content: space-between;
        color: var(--text-secondary);

        &.discount {
          color: #10B981;
          font-weight: 600;
        }

        &.grand-total {
          color: var(--text-primary);
          font-size: 1.1rem;

          .total-price {
            color: var(--primary-color);
            font-weight: 800;
            font-size: 1.5rem;
          }
        }
      }

      .divider {
        height: 1px;
        background: var(--border-color);
        margin: 0.5rem 0;
      }
    }
    .policy-footer {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.775rem;
      color: var(--text-muted);
      margin-top: 1rem;
      background: var(--bg-color);
      padding: 0.5rem 0.75rem;
      border-radius: 4px;

      .icon { color: #10B981; font-size: 16px; }
    }
  `]
})
export class FareEstimatorComponent {
  readonly fare = input.required<ItemizedFare>();
}
