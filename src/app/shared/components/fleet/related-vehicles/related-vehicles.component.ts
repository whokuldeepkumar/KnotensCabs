import { Component, input, computed } from '@angular/core';
import { Vehicle } from '../../../../core/models/vehicle.model';
import { VehicleCardComponent } from '../../vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-related-vehicles',
  standalone: true,
  imports: [VehicleCardComponent],
  template: `
    <div class="related-wrapper">
      <h3 class="section-title text-center">Similar Cabs in Our Jaipur Fleet</h3>
      
      <div class="related-grid">
        @for (v of filteredVehicles(); track v.id) {
          <app-vehicle-card [vehicle]="v"></app-vehicle-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .related-wrapper {
      margin-top: 3rem;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 1.5rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RelatedVehiclesComponent {
  readonly currentVehicleId = input.required<string>();
  readonly allVehicles = input.required<Vehicle[]>();

  readonly filteredVehicles = computed(() => {
    return this.allVehicles().filter(v => v.id !== this.currentVehicleId()).slice(0, 3);
  });
}
