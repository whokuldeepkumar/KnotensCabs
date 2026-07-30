import { Component } from '@angular/core';

@Component({
  selector: 'app-call-button',
  standalone: true,
  template: `
    <a 
      href="tel:+919829012345" 
      class="call-float" 
      aria-label="Call Knotens Cabs 24x7">
      <span class="material-symbols-outlined">call</span>
      <span class="label">Call 24x7</span>
    </a>
  `,
  styles: [`
    .call-float {
      position: fixed;
      bottom: 84px;
      left: 24px;
      z-index: 999;
      background-color: var(--primary-blue, #0F52BA);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      box-shadow: 0 4px 18px rgba(15, 82, 186, 0.4);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 8px 24px rgba(15, 82, 186, 0.5);
      }

      @media (max-width: 640px) {
        padding: 0.75rem;
        border-radius: 50%;
        bottom: 80px;
        .label {
          display: none;
        }
      }
    }
  `]
})
export class CallButtonComponent {}
