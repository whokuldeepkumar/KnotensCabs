import { Component, input } from '@angular/core';

@Component({
  selector: 'app-vehicle-features',
  standalone: true,
  template: `
    <div class="features-wrapper card">
      <h3 class="features-title">Features & Onboard Amenities</h3>

      <div class="features-grid">
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> Air Conditioning & Climate Control</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> High Quality Bluetooth Music System</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> Mobile USB Fast Charging Ports</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> Water Bottle Holders & Tissue Box</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> GPS Live Vehicle Tracking</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> First Aid Safety Kit</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> Commercial Taxi Permit & Insurance</div>
        <div class="feature-item"><span class="material-symbols-outlined check-icon">check_circle</span> Uniformed & Verified Chauffeur</div>
      </div>
    </div>
  `,
  styles: [`
    .features-wrapper {
      padding: 1.75rem;
      background: #FFFFFF;
    }
    .features-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.85rem;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);

      .check-icon {
        color: #10B981;
        font-size: 20px;
      }
    }
  `]
})
export class VehicleFeaturesComponent {
  readonly features = input<string[]>([]);
}
