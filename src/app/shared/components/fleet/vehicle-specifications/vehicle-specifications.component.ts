import { Component, input } from '@angular/core';
import { Vehicle } from '../../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-specifications',
  standalone: true,
  template: `
    <div class="specs-wrapper card">
      <h3 class="specs-title">Vehicle Specifications</h3>
      
      <div class="specs-grid">
        <div class="spec-card">
          <span class="material-symbols-outlined icon">group</span>
          <div>
            <span class="label">Seating Capacity</span>
            <strong class="val">{{ vehicle().passengerCapacity }} Passengers + Driver</strong>
          </div>
        </div>

        <div class="spec-card">
          <span class="material-symbols-outlined icon">luggage</span>
          <div>
            <span class="label">Luggage Boot</span>
            <strong class="val">{{ vehicle().luggageCapacity }} Large Bags</strong>
          </div>
        </div>

        <div class="spec-card">
          <span class="material-symbols-outlined icon">ac_unit</span>
          <div>
            <span class="label">Air Conditioning</span>
            <strong class="val">{{ vehicle().hasAC ? 'Dual AC / Climate Control' : 'Standard AC' }}</strong>
          </div>
        </div>

        <div class="spec-card">
          <span class="material-symbols-outlined icon">local_gas_station</span>
          <div>
            <span class="label">Fuel Type</span>
            <strong class="val">{{ vehicle().fuelType }}</strong>
          </div>
        </div>

        <div class="spec-card">
          <span class="material-symbols-outlined icon">settings</span>
          <div>
            <span class="label">Transmission</span>
            <strong class="val">{{ vehicle().transmission }}</strong>
          </div>
        </div>

        <div class="spec-card">
          <span class="material-symbols-outlined icon">gps_fixed</span>
          <div>
            <span class="label">Safety & Tracking</span>
            <strong class="val">Live GPS Monitored</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .specs-wrapper {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .specs-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 540px) {
        grid-template-columns: 1fr;
      }
    }
    .spec-card {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: var(--bg-color);
      padding: 1rem;
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--border-color);

      .icon {
        color: var(--primary-color);
        font-size: 26px;
      }

      .label {
        font-size: 0.75rem;
        color: var(--text-muted);
        display: block;
      }

      .val {
        font-size: 0.9rem;
        color: var(--text-primary);
      }
    }
  `]
})
export class VehicleSpecificationsComponent {
  readonly vehicle = input.required<Vehicle>();
}
