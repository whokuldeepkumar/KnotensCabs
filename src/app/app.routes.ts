import { Routes } from '@angular/router';

export const routes: Routes = [
  // Public Web Application Routes (Wrapped in MainLayoutComponent)
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        title: 'Reliable Taxi Service in Jaipur',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'book',
        title: 'Book Cab Online - Instant Reservation',
        loadComponent: () => import('./pages/book/book.component').then(m => m.BookComponent)
      },
      {
        path: 'booking-success',
        title: 'Booking Confirmed - Knotens Cabs',
        loadComponent: () => import('./pages/booking-success/booking-success.component').then(m => m.BookingSuccessComponent)
      },
      {
        path: 'booking-failed',
        title: 'Booking Failed - Contact Dispatch',
        loadComponent: () => import('./pages/booking-failed/booking-failed.component').then(m => m.BookingFailedComponent)
      },
      {
        path: 'fleet',
        title: 'Our Taxi Fleet - Dzire, Ertiga, Innova Crysta',
        loadComponent: () => import('./pages/fleet/fleet.component').then(m => m.FleetComponent)
      },
      {
        path: 'fleet/:id',
        title: 'Vehicle Details & Cab Tariff',
        loadComponent: () => import('./pages/fleet/vehicle-detail/vehicle-detail.component').then(m => m.VehicleDetailComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'airport-transfer',
        title: 'Jaipur Airport Taxi Service - 24x7 Airport Pickup & Drop ₹799',
        loadComponent: () => import('./pages/airport-transfer/airport-transfer.component').then(m => m.AirportTransferComponent)
      },
      {
        path: 'local-taxi',
        title: 'Jaipur Local Taxi Service - Full Day Sightseeing Cab ₹2,000',
        loadComponent: () => import('./pages/local-taxi/local-taxi.component').then(m => m.LocalTaxiComponent)
      },
      {
        path: 'outstation',
        title: 'Jaipur Outstation Taxi Service - One-Way & Round Trip Cabs ₹11/Km',
        loadComponent: () => import('./pages/outstation/outstation.component').then(m => m.OutstationComponent)
      },
      {
        path: 'outstation-taxi',
        title: 'Jaipur Outstation Taxi Service - One-Way & Round Trip Cabs ₹11/Km',
        loadComponent: () => import('./pages/outstation/outstation.component').then(m => m.OutstationComponent)
      },
      {
        path: 'one-way-cab',
        title: 'Jaipur One Way Cabs - Outstation Taxi Hire ₹11/Km',
        loadComponent: () => import('./pages/outstation/outstation.component').then(m => m.OutstationComponent)
      },
      {
        path: 'round-trip',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'corporate-cab',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'wedding-car-rental',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-airport-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-local-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-ajmer-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-delhi-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-udaipur-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-jodhpur-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-pushkar-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-ranthambore-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-bikaner-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-kota-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'jaipur-to-mount-abu-taxi',
        loadComponent: () => import('./pages/seo-landing/seo-landing.component').then(m => m.SeoLandingComponent)
      },
      {
        path: 'pricing',
        title: 'Taxi Fares & Transparent Rental Packages',
        loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent)
      },
      {
        path: 'about',
        title: 'About Us - Premier Cab Service in Jaipur',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'faq',
        title: 'Frequently Asked Questions (FAQ)',
        loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent)
      },
      {
        path: 'contact',
        title: 'Contact Us 24x7 - Knotens Cabs Jaipur',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'privacy-policy',
        title: 'Privacy Policy',
        loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyPolicyComponent)
      },
      {
        path: 'terms-and-conditions',
        title: 'Terms & Conditions',
        loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
      },
      {
        path: 'cancellation-policy',
        title: 'Cancellation & Refund Policy',
        loadComponent: () => import('./pages/cancellation/cancellation.component').then(m => m.CancellationPolicyComponent)
      },
      {
        path: '404',
        title: 'Page Not Found - Knotens Cabs',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
      }
    ]
  },

  // Admin Routes (Independent Layout & Standalone Auth)
  {
    path: 'admin/login',
    title: 'Admin Portal Login - Knotens Cabs',
    loadComponent: () => import('./admin/pages/login/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        title: 'Dispatch Dashboard - Knotens Admin',
        loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'bookings',
        title: 'Booking Management - Knotens Admin',
        loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
