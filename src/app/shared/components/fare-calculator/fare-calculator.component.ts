import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { BookingType } from '../../../core/models/booking.model';

@Component({
  selector: 'app-fare-calculator',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="fare-calculator section-padding">
      <div class="container">
        <div class="calc-wrapper card">
          <div class="calc-header text-center">
            <span class="section-subtitle">Instant Fare Estimate</span>
            <h2 class="section-title">Transparent Fare Calculator</h2>
            <p class="section-desc mx-auto">
              Calculate your exact cab fare in seconds with zero hidden charges or surge pricing.
            </p>
          </div>

          <div class="calc-grid">
            <div class="calc-inputs">
              <!-- Service Type -->
              <div class="input-group">
                <label>Journey Category</label>
                <div class="category-pills">
                  <button 
                    type="button" 
                    class="pill-btn" 
                    [class.active]="selectedService() === 'airport-pickup'" 
                    (click)="selectedService.set('airport-pickup')">
                    Airport Pickup
                  </button>
                  <button 
                    type="button" 
                    class="pill-btn" 
                    [class.active]="selectedService() === 'local'" 
                    (click)="selectedService.set('local')">
                    Jaipur Local (8h/80km)
                  </button>
                  <button 
                    type="button" 
                    class="pill-btn" 
                    [class.active]="selectedService() === 'outstation-one-way'" 
                    (click)="selectedService.set('outstation-one-way')">
                    Outstation One Way
                  </button>
                  <button 
                    type="button" 
                    class="pill-btn" 
                    [class.active]="selectedService() === 'outstation-round'" 
                    (click)="selectedService.set('outstation-round')">
                    Outstation Round Trip
                  </button>
                </div>
              </div>

              <!-- Pickup & Drop -->
              <div class="input-row">
                <div class="input-group">
                  <label>Pickup Point in Jaipur</label>
                  <input type="text" [(ngModel)]="pickup" placeholder="e.g. Vaishali Nagar, Jaipur">
                </div>
                <div class="input-group">
                  <label>Destination / Drop</label>
                  <input type="text" [(ngModel)]="drop" placeholder="e.g. Ajmer Dargah Sharif">
                </div>
              </div>

              <!-- Vehicle Selection -->
              <div class="input-group">
                <label>Select Cab Category</label>
                <div class="vehicle-selector">
                  @for (v of vehicles(); track v.id) {
                    <div 
                      class="v-card" 
                      [class.active]="selectedVehicleId() === v.id" 
                      (click)="selectedVehicleId.set(v.id)">
                      <span class="v-name">{{ v.name }}</span>
                      <span class="v-rate">₹{{ v.pricePerKm }}/km</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Estimated Distance Slider for Outstation -->
              @if (selectedService().includes('outstation')) {
                <div class="input-group">
                  <div class="slider-label">
                    <label>Estimated Distance (Km)</label>
                    <span class="distance-val">{{ distanceKm() }} Km</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="10" 
                    [ngModel]="distanceKm()" 
                    (ngModelChange)="distanceKm.set($event)">
                </div>
              }
            </div>

            <!-- Calculated Results Card -->
            <div class="calc-results">
              <div class="results-card">
                <div class="res-header">
                  <span class="material-symbols-outlined icon">receipt_long</span>
                  <span>Estimated Total Fare</span>
                </div>

                <div class="res-amount">
                  <span class="currency">₹</span>
                  <span class="price">{{ calculatedFare().totalEstimate }}</span>
                </div>

                <div class="res-details">
                  <div class="detail-row">
                    <span>Base Ride Fare:</span>
                    <strong>₹{{ calculatedFare().baseFare }}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Driver Night/Day Allowance:</span>
                    <strong>₹{{ calculatedFare().driverAllowance }}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Included Minimum Km:</span>
                    <strong>{{ calculatedFare().includedKm }} Km</strong>
                  </div>
                  <div class="detail-row">
                    <span>Extra Km Charge:</span>
                    <strong>₹{{ calculatedFare().extraKmRate }}/Km</strong>
                  </div>
                </div>

                <div class="res-notes">
                  <span class="material-symbols-outlined icon">info</span>
                  <span>Tolls, State Tax & Parking to be paid as per actual receipts.</span>
                </div>

                <a href="#quick-booking" class="btn btn-accent btn-lg w-full">
                  Proceed to Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .fare-calculator {
      background-color: var(--bg-color, #F8FAFC);
    }
    .calc-wrapper {
      padding: 2.5rem;
      background: #FFFFFF;
    }
    .calc-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2.5rem;
      margin-top: 2rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }
    .calc-inputs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      input[type="text"] {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        outline: none;

        &:focus {
          border-color: var(--primary-color);
        }
      }
    }
    .input-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .category-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .pill-btn {
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-full);
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-secondary);
      font-size: 0.825rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);

      &:hover, &.active {
        background: var(--primary-color);
        color: #FFFFFF;
        border-color: var(--primary-color);
      }
    }
    .vehicle-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.6rem;

      @media (max-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .v-card {
      padding: 0.6rem;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: var(--transition);

      .v-name {
        font-size: 0.8rem;
        font-weight: 600;
      }
      .v-rate {
        font-size: 0.75rem;
        color: var(--primary-color);
      }

      &:hover, &.active {
        border-color: var(--primary-color);
        background: var(--primary-light);
      }
    }
    .slider-label {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .distance-val {
        font-weight: 700;
        color: var(--primary-color);
      }
    }

    /* Results */
    .results-card {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
      color: #FFFFFF;
      padding: 2rem;
      border-radius: var(--border-radius-md);
      box-shadow: 0 12px 32px rgba(21, 101, 192, 0.2);
    }
    .res-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #E3F2FD;
      margin-bottom: 1rem;
    }
    .res-amount {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
      margin-bottom: 1.5rem;

      .currency {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .price {
        font-size: 3rem;
        font-weight: 800;
        line-height: 1;
      }
    }
    .res-details {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-bottom: 1.5rem;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #E3F2FD;
    }
    .res-notes {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.775rem;
      color: #BBDEFB;
      margin-bottom: 1.5rem;

      .icon {
        font-size: 16px;
      }
    }
    .w-full {
      width: 100%;
    }
  `]
})
export class FareCalculatorComponent {
  private bookingService = inject(BookingService);

  readonly vehicles = this.bookingService.vehicles;
  readonly selectedService = signal<BookingType>('outstation-one-way');
  readonly selectedVehicleId = signal<string>('dzire');
  readonly distanceKm = signal<number>(280);

  pickup = 'Malviya Nagar, Jaipur';
  drop = 'Connaught Place, Delhi';

  readonly calculatedFare = computed(() => {
    return this.bookingService.calculateFare(
      this.selectedService(),
      this.selectedVehicleId(),
      this.distanceKm()
    );
  });
}
