import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="date-time-box card">
      <h3 class="box-title">Schedule Journey Date & Pickup Time</h3>

      <div class="shortcuts-row">
        <button 
          type="button" 
          class="shortcut-btn" 
          [class.active]="isToday()" 
          (click)="setToday()">
          Today
        </button>
        <button 
          type="button" 
          class="shortcut-btn" 
          [class.active]="isTomorrow()" 
          (click)="setTomorrow()">
          Tomorrow
        </button>
      </div>

      <div class="inputs-grid">
        <div class="form-group">
          <label for="jDate">Pickup Date</label>
          <div class="input-wrapper">
            <span class="material-symbols-outlined icon">calendar_month</span>
            <input 
              id="jDate" 
              type="date" 
              [min]="minDate" 
              [ngModel]="date()" 
              (ngModelChange)="dateChange.emit($event)">
          </div>
        </div>

        <div class="form-group">
          <label for="jTime">Pickup Time</label>
          <div class="input-wrapper">
            <span class="material-symbols-outlined icon">schedule</span>
            <input 
              id="jTime" 
              type="time" 
              [ngModel]="time()" 
              (ngModelChange)="timeChange.emit($event)">
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .date-time-box {
      padding: 1.5rem;
      background: #FFFFFF;
    }
    .box-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    .shortcuts-row {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .shortcut-btn {
      padding: 0.4rem 1rem;
      border-radius: var(--border-radius-full);
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.825rem;
      cursor: pointer;
      transition: var(--transition);

      &:hover, &.active {
        background: var(--primary-color);
        color: #FFFFFF;
        border-color: var(--primary-color);
      }
    }
    .inputs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 540px) {
        grid-template-columns: 1fr;
      }
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-primary);
      }
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .icon {
        position: absolute;
        left: 12px;
        color: var(--text-muted);
        font-size: 20px;
        pointer-events: none;
      }

      input {
        width: 100%;
        padding: 0.75rem 0.75rem 0.75rem 2.6rem;
        font-family: var(--font-family);
        font-size: 0.9rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        outline: none;

        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
        }
      }
    }
  `]
})
export class DateTimePickerComponent {
  readonly date = input.required<string>();
  readonly time = input.required<string>();

  readonly dateChange = output<string>();
  readonly timeChange = output<string>();

  readonly minDate = new Date().toISOString().split('T')[0];

  isToday(): boolean {
    return this.date() === new Date().toISOString().split('T')[0];
  }

  isTomorrow(): boolean {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    return this.date() === tmrw.toISOString().split('T')[0];
  }

  setToday() {
    this.dateChange.emit(new Date().toISOString().split('T')[0]);
  }

  setTomorrow() {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    this.dateChange.emit(tmrw.toISOString().split('T')[0]);
  }
}
