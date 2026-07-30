import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (isVisible()) {
      <button 
        class="scroll-top-btn" 
        (click)="scrollToTop()" 
        aria-label="Scroll back to top of page">
        <span class="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
    }
  `,
  styles: [`
    .scroll-top-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      background-color: var(--accent-color, #FF9800);
      color: #FFFFFF;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-shadow: 0 4px 16px rgba(255, 152, 0, 0.35);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition, all 0.3s ease);

      &:hover {
        background-color: var(--accent-dark, #F57C00);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(255, 152, 0, 0.5);
      }

      .material-symbols-outlined {
        font-size: 28px;
      }
    }
  `]
})
export class ScrollToTopComponent {
  readonly isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
