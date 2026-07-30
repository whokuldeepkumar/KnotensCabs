import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-vehicle-comparison',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="comparison-wrapper card">
      <div class="header text-center">
        <span class="section-subtitle">Fleet Comparison</span>
        <h3 class="section-title">Compare All Cab Categories</h3>
        <p class="section-desc mx-auto">Evaluate capacity, features, and rates to pick the best vehicle for your trip.</p>
      </div>

      <div class="table-responsive">
        <table class="comp-table">
          <thead>
            <tr>
              <th>Vehicle Model</th>
              <th>Category</th>
              <th>Passengers</th>
              <th>Luggage</th>
              <th>Fuel Type</th>
              <th>Best Use Case</th>
              <th>Starting Fare</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @for (v of vehicles(); track v.id) {
              <tr>
                <td>
                  <div class="v-cell">
                    <img [src]="v.image" [alt]="v.name" loading="lazy">
                    <strong>{{ v.name }}</strong>
                  </div>
                </td>
                <td><span class="badge">{{ v.category }}</span></td>
                <td>{{ v.passengerCapacity }} Seats</td>
                <td>{{ v.luggageCapacity }} Bags</td>
                <td>{{ v.fuelType }}</td>
                <td><span class="desc-cell">{{ v.recommendedFor }}</span></td>
                <td><strong class="price">₹{{ v.pricePerKm }}/Km</strong></td>
                <td>
                  <a [routerLink]="['/fleet', v.id]" class="btn btn-primary btn-sm">View</a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .comparison-wrapper {
      padding: 2rem;
      background: #FFFFFF;
    }
    .table-responsive {
      overflow-x: auto;
    }
    .comp-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;

      th {
        background: var(--primary-color);
        color: #FFFFFF;
        padding: 0.85rem 1rem;
        font-weight: 700;
        white-space: nowrap;
      }

      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--border-color);
        vertical-align: middle;
      }

      tr:hover td {
        background: var(--bg-color);
      }
    }
    .v-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      img {
        width: 44px;
        height: 36px;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    .badge {
      background: var(--primary-light);
      color: var(--primary-color);
      font-weight: 600;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .desc-cell {
      font-size: 0.775rem;
      color: var(--text-secondary);
    }
    .price {
      color: var(--accent-dark);
      font-weight: 800;
    }
  `]
})
export class VehicleComparisonComponent {
  private bookingService = inject(BookingService);
  readonly vehicles = this.bookingService.vehicles;
}
