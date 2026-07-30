import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="empty-state-card card text-center">
      <div class="svg-icon-circle">
        <span class="material-symbols-outlined icon">{{ icon() }}</span>
      </div>
      <h3 class="empty-title">{{ title() }}</h3>
      <p class="empty-desc">{{ message() }}</p>

      @if (actionText()) {
        <a [routerLink]="actionLink()" class="btn btn-primary btn-md">
          {{ actionText() }}
        </a>
      }
    </div>
  `,
  styles: [`
    .empty-state-card {
      padding: 3.5rem 2rem;
      background: #FFFFFF;
      max-width: 520px;
      margin: 0 auto;
    }
    .svg-icon-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--primary-light);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.25rem;

      .icon { font-size: 38px; }
    }
    .empty-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .empty-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  `]
})
export class EmptyStateComponent {
  readonly title = input<string>('No Data Found');
  readonly message = input<string>('There are no items matching your criteria at this moment.');
  readonly icon = input<string>('inbox');
  readonly actionText = input<string>('');
  readonly actionLink = input<string>('/');
}
