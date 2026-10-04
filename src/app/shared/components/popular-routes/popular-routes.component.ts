import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RouteItem {
  id: string;
  destination: string;
  distance: string;
  travelTime: string;
  startingPrice: number;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-popular-routes',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="popular-routes">
      <div class="routes-grid">
        @for (route of routes; track route.id) {
          <div class="route-card card">
            <div class="route-img">
              <img [src]="route.image" [alt]="route.destination" loading="lazy">
              <span class="tag-badge">{{ route.tag }}</span>
            </div>

            <div class="route-body">
              <h3 class="route-title">Jaipur → {{ route.destination }}</h3>

              <div class="route-specs">
                <span><span class="material-symbols-outlined icon">distance</span> {{ route.distance }}</span>
                <span><span class="material-symbols-outlined icon">timer</span> {{ route.travelTime }}</span>
              </div>

              <div class="route-footer">
                <div class="fare-info">
                  <span class="label">Starting at</span>
                  <span class="price">₹{{ route.startingPrice }}</span>
                </div>

                <a routerLink="/" fragment="quick-booking" class="btn btn-accent btn-sm">
                  Book Cab
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .popular-routes {
      width: 100%;
    }
    .routes-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .route-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .route-img {
      height: 150px;
      position: relative;
      background-color: #E2E8F0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
      }

      &:hover img {
        transform: scale(1.05);
      }
    }
    .tag-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(15, 23, 42, 0.85);
      color: #FFFFFF;
      font-size: 0.725rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .route-body {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .route-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .route-specs {
      display: flex;
      gap: 1rem;
      font-size: 0.825rem;
      color: var(--text-secondary);
      margin-bottom: 1.25rem;

      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        .icon {
          font-size: 16px;
          color: var(--primary-color);
        }
      }
    }
    .route-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-color);
    }
    .fare-info {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 0.725rem;
        color: var(--text-muted);
      }

      .price {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--primary-color);
      }
    }
  `]
})
export class PopularRoutesComponent {
  readonly routes: RouteItem[] = [
    {
      id: 'jai-airport',
      destination: 'Jaipur Airport (JAI)',
      distance: '15 km',
      travelTime: '30 mins',
      startingPrice: 799,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80',
      tag: 'Airport Transfer'
    },
    {
      id: 'jai-ajmer',
      destination: 'Ajmer / Pushkar',
      distance: '150 km',
      travelTime: '2.5 hrs',
      startingPrice: 1799,
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=500&q=80',
      tag: 'Pilgrimage Route'
    },
    {
      id: 'jai-delhi',
      destination: 'Delhi NCR',
      distance: '300 km',
      travelTime: '4.5 hrs',
      startingPrice: 4999,
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80',
      tag: 'Expressway Highway'
    },
    {
      id: 'jai-udaipur',
      destination: 'Udaipur City',
      distance: '395 km',
      travelTime: '6.5 hrs',
      startingPrice: 5999,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      tag: 'Heritage Lake City'
    },
    {
      id: 'jai-jodhpur',
      destination: 'Jodhpur',
      distance: '350 km',
      travelTime: '5.5 hrs',
      startingPrice: 5499,
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=500&q=80',
      tag: 'Blue City'
    },
    {
      id: 'jai-bikaner',
      destination: 'Bikaner',
      distance: '350 km',
      travelTime: '5.5 hrs',
      startingPrice: 5499,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80',
      tag: 'Desert Gateway'
    },
    {
      id: 'jai-ranthambore',
      destination: 'Ranthambore (Sawai Madhopur)',
      distance: '160 km',
      travelTime: '3.5 hrs',
      startingPrice: 3999,
      image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=500&q=80',
      tag: 'Tiger Reserve'
    },
    {
      id: 'jai-agra',
      destination: 'Agra (Taj Mahal)',
      distance: '260 km',
      travelTime: '4.0 hrs',
      startingPrice: 4499,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80',
      tag: 'Golden Triangle'
    }
  ];
}
