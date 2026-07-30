import { Component, input } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  template: `
    <div class="testimonial-card card">
      <div class="card-header">
        <div class="user-info">
          <img [src]="testimonial().avatarUrl" [alt]="testimonial().name" class="avatar" loading="lazy">
          <div>
            <h4 class="name">{{ testimonial().name }}</h4>
            <span class="trip-tag">{{ testimonial().tripType }} • {{ testimonial().location }}</span>
          </div>
        </div>
        @if (testimonial().googleReview) {
          <div class="google-badge" title="Verified Google Review">
            <span class="material-symbols-outlined icon">verified</span>
            <span>Google</span>
          </div>
        }
      </div>

      <div class="stars">
        @for (star of [1,2,3,4,5]; track star) {
          <span class="material-symbols-outlined star-icon">star</span>
        }
      </div>

      <p class="comment">"{{ testimonial().comment }}"</p>

      <span class="date">{{ testimonial().date }}</span>
    </div>
  `,
  styles: [`
    .testimonial-card {
      padding: 1.5rem;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      object-fit: cover;
    }
    .name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .trip-tag {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .google-badge {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      background: #EFF6FF;
      color: #1D4ED8;
      font-size: 0.725rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;

      .icon {
        font-size: 14px;
      }
    }
    .stars {
      display: flex;
      gap: 0.15rem;
      margin-bottom: 0.85rem;

      .star-icon {
        color: #F59E0B;
        font-size: 18px;
      }
    }
    .comment {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.25rem;
      font-style: italic;
      flex: 1;
    }
    .date {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: auto;
    }
  `]
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<Testimonial>();
}
