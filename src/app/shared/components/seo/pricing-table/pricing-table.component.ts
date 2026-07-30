import { Component, input } from '@angular/core';

export interface RouteTariff {
  categoryName: string;
  vehicleModels: string;
  passengerCapacity: number;
  startingPrice: number;
  pricePerKm: number;
  driverAllowance: number;
  nightCharge: number;
}

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  template: `
    <div class="pricing-table-card card">
      <h3 class="table-title">Transparent Tariff Chart</h3>

      <div class="table-responsive">
        <table class="tariffs-table">
          <thead>
            <tr>
              <th>Cab Category</th>
              <th>Vehicle Models</th>
              <th>Seats</th>
              <th>Starting Fare</th>
              <th>Rate / Km</th>
              <th>Driver Day Charge</th>
              <th>Night Charge</th>
            </tr>
          </thead>
          <tbody>
            @for (t of tariffs(); track t.categoryName) {
              <tr>
                <td><strong>{{ t.categoryName }}</strong></td>
                <td>{{ t.vehicleModels }}</td>
                <td>{{ t.passengerCapacity }} Seats</td>
                <td><strong class="price">₹{{ t.startingPrice }}</strong></td>
                <td>₹{{ t.pricePerKm }}/Km</td>
                <td>₹{{ t.driverAllowance }}</td>
                <td>₹{{ t.nightCharge }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .pricing-table-card {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .table-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
    }
    .table-responsive {
      overflow-x: auto;
    }
    .tariffs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;

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
    .price {
      color: var(--primary-color);
      font-weight: 800;
    }
  `]
})
export class PricingTableComponent {
  readonly tariffs = input<RouteTariff[]>([
    { categoryName: 'Sedan', vehicleModels: 'Swift Dzire / Etios', passengerCapacity: 4, startingPrice: 799, pricePerKm: 11, driverAllowance: 300, nightCharge: 300 },
    { categoryName: 'SUV', vehicleModels: 'Maruti Ertiga / Brezza', passengerCapacity: 6, startingPrice: 1199, pricePerKm: 14, driverAllowance: 350, nightCharge: 350 },
    { categoryName: 'Premium SUV', vehicleModels: 'Toyota Innova Crysta', passengerCapacity: 7, startingPrice: 1599, pricePerKm: 18, driverAllowance: 400, nightCharge: 400 },
    { categoryName: 'Tempo Traveller', vehicleModels: 'Force Traveller (12-17 Seater)', passengerCapacity: 16, startingPrice: 2499, pricePerKm: 26, driverAllowance: 500, nightCharge: 500 }
  ]);
}
