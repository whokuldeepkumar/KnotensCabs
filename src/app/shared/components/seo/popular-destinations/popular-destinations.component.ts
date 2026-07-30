import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-destinations',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="destinations-card card">
      <h3 class="card-title">
        <span class="material-symbols-outlined icon">explore</span>
        Top Outstation Destinations from Jaipur
      </h3>

      <div class="destinations-grid">
        @for (dest of destinations; track dest.name) {
          <a [routerLink]="dest.link" class="dest-item card">
            <span class="material-symbols-outlined icon">directions_car</span>
            <div class="info">
              <strong>Jaipur → {{ dest.name }}</strong>
              <span class="sub">{{ dest.distance }} • {{ dest.time }}</span>
            </div>
            <span class="price">₹{{ dest.fare }}</span>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .destinations-card {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .card-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon { color: var(--primary-color); }
    }
    .destinations-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .dest-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem;
      text-decoration: none;
      border: 1px solid var(--border-color);
      transition: var(--transition);

      .icon { color: var(--accent-dark); font-size: 22px; }

      .info {
        display: flex;
        flex-direction: column;
        flex: 1;

        strong { font-size: 0.875rem; color: var(--text-primary); }
        .sub { font-size: 0.75rem; color: var(--text-muted); }
      }

      .price {
        font-size: 0.95rem;
        font-weight: 800;
        color: var(--primary-color);
      }

      &:hover {
        border-color: var(--primary-color);
        background: var(--primary-light);
      }
    }
  `]
})
export class PopularDestinationsComponent {
  readonly destinations = [
    { name: 'Ajmer Dargah', distance: '135 km', time: '2.5 hrs', fare: '1799', link: '/jaipur-to-ajmer-taxi' },
    { name: 'Pushkar', distance: '145 km', time: '2.7 hrs', fare: '1899', link: '/jaipur-to-pushkar-taxi' },
    { name: 'Delhi NCR', distance: '280 km', time: '4.5 hrs', fare: '2899', link: '/jaipur-to-delhi-taxi' },
    { name: 'Agra Taj Mahal', distance: '240 km', time: '4.0 hrs', fare: '2699', link: '/outstation' },
    { name: 'Udaipur City', distance: '395 km', time: '6.5 hrs', fare: '4299', link: '/jaipur-to-udaipur-taxi' },
    { name: 'Jodhpur', distance: '330 km', time: '5.5 hrs', fare: '3699', link: '/jaipur-to-jodhpur-taxi' },
    { name: 'Bikaner', distance: '335 km', time: '5.5 hrs', fare: '3799', link: '/jaipur-to-bikaner-taxi' },
    { name: 'Kota', distance: '245 km', time: '4.2 hrs', fare: '2799', link: '/jaipur-to-kota-taxi' },
    { name: 'Mount Abu', distance: '490 km', time: '8.0 hrs', fare: '5299', link: '/jaipur-to-mount-abu-taxi' },
    { name: 'Ranthambore', distance: '160 km', time: '3.5 hrs', fare: '2199', link: '/jaipur-to-ranthambore-taxi' }
  ];
}
