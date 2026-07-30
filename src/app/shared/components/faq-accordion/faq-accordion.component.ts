import { Component, input, signal } from '@angular/core';
import { FaqItem } from '../../../core/models/faq.model';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  template: `
    <div class="faq-accordion">
      @for (faq of items(); track faq.id) {
        <div class="accordion-item card" [class.open]="openId() === faq.id">
          <button class="accordion-header" (click)="toggle(faq.id)">
            <span class="question">{{ faq.question }}</span>
            <span class="material-symbols-outlined icon">
              {{ openId() === faq.id ? 'remove' : 'add' }}
            </span>
          </button>
          
          @if (openId() === faq.id) {
            <div class="accordion-body animate-fade-in">
              <p>{{ faq.answer }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .faq-accordion {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .accordion-item {
      background: #FFFFFF;
      overflow: hidden;
      transition: var(--transition);

      &.open {
        border-color: var(--primary-color);
        box-shadow: var(--shadow-md);
      }
    }
    .accordion-header {
      width: 100%;
      padding: 1.25rem 1.5rem;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      text-align: left;
      cursor: pointer;

      .question {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .icon {
        color: var(--primary-color);
        font-size: 24px;
        flex-shrink: 0;
      }
    }
    .accordion-body {
      padding: 0 1.5rem 1.25rem 1.5rem;
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      border-top: 1px dashed var(--border-color);
      padding-top: 1rem;
    }
  `]
})
export class FaqAccordionComponent {
  readonly items = input.required<FaqItem[]>();
  readonly openId = signal<number | null>(1);

  toggle(id: number) {
    this.openId.update(current => current === id ? null : id);
  }
}
