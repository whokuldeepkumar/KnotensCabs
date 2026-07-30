import { Component, input, output, inject } from '@angular/core';
import { BookingService } from '../../../../core/services/booking.service';
import { BookingCategory } from '../../../../core/models/booking.model';

@Component({
  selector: 'app-vehicle-selector',
  standalone: true,
  template: `
    <div class="vehicle-selector-box card">
      <h3 class="box-title">Choose Vehicle for Your Ride</h3>

      <div class="vehicles-grid">
        @for (v of vehicles(); track v.id) {
          @let fare = getFare(v.id);
          <div 
            class="v-card card" 
            [class.active]="selectedVehicleId() === v.id" 
            (click)="selectVehicle(v.id)">
            
            <div class="v-img">
              <img [src]="v.image" [alt]="v.name" loading="lazy">
            </div>

            <div class="v-details">
              <div class="v-head">
                <span class="category">{{ v.category }}</span>
                <h4>{{ v.name }}</h4>
              </div>

              <div class="specs-pills">
                <span><span class="material-symbols-outlined icon">group</span> {{ v.passengerCapacity }} Seats</span>
                <span><span class="material-symbols-outlined icon">luggage</span> {{ v.luggageCapacity }} Bags</span>
                <span><span class="material-symbols-outlined icon">ac_unit</span> AC</span>
                <span><span class="material-symbols-outlined icon">local_gas_station</span> {{ v.fuelType }}</span>
              </div>
            </div>

            <div class="v-price-action">
              <div class="price-box">
                <span class="lbl">Est. Total</span>
                <span class="amount">₹{{ fare.totalEstimate }}</span>
                <span class="per-km">₹{{ v.pricePerKm }}/km</span>
              </div>

              <button type="button" class="btn btn-sm" [class.btn-accent]="selectedVehicleId() === v.id" [class.btn-outline]="selectedVehicleId() !== v.id">
                {{ selectedVehicleId() === v.id ? 'Selected' : 'Select' }}
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .vehicle-selector-box {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .box-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
    }
    .vehicles-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .v-card {
      display: grid;
      grid-template-columns: 140px 1fr 160px;
      gap: 1.25rem;
      align-items: center;
      padding: 1rem;
      border: 2px solid var(--border-color);
      cursor: pointer;
      transition: var(--transition);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      &:hover, &.active {
        border-color: var(--primary-color);
        background: var(--primary-light);
      }
    }
    .v-img {
      height: 90px;
      border-radius: var(--border-radius-sm);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .v-head {
      margin-bottom: 0.5rem;

      .category {
        font-size: 0.725rem;
        font-weight: 700;
        color: var(--primary-color);
        text-transform: uppercase;
      }

      h4 {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }
    .specs-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.8rem;
      color: var(--text-secondary);

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;

        .icon {
          font-size: 16px;
          color: var(--primary-color);
        }
      }
    }
    .v-price-action {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 0.75rem;
      }

      .price-box {
        text-align: right;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
          text-align: left;
        }

        .lbl { font-size: 0.725rem; color: var(--text-muted); }
        .amount { font-size: 1.35rem; font-weight: 800; color: var(--primary-color); }
        .per-km { font-size: 0.75rem; color: var(--text-secondary); }
      }
    }
  `]
})
export class VehicleSelectorComponent {
  private bookingService = inject(BookingService);

  readonly selectedVehicleId = input.required<string>();
  readonly category = input<BookingCategory>('airport-pickup');
  readonly vehicleChange = output<string>();

  readonly vehicles = this.bookingService.vehicles;

  getFare(vId: string) {
    return this.bookingService.calculateFare(this.category(), vId, 250);
  }

  selectVehicle(vId: string) {
    this.vehicleChange.emit(vId);
  }
}
