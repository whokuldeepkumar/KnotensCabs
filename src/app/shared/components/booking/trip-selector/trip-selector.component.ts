import { Component, input, output } from '@angular/core';
import { BookingCategory } from '../../../../core/models/booking.model';

@Component({
  selector: 'app-trip-selector',
  standalone: true,
  template: `
    <div class="trip-selector card">
      <h3 class="selector-title">Select Journey Type</h3>

      <div class="categories-grid">
        @for (item of options; track item.value) {
          <div 
            class="category-card card" 
            [class.active]="selectedCategory() === item.value" 
            (click)="selectCategory(item.value)">
            <div class="icon-bg">
              <span class="material-symbols-outlined">{{ item.icon }}</span>
            </div>
            <div class="text">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
            <span class="badge">{{ item.badge }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .trip-selector {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .selector-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 540px) {
        grid-template-columns: 1fr;
      }
    }
    .category-card {
      position: relative;
      padding: 1.25rem;
      display: flex;
      gap: 1rem;
      cursor: pointer;
      border: 2px solid var(--border-color);
      transition: var(--transition);

      .icon-bg {
        width: 48px;
        height: 48px;
        border-radius: var(--border-radius-sm);
        background: var(--bg-color);
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-symbols-outlined { font-size: 26px; }
      }

      h4 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }

      p {
        font-size: 0.775rem;
        color: var(--text-secondary);
        margin: 0;
      }

      .badge {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--accent-dark);
        background: var(--accent-light);
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
      }

      &:hover, &.active {
        border-color: var(--primary-color);
        background: var(--primary-light);

        .icon-bg {
          background: var(--primary-color);
          color: #FFFFFF;
        }
      }
    }
  `]
})
export class TripSelectorComponent {
  readonly selectedCategory = input<BookingCategory>('airport-pickup');
  readonly categoryChange = output<BookingCategory>();

  readonly options: { value: BookingCategory; title: string; desc: string; icon: string; badge: string }[] = [
    { value: 'airport-pickup', title: 'Airport Pickup', desc: 'Pickup from Jaipur Airport (JAI) with flight tracking', icon: 'flight_land', badge: 'Flat ₹799' },
    { value: 'airport-drop', title: 'Airport Drop', desc: 'Doorstep pickup from Jaipur to Airport terminal', icon: 'flight_takeoff', badge: 'Flat ₹799' },
    { value: 'local', title: 'Jaipur Local Rental', desc: '8 Hours / 80 Km full day Pink City tour package', icon: 'tour', badge: '8 Hrs Package' },
    { value: 'outstation-one-way', title: 'One Way Outstation', desc: 'Intercity cab pay for 1-way distance only', icon: 'alt_route', badge: '₹11 / Km' },
    { value: 'outstation-round', title: 'Outstation Round Trip', desc: 'Multi-day tour cab for Rajasthan itineraries', icon: 'sync_alt', badge: 'Min 250 Km/day' }
  ];

  selectCategory(cat: BookingCategory) {
    this.categoryChange.emit(cat);
  }
}
