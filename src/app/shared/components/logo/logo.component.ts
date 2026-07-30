import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="brand-logo" [class]="variant()">
      <div class="logo-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="logo-text">
        <span class="knotens">KNOTENS</span>
        <span class="cabs">CABS</span>
      </div>
    </a>
  `,
  styles: [`
    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;
      user-select: none;

      .logo-icon-box {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: #1565C0;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(21, 101, 192, 0.25);
      }

      .logo-text {
        display: flex;
        align-items: center;
        font-size: 1.35rem;
        font-weight: 800;
        letter-spacing: -0.5px;
        line-height: 1;

        .knotens { color: #1565C0; }
        .cabs { color: #FF9800; margin-left: 2px; }
      }

      &.monochrome {
        .logo-icon-box { background: #111827; }
        .logo-text .knotens, .logo-text .cabs { color: #111827; }
      }

      &.white {
        .logo-icon-box { background: #FFFFFF; color: #1565C0; }
        .logo-text .knotens, .logo-text .cabs { color: #FFFFFF; }
      }
    }
  `]
})
export class LogoComponent {
  readonly variant = input<'default' | 'monochrome' | 'white'>('default');
}
