import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { BookingService } from '../../core/services/booking.service';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { VehicleCardComponent } from '../../shared/components/vehicle-card/vehicle-card.component';
import { VehicleComparisonComponent } from '../../shared/components/fleet/vehicle-comparison/vehicle-comparison.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [
    FormsModule,
    PageBannerComponent,
    VehicleCardComponent,
    VehicleComparisonComponent,
    CtaBannerComponent
  ],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss'
})
export class FleetComponent implements OnInit {
  private seo = inject(SeoService);
  private bookingService = inject(BookingService);

  readonly allVehicles = this.bookingService.vehicles;

  // Filter & Search Signal States
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('All');
  readonly selectedCapacity = signal<string>('All');
  readonly selectedFuel = signal<string>('All');
  readonly sortBy = signal<string>('recommended');

  // Filtered & Sorted Computed Vehicles List
  readonly filteredVehicles = computed(() => {
    let list = [...this.allVehicles()];

    // Search filter
    if (this.searchTerm().trim()) {
      const q = this.searchTerm().toLowerCase().trim();
      list = list.filter(v => v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q));
    }

    // Category filter
    if (this.selectedCategory() !== 'All') {
      list = list.filter(v => v.category === this.selectedCategory());
    }

    // Capacity filter
    if (this.selectedCapacity() === '4') {
      list = list.filter(v => v.passengerCapacity <= 4);
    } else if (this.selectedCapacity() === '6-7') {
      list = list.filter(v => v.passengerCapacity >= 6 && v.passengerCapacity <= 7);
    } else if (this.selectedCapacity() === '12+') {
      list = list.filter(v => v.passengerCapacity >= 12);
    }

    // Fuel filter
    if (this.selectedFuel() !== 'All') {
      list = list.filter(v => v.fuelType.toLowerCase().includes(this.selectedFuel().toLowerCase()));
    }

    // Sort
    if (this.sortBy() === 'price-low') {
      list.sort((a, b) => a.pricePerKm - b.pricePerKm);
    } else if (this.sortBy() === 'price-high') {
      list.sort((a, b) => b.pricePerKm - a.pricePerKm);
    } else if (this.sortBy() === 'capacity') {
      list.sort((a, b) => b.passengerCapacity - a.passengerCapacity);
    }

    return list;
  });

  resetFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('All');
    this.selectedCapacity.set('All');
    this.selectedFuel.set('All');
    this.sortBy.set('recommended');
  }

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Our Cab Fleet in Jaipur | Dzire, Ertiga, Innova Crysta & Tempo Traveller',
      description: 'Explore Knotens Cabs complete fleet in Jaipur: Swift Dzire, Etios, Ertiga, Vitara Brezza, Toyota Innova Crysta, Hycross & 12-17 Seater Tempo Travellers.',
      canonicalUrl: 'https://knotens.cabs/fleet'
    });

    this.seo.injectStructuredData({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Knotens Cabs Jaipur Vehicle Fleet',
      'itemListElement': this.allVehicles().map((v, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': v.name,
        'url': `https://knotens.cabs/fleet/${v.id}`
      }))
    });
  }
}
