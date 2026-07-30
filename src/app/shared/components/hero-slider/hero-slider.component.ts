import { Component, signal, OnDestroy, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FleetVehicleShowcase {
  name: string;
  tag: string;
  image: string;
}

export interface HeroSlide {
  id: number;
  themeBadge?: string;
  badgeIcon?: string;
  title: string;
  subtitle: string;
  featureHighlights?: string[];
  bgGradient?: string;
  bgImage?: string;
  showVehicleFleetGrid?: boolean;
  fleetVehicles?: FleetVehicleShowcase[];
  primaryCta: { label: string; route: string };
  secondaryCta?: { label: string; route: string };
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss'
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  readonly currentSlideIndex = signal<number>(0);
  readonly isHovered = signal<boolean>(false);

  private autoplayTimer: any;
  private touchStartX = 0;
  private touchEndX = 0;

  readonly slides: HeroSlide[] = [
    {
      id: 1,
      themeBadge: 'Knotens Fleet Showcase',
      badgeIcon: 'local_taxi',
      title: 'Choose Your Perfect Ride',
      subtitle: 'From city commutes to family road trips, choose from our clean, sanitized & comfortable cab lineup.',
      featureHighlights: ['100% Verified Cabs', 'Sanitized AC Interiors', 'Zero Surge Pricing'],
      bgGradient: 'linear-gradient(135deg, #070F1E 0%, #0F2342 50%, #153E75 100%)',
      showVehicleFleetGrid: true,
      fleetVehicles: [
        { name: 'Hyundai Aura', tag: 'Sedan • AC', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80' },
        { name: 'Maruti Dzire', tag: 'Top Pick • 4 Seats', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80' },
        { name: 'Maruti Eeco', tag: 'Budget • 5 Seats', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80' },
        { name: 'Maruti Ertiga', tag: 'SUV • 6 Seats', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80' }
      ],
      primaryCta: { label: 'Explore All Vehicles', route: '/fleet' }
    },
    {
      id: 2,
      themeBadge: 'Royal Rajasthan Tours',
      badgeIcon: 'temple_hindu',
      title: 'Explore Rajasthan with Knotens Cabs',
      subtitle: 'Comfortable rides for sightseeing, heritage fort tours, and family holidays across Jaipur, Udaipur & Jodhpur.',
      featureHighlights: ['Heritage Fort Tours', 'Custom Outstation Routes', 'Local Expert Drivers'],
      bgImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
      primaryCta: { label: 'Book Tour Now', route: '/contact' },
      secondaryCta: { label: 'View Outstation Routes', route: '/outstation' }
    },
    {
      id: 3,
      themeBadge: 'Jaipur City Sightseeing',
      badgeIcon: 'location_city',
      title: 'Low Cost Local Taxi in Jaipur',
      subtitle: 'Affordable daily rides with clean cars, transparent 8h/80km rates, and polite driver guides.',
      featureHighlights: ['Flat 8 Hrs / 80 Km Packages', 'Unlimited City Stops', 'Polite Local Drivers'],
      bgImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1600&q=80',
      primaryCta: { label: 'Book Local Taxi', route: '/local-taxi' }
    },
    {
      id: 4,
      themeBadge: '24x7 Flight Tracking',
      badgeIcon: 'flight_land',
      title: 'On-Time Jaipur Airport Pickup & Drop',
      subtitle: 'Real-time flight tracking, doorstep pickup, 45-min free waiting time, and fixed flat pricing from ₹799.',
      featureHighlights: ['Flight Flight Tracking', '45 Min Free Waiting', 'Flat Rate ₹799'],
      bgImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
      primaryCta: { label: 'Airport Transfer', route: '/airport-transfer' }
    },
    {
      id: 5,
      themeBadge: 'Express Highway Travel',
      badgeIcon: 'alt_route',
      title: 'Comfortable Outstation Cabs',
      subtitle: 'Travel anywhere in Rajasthan, Delhi NCR & Agra with experienced highway drivers.',
      featureHighlights: ['Express Highway Drivers', 'One-Way & Round Trips', '24x7 Dispatch Support'],
      bgImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
      primaryCta: { label: 'Book Outstation', route: '/outstation' }
    },
    {
      id: 6,
      themeBadge: 'Corporate & Weddings',
      badgeIcon: 'corporate_fare',
      title: 'Premium Cab Services for Every Occasion',
      subtitle: 'Corporate delegation travel, wedding fleet transportation, and luxury Tempo Traveller rentals.',
      featureHighlights: ['VIP Executive Innova Crysta', 'Wedding Party Fleets', 'Tempo Travellers 12-26 Seats'],
      bgImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
      primaryCta: { label: 'Book Premium Ride', route: '/contact' }
    }
  ];

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.isHovered()) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  nextSlide() {
    this.currentSlideIndex.update(idx => (idx + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlideIndex.update(idx => (idx - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
  }

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.prevSlide();
    }
  }
}
