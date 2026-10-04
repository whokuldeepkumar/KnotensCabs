import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a 
      href="https://wa.me/919103612859?text=Hello%20Knotens%20Cabs,%20I%20want%20to%20book%20a%20taxi%20in%20Jaipur" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="whatsapp-float" 
      aria-label="Chat on WhatsApp">
      <span class="material-symbols-outlined">chat</span>
      <span class="label">WhatsApp Us</span>
    </a>
  `,
  styles: [`
    .whatsapp-float {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 999;
      background-color: #25D366;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      box-shadow: 0 4px 18px rgba(37, 211, 102, 0.4);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
      }

      @media (max-width: 640px) {
        padding: 0.75rem;
        border-radius: 50%;
        .label {
          display: none;
        }
      }
    }
  `]
})
export class WhatsappButtonComponent {}
