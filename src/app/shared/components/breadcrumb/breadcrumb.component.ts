import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav aria-label="Breadcrumb" class="breadcrumb-nav">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a routerLink="/"><span class="material-symbols-outlined icon">home</span> Home</a>
        </li>
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb-separator">
            <span class="material-symbols-outlined icon">chevron_right</span>
          </li>
          <li class="breadcrumb-item" [class.active]="last">
            @if (item.url && !last) {
              <a [routerLink]="item.url">{{ item.label }}</a>
            } @else {
              <span>{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      margin-bottom: 1rem;
    }
    .breadcrumb-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      gap: 0.5rem;
      font-size: 0.875rem;
    }
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;

      a {
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        transition: var(--transition);
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;

        &:hover {
          color: var(--accent-color);
        }
      }

      &.active span {
        color: #FFFFFF;
        font-weight: 600;
      }
    }
    .breadcrumb-separator .icon {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  `]
})
export class BreadcrumbComponent {
  readonly items = input<BreadcrumbItem[]>([]);
}
