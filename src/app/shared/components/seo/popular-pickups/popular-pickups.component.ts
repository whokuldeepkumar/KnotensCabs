import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-pickups',
  standalone: true,
  template: `
    <div class="popular-pickups-card card">
      <h3 class="card-title">
        <span class="material-symbols-outlined icon">my_location</span>
        Popular Pickup Hubs in Jaipur
      </h3>
      
      <div class="pickups-grid">
        @for (hub of hubs; track hub.name) {
          <div class="hub-item">
            <span class="material-symbols-outlined check">location_on</span>
            <div>
              <strong>{{ hub.name }}</strong>
              <p>{{ hub.desc }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .popular-pickups-card {
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

      .icon { color: #10B981; }
    }
    .pickups-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .hub-item {
      display: flex;
      gap: 0.75rem;
      background: var(--bg-color);
      padding: 0.85rem;
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--border-color);

      .check { color: #10B981; font-size: 20px; margin-top: 2px; }

      strong { font-size: 0.9rem; color: var(--text-primary); display: block; }
      p { font-size: 0.775rem; color: var(--text-secondary); margin: 0; }
    }
  `]
})
export class PopularPickupsComponent {
  readonly hubs = [
    { name: 'Jaipur International Airport (JAI)', desc: 'Terminal 1 & 2 Arrival Gate pickups with 24x7 flight tracking.' },
    { name: 'Jaipur Junction Railway Station (JP)', desc: 'Platform 1 & 6 exit gates doorstep driver assistance.' },
    { name: 'Sindhi Camp Central Bus Stand', desc: 'Main intercity bus terminal pick-ups & drops.' },
    { name: 'Malviya Nagar & Jagatpura', desc: 'Residential & commercial IT tech park transfers.' },
    { name: 'Vaishali Nagar & Sirsi Road', desc: 'West Jaipur residential zone pick-ups.' },
    { name: 'Mansarovar & Gopalpura Bypass', desc: 'South Jaipur educational & hospital hub.' },
    { name: 'Vidyadhar Nagar & Ambabari', desc: 'North Jaipur Express Highway connecting points.' },
    { name: 'C-Scheme & MI Road', desc: 'Central heritage hotel & shopping bazaar district.' }
  ];
}
