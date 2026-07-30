import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pickup-location',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="location-box card">
      <div class="box-header">
        <label for="pickupInput">
          <span class="material-symbols-outlined icon pickup">my_location</span>
          <strong>Pickup Location in Jaipur</strong>
        </label>
        <button type="button" (click)="useCurrentLocation()" class="current-loc-btn">
          <span class="material-symbols-outlined">near_me</span> Use Current Location
        </button>
      </div>

      <div class="input-wrapper">
        <input 
          id="pickupInput" 
          type="text" 
          [ngModel]="value()" 
          (ngModelChange)="onInputChange($event)"
          placeholder="e.g. Jaipur International Airport Terminal 2, Malviya Nagar"
          class="location-input">
      </div>

      <!-- Recent Locations Quick Chips -->
      <div class="recent-chips">
        <span class="chip-label">Popular Jaipur Locations:</span>
        @for (recent of recents; track recent) {
          <button type="button" (click)="selectRecent(recent)" class="chip-btn">
            {{ recent }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .location-box {
      padding: 1.5rem;
      background: #FFFFFF;
    }
    .box-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
      flex-wrap: wrap;
      gap: 0.5rem;

      label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.95rem;
        color: var(--text-primary);
      }

      .pickup {
        color: #10B981;
      }
    }
    .current-loc-btn {
      background: var(--primary-light);
      color: var(--primary-color);
      border: none;
      padding: 0.35rem 0.75rem;
      border-radius: var(--border-radius-full);
      font-size: 0.775rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;

      &:hover {
        background: var(--primary-color);
        color: #FFFFFF;
      }
    }
    .location-input {
      width: 100%;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      font-family: var(--font-family);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      outline: none;

      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
      }
    }
    .recent-chips {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 1rem;

      .chip-label {
        font-size: 0.775rem;
        color: var(--text-muted);
      }
    }
    .chip-btn {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      padding: 0.3rem 0.65rem;
      border-radius: 4px;
      font-size: 0.775rem;
      color: var(--text-secondary);
      cursor: pointer;

      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  `]
})
export class PickupLocationComponent {
  readonly value = input<string>('');
  readonly valueChange = output<string>();

  readonly recents = [
    'Jaipur Airport (JAI)',
    'Jaipur Railway Station (JP)',
    'Malviya Nagar',
    'Vaishali Nagar',
    'Raja Park'
  ];

  onInputChange(val: string) {
    this.valueChange.emit(val);
  }

  selectRecent(loc: string) {
    this.valueChange.emit(loc);
  }

  useCurrentLocation() {
    this.valueChange.emit('Current Location (Malviya Nagar, Jaipur)');
  }
}
