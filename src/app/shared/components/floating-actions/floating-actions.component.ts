import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  template: `
    <div class="floating-actions-bar">
      <a href="https://wa.me/919829012345?text=Hi%20Knotens%20Cabs,%20I%20want%20to%20book%20a%20cab" target="_blank" rel="noopener" class="float-btn whatsapp-btn" aria-label="Chat on WhatsApp">
        <span class="material-symbols-outlined">chat</span>
        <span class="btn-tooltip">WhatsApp Us</span>
      </a>

      <a href="tel:+919829012345" class="float-btn call-btn" aria-label="Call 24x7 Helpline">
        <span class="material-symbols-outlined">call</span>
        <span class="btn-tooltip">Call +91 98290 12345</span>
      </a>

      <button (click)="sharePage()" class="float-btn share-btn" aria-label="Share Page">
        <span class="material-symbols-outlined">share</span>
        <span class="btn-tooltip">{{ copied() ? 'Link Copied!' : 'Share Page' }}</span>
      </button>
    </div>
  `,
  styles: [`
    .floating-actions-bar {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1500;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .float-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      position: relative;
      cursor: pointer;
      border: none;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      .material-symbols-outlined { font-size: 26px; }

      &:hover {
        transform: scale(1.1);
        .btn-tooltip { opacity: 1; visibility: visible; transform: translateY(-50%) translateX(0); }
      }
    }
    .whatsapp-btn {
      background: #25D366;
      &:hover { box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4); }
    }
    .call-btn {
      background: #1565C0;
      &:hover { box-shadow: 0 10px 25px rgba(21, 101, 192, 0.4); }
    }
    .share-btn {
      background: #FF9800;
      &:hover { box-shadow: 0 10px 25px rgba(255, 152, 0, 0.4); }
    }
    .btn-tooltip {
      position: absolute;
      right: 64px;
      top: 50%;
      transform: translateY(-50%) translateX(10px);
      background: #1E293B;
      color: #FFFFFF;
      font-size: 0.775rem;
      font-weight: 600;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      pointer-events: none;
    }
  `]
})
export class FloatingActionsComponent {
  readonly copied = signal<boolean>(false);

  sharePage() {
    if (navigator.share) {
      navigator.share({
        title: 'Knotens Cabs Jaipur',
        text: 'Book reliable local, airport transfer, and outstation cabs in Jaipur!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
