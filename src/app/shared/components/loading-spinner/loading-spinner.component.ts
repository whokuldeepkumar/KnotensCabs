import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    @if (isLoading()) {
      <div class="loading-overlay">
        <div class="spinner-box card text-center">
          <div class="spinner"></div>
          <span class="loading-text">Loading, please wait...</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(3px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spinner-box {
      padding: 1.75rem 2.5rem;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 16px 40px rgba(0,0,0,0.2);

      .spinner {
        width: 42px;
        height: 42px;
        border: 4px solid var(--primary-light);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .loading-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  private loadingService = inject(LoadingService);
  readonly isLoading = this.loadingService.isLoading;
}
