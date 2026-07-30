import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drop-location',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="location-box card">
      <div class="box-header">
        <label for="dropInput">
          <span class="material-symbols-outlined icon drop">location_on</span>
          <strong>Drop Location / Destination</strong>
        </label>
        @if (showSwap()) {
          <button type="button" (click)="swap.emit()" class="swap-btn" title="Swap Pickup & Drop">
            <span class="material-symbols-outlined">swap_vert</span> Swap
          </button>
        }
      </div>

      <div class="input-wrapper">
        <input 
          id="dropInput" 
          type="text" 
          [ngModel]="value()" 
          (ngModelChange)="onInputChange($event)"
          placeholder="e.g. Hotel Taj Rambagh Palace / Delhi NCR / Ajmer Dargah"
          class="location-input">
      </div>

      <!-- Popular Outstation Destinations -->
      <div class="recent-chips">
        <span class="chip-label">Popular Destinations:</span>
        @for (dest of populars; track dest) {
          <button type="button" (click)="selectDestination(dest)" class="chip-btn">
            {{ dest }}
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

      label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.95rem;
        color: var(--text-primary);
      }

      .drop {
        color: #EF4444;
      }
    }
    .swap-btn {
      background: var(--accent-light);
      color: var(--accent-dark);
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
        background: var(--accent-dark);
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
export class DropLocationComponent {
  readonly value = input<string>('');
  readonly showSwap = input<boolean>(true);

  readonly valueChange = output<string>();
  readonly swap = output<void>();

  readonly populars = [
    'Jaipur Airport (JAI)',
    'Delhi NCR',
    'Ajmer Dargah',
    'Udaipur Lake City',
    'Khatu Shyam Ji'
  ];

  onInputChange(val: string) {
    this.valueChange.emit(val);
  }

  selectDestination(dest: string) {
    this.valueChange.emit(dest);
  }
}
