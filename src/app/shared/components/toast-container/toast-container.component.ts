import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-container" aria-live="polite">
      @for (toast of toasts(); track toast.id) {
        <div class="toast-item card" [class]="toast.type" (click)="remove(toast.id)">
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('success') { <span class="material-symbols-outlined">check_circle</span> }
              @case ('error') { <span class="material-symbols-outlined">error</span> }
              @case ('warning') { <span class="material-symbols-outlined">warning</span> }
              @case ('info') { <span class="material-symbols-outlined">info</span> }
            }
          </div>
          <div class="toast-content">
            <strong>{{ toast.title }}</strong>
            <p>{{ toast.message }}</p>
          </div>
          <button type="button" class="close-btn" (click)="remove(toast.id)">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 90px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 380px;
      width: 100%;
      pointer-events: none;
    }
    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
      padding: 1rem 1.25rem;
      background: #FFFFFF;
      border-left: 4px solid var(--primary-color);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &.success { border-left-color: #10B981; .toast-icon { color: #10B981; } }
      &.error { border-left-color: #EF4444; .toast-icon { color: #EF4444; } }
      &.warning { border-left-color: #F59E0B; .toast-icon { color: #F59E0B; } }
      &.info { border-left-color: #3B82F6; .toast-icon { color: #3B82F6; } }

      .toast-content {
        flex: 1;

        strong {
          font-size: 0.9rem;
          display: block;
          color: var(--text-primary);
        }

        p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
        }
      }

      .close-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0;
      }
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastContainerComponent {
  private notificationService = inject(NotificationService);

  readonly toasts = this.notificationService.toasts;

  remove(id: string) {
    this.notificationService.remove(id);
  }
}
