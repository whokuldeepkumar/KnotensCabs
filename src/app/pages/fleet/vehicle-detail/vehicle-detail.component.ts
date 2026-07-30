import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { BookingService } from '../../../core/services/booking.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { BookingFormComponent } from '../../../shared/components/booking-form/booking-form.component';
import { VehicleGalleryComponent } from '../../../shared/components/fleet/vehicle-gallery/vehicle-gallery.component';
import { VehicleSpecificationsComponent } from '../../../shared/components/fleet/vehicle-specifications/vehicle-specifications.component';
import { VehiclePricingComponent } from '../../../shared/components/fleet/vehicle-pricing/vehicle-pricing.component';
import { VehicleFeaturesComponent } from '../../../shared/components/fleet/vehicle-features/vehicle-features.component';
import { RelatedVehiclesComponent } from '../../../shared/components/fleet/related-vehicles/related-vehicles.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [
    PageBannerComponent,
    BookingFormComponent,
    VehicleGalleryComponent,
    VehicleSpecificationsComponent,
    VehiclePricingComponent,
    VehicleFeaturesComponent,
    RelatedVehiclesComponent,
    CtaBannerComponent
  ],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private bookingService = inject(BookingService);

  readonly allVehicles = this.bookingService.vehicles;
  readonly vehicleId = signal<string>('dzire');

  readonly vehicle = computed<Vehicle>(() => {
    return this.allVehicles().find(v => v.id === this.vehicleId()) || this.allVehicles()[0];
  });

  readonly galleryImages = computed<string[]>(() => {
    const main = this.vehicle().image;
    return [
      main,
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ];
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'dzire';
      this.vehicleId.set(id);
      this.updateSeo();
    });
  }

  private updateSeo() {
    const v = this.vehicle();
    this.seo.setPageMeta({
      title: `${v.name} Cab Hire in Jaipur | ₹${v.pricePerKm}/Km Taxi Rental`,
      description: `Book ${v.name} cab in Jaipur for airport pickup, local sightseeing, and outstation trips at ₹${v.pricePerKm}/km. ${v.passengerCapacity} seater AC car with verified driver.`,
      canonicalUrl: `https://knotens.cabs/fleet/${v.id}`
    });

    this.seo.injectStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Car',
      'name': v.name,
      'model': v.name,
      'brand': 'Knotens Cabs Jaipur',
      'seatingCapacity': v.passengerCapacity,
      'vehicleFuelType': v.fuelType,
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'INR',
        'price': v.pricePerKm,
        'url': `https://knotens.cabs/fleet/${v.id}`
      }
    });
  }
}
