import { Component, input } from '@angular/core';

@Component({
  selector: 'app-booking-progress',
  standalone: true,
  template: `
    <div class="stepper-wrapper">
      <div class="stepper-track">
        @for (step of steps; track step.number) {
          <div 
            class="step-item" 
            [class.completed]="currentStep() > step.number" 
            [class.active]="currentStep() === step.number">
            <div class="step-icon">
              @if (currentStep() > step.number) {
                <span class="material-symbols-outlined icon">check</span>
              } @else {
                <span>{{ step.number }}</span>
              }
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .stepper-wrapper {
      padding: 1rem 0 2rem;
    }
    .stepper-track {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      max-width: 800px;
      margin: 0 auto;

      &::before {
        content: '';
        position: absolute;
        top: 20px;
        left: 40px;
        right: 40px;
        height: 3px;
        background: var(--border-color);
        z-index: 1;
      }
    }
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      z-index: 2;

      .step-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FFFFFF;
        border: 2px solid var(--border-color);
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        transition: var(--transition);

        .icon {
          font-size: 20px;
        }
      }

      .step-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-secondary);

        @media (max-width: 640px) {
          display: none;
        }
      }

      &.active {
        .step-icon {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(21, 101, 192, 0.2);
        }
        .step-label {
          color: var(--primary-color);
          font-weight: 700;
        }
      }

      &.completed {
        .step-icon {
          background: #10B981;
          border-color: #10B981;
          color: #FFFFFF;
        }
      }
    }
  `]
})
export class BookingProgressComponent {
  readonly currentStep = input.required<number>();

  readonly steps = [
    { number: 1, label: 'Trip Type' },
    { number: 2, label: 'Locations' },
    { number: 3, label: 'Date & Time' },
    { number: 4, label: 'Select Cab' },
    { number: 5, label: 'Review & Pay' }
  ];
}
