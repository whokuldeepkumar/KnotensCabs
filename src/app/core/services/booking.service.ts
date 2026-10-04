import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { BookingCategory, BookingType, BookingRecord, CustomerDetails, ItemizedFare, PaymentDetails, FareEstimate, BookingRequest } from '../models/booking.model';
import { CabServiceItem } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService { 
  // Fleet Signal State 
  readonly vehicles = signal<Vehicle[]>([
    {
      id: 'dzire',
      name: 'Suzuki Dzire / Hyundai Aura',
      category: 'Sedan',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 4,
      luggageCapacity: 2,
      hasAC: true,
      fuelType: 'CNG / Hybrid',
      transmission: 'Manual',
      pricePerKm: 11,
      basePriceAirport: 799,
      hourlyRentalRate8Hours: 2499,
      features: ['Air Conditioning', 'Comfortable Plush Seats', 'Clean Interior', 'Music System', 'GPS Navigation'],
      recommendedFor: 'Budget local travel, couples & small families (up to 4 passengers).',
      popular: true
    },
    {
      id: 'ertiga',
      name: 'Maruti Ertiga',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 6,
      luggageCapacity: 4,
      hasAC: true,
      fuelType: 'Diesel',
      transmission: 'Manual',
      pricePerKm: 14,
      basePriceAirport: 1199,
      hourlyRentalRate8Hours: 2999,
      features: ['Dual AC Vents', 'Extra Luggage Space', 'Spacious Seating', 'Bluetooth Audio', 'GPS Tracking'],
      recommendedFor: 'Family trips, small groups & outstation journeys around Rajasthan.',
      popular: true
    },
    {
      id: 'brezza',
      name: 'Maruti Vitara Brezza / Nexon',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 4,
      luggageCapacity: 3,
      hasAC: true,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      pricePerKm: 13,
      basePriceAirport: 999,
      hourlyRentalRate8Hours: 2799,
      features: ['High Ground Clearance', 'Compact SUV Comfort', 'Climate Control', 'GPS Monitored'],
      recommendedFor: 'City rides & quick outstation trips with superior comfort.',
      popular: false
    },
    {
      id: 'innova-crysta',
      name: 'Toyota Innova Crysta',
      category: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 7,
      luggageCapacity: 5,
      hasAC: true,
      fuelType: 'Diesel',
      transmission: 'Manual/Auto',
      pricePerKm: 18,
      basePriceAirport: 1399,
      hourlyRentalRate8Hours: 3599,
      features: ['Captain Chairs', 'Rear AC Vents', 'Extra Legroom', 'Push Button Start', 'First Aid & Amenities'],
      recommendedFor: 'VIP travel, long outstation tours & corporate client transfers.',
      popular: true
    },
    {
      id: 'innova-hycross',
      name: 'Toyota Innova Hycross Hybrid',
      category: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 7,
      luggageCapacity: 5,
      hasAC: true,
      fuelType: 'CNG / Hybrid',
      transmission: 'Automatic',
      pricePerKm: 21,
      basePriceAirport: 1599,
      hourlyRentalRate8Hours: 4200,
      features: ['Panoramic Sunroof', 'Ultra-Quiet Hybrid Engine', 'Ottoman Reclining Seats', 'Advanced Safety Features'],
      recommendedFor: 'Luxury outstation touring & premium corporate delegation.',
      popular: true
    },
    {
      id: 'tempo-traveller',
      name: 'Force Tempo Traveller (12/17 Seater)',
      category: 'Tempo Traveller',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      passengerCapacity: 16,
      luggageCapacity: 12,
      hasAC: true,
      fuelType: 'Diesel',
      transmission: 'Manual',
      pricePerKm: 26,
      basePriceAirport: 2499,
      hourlyRentalRate8Hours: 5500,
      features: ['Reclining Push-Back Seats', 'High Roof Standing Space', 'LCD Screen & Sound System', 'Large Boot Space'],
      recommendedFor: 'Large group travel, Rajasthan heritage tours & wedding party transfers.',
      popular: true
    }
  ]);

  // Cab Services Signal State (6 Services)
  readonly services = signal<CabServiceItem[]>([
    {
      id: 'airport-pickup',
      title: 'Airport Pickup Taxi',
      slug: 'airport-pickup',
      icon: 'flight_land',
      shortDesc: 'Instant flight-tracking pickup at Jaipur Airport (JAI) with zero waiting charges.',
      fullDesc: 'Seamless pickup from Jaipur International Airport (JAI) directly to your hotel or residence.',
      startingPrice: 799,
      priceUnit: 'flat rate',
      features: ['Flight Tracking', 'Complimentary 45-min Wait Time', 'Driver Meets at Arrival Gate']
    },
    {
      id: 'airport-drop',
      title: 'Airport Drop Taxi',
      slug: 'airport-drop',
      icon: 'flight_takeoff',
      shortDesc: 'Punctual door-to-airport transfers to guarantee you never miss a flight.',
      fullDesc: 'On-time pickup from anywhere in Jaipur to Jaipur International Airport terminal.',
      startingPrice: 799,
      priceUnit: 'flat rate',
      features: ['Guaranteed On-Time Pickup', 'Luggage Assistance', 'Sanitized AC Cabs']
    },
    {
      id: 'jaipur-local',
      title: 'Jaipur Local Sightseeing & Rentals',
      slug: 'jaipur-local',
      icon: 'tour',
      shortDesc: 'Full day & half day packages (8 Hrs) for Amber Fort, Hawa Mahal, Jal Mahal, City Tour.',
      fullDesc: 'Explore Jaipur Pink City heritage sites with an expert local driver.',
      startingPrice: 2000,
      priceUnit: 'for 8 Hrs',
      features: ['Flexible Hourly Packages', 'Knowledgeable Local Driver', 'Unlimited Stops within City']
    },
    {
      id: 'one-way-taxi',
      title: 'One Way Outstation Cab',
      slug: 'one-way-taxi',
      icon: 'alt_route',
      shortDesc: 'Pay only one-way fare for routes like Jaipur to Delhi, Ajmer, Udaipur, Jodhpur & Agra.',
      fullDesc: 'Economical intercity travel without paying return toll or return km.',
      startingPrice: 11,
      priceUnit: 'per Km',
      features: ['Pay Only 1-Way Fare', 'Toll & State Tax Transparency', 'Express Highway Routes']
    },
    {
      id: 'round-trip',
      title: 'Outstation Round Trip',
      slug: 'round-trip',
      icon: 'sync_alt',
      shortDesc: 'Multi-day outstation taxi rentals for Rajasthan tour packages and heritage circuits.',
      fullDesc: 'Hire dedicated cabs for multi-day Rajasthan itineraries.',
      startingPrice: 11,
      priceUnit: 'per Km (Min 250 km/day)',
      features: ['Dedicated Vehicle & Driver', 'Flexible Route Changes', 'Transparent Driver Night Charges']
    },
    {
      id: 'corporate-wedding',
      title: 'Corporate & Wedding Car Rental',
      slug: 'corporate-wedding',
      icon: 'corporate_fare',
      shortDesc: 'Luxury Innova Crysta, executive Sedans & Tempo Travellers for VIP events & weddings.',
      fullDesc: 'Custom fleet solutions for corporate delegations, conferences, and wedding event guest transit.',
      startingPrice: 3500,
      priceUnit: 'per day',
      features: ['VIP Executive Cars', 'Dedicated Event Coordinator', 'Tempo Travellers 12-26 Seats']
    }
  ]);

  readonly activeBooking = signal<Partial<BookingRequest>>({
    serviceType: 'airport-pickup',
    journeyDate: new Date().toISOString().split('T')[0],
    journeyTime: '10:00',
    selectedVehicleId: 'dzire'
  });

  // Active Booking Record Signal State
  readonly lastCompletedBooking = signal<BookingRecord | null>(null);

  // Itemized Fare Calculation Method
  calculateItemizedFare(
    category: BookingCategory,
    vehicleId: string,
    distanceKm = 250,
    couponCode = ''
  ): ItemizedFare {
    const vehicle = this.vehicles().find(v => v.id === vehicleId) || this.vehicles()[0];

    let baseFare = 0;
    let distanceCharge = 0;
    let driverAllowance = 0;
    let nightCharge = 0;
    let waitingCharge = 0;
    let estimatedToll = 0;
    let estimatedStateTax = 0;

    switch (category) {
      case 'airport-pickup':
      case 'airport-drop':
        baseFare = vehicle.basePriceAirport;
        distanceCharge = 0;
        driverAllowance = 0;
        estimatedToll = 100;
        break;
      case 'local':
        baseFare = vehicle.hourlyRentalRate8Hours;
        distanceCharge = 0;
        driverAllowance = 0;
        break;
      case 'outstation-one-way':
        baseFare = 500;
        distanceCharge = distanceKm * vehicle.pricePerKm;
        driverAllowance = 400;
        estimatedToll = 250;
        estimatedStateTax = 200;
        break;
      case 'outstation-round':
        const distance = Math.max(distanceKm, 250);
        baseFare = 500;
        distanceCharge = distance * vehicle.pricePerKm;
        driverAllowance = 400;
        estimatedToll = 350;
        estimatedStateTax = 300;
        break;
    }

    let subtotal = baseFare + distanceCharge + driverAllowance + nightCharge + waitingCharge;

    // Apply Coupon Discounts
    let discountAmount = 0;
    if (couponCode.toUpperCase() === 'PINKCITY10') {
      discountAmount = Math.round(subtotal * 0.10);
    } else if (couponCode.toUpperCase() === 'KNOTENS200') {
      discountAmount = 200;
    }

    const grandTotal = Math.max(subtotal - discountAmount, 0) + estimatedToll + estimatedStateTax;

    return {
      serviceCategory: category,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedDistanceKm: distanceKm,
      baseFare,
      distanceCharge,
      driverAllowance,
      nightCharge,
      waitingCharge,
      estimatedToll,
      estimatedStateTax,
      discountAmount,
      couponCodeApplied: discountAmount > 0 ? couponCode.toUpperCase() : undefined,
      subtotal,
      grandTotal
    };
  }

  // Alias for backward compatibility
  calculateFare(type: BookingType, vehicleId: string, estimatedKm = 250): FareEstimate {
    const itemized = this.calculateItemizedFare(type, vehicleId, estimatedKm);
    const vehicle = this.vehicles().find(v => v.id === vehicleId) || this.vehicles()[0];
    return {
      serviceType: type,
      vehicleName: vehicle.name,
      estimatedDistanceKm: estimatedKm,
      baseFare: itemized.baseFare + itemized.distanceCharge,
      driverAllowance: itemized.driverAllowance,
      totalEstimate: itemized.grandTotal,
      includedKm: itemized.serviceCategory === 'local' ? 80 : (itemized.serviceCategory.includes('airport') ? 30 : estimatedKm),
      extraKmRate: vehicle.pricePerKm
    };
  }

  // Create Booking Method (Future API Ready)
  createBooking(bookingPayload: Partial<BookingRecord>): Observable<BookingRecord> {
    const randomId = 'KC-' + Math.floor(100000 + Math.random() * 900000);
    
    const record: BookingRecord = {
      bookingId: randomId,
      category: bookingPayload.category || 'airport-pickup',
      pickupLocation: bookingPayload.pickupLocation || 'Jaipur Airport Terminal 2',
      dropLocation: bookingPayload.dropLocation || 'Malviya Nagar, Jaipur',
      journeyDate: bookingPayload.journeyDate || new Date().toISOString().split('T')[0],
      journeyTime: bookingPayload.journeyTime || '10:00',
      returnDate: bookingPayload.returnDate,
      vehicleId: bookingPayload.vehicleId || 'dzire',
      customer: bookingPayload.customer || {
        fullName: 'Guest Passenger',
        mobileNumber: '9829012345',
        email: 'passenger@example.com',
        pickupAddress: 'Terminal 2 Gate 3, Jaipur Airport',
        dropAddress: 'Hotel Taj Rambagh Palace, Jaipur'
      },
      fare: bookingPayload.fare || this.calculateItemizedFare('airport-pickup', 'dzire'),
      payment: bookingPayload.payment || {
        method: 'pay-to-driver',
        status: 'pending',
        advanceAmount: 0,
        dueAmount: bookingPayload.fare?.grandTotal || 799
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Store in signal
    this.lastCompletedBooking.set(record);

    return of(record);
  }

  validateBooking(bookingData: any): boolean {
    return !!(bookingData && bookingData.pickupLocation && bookingData.dropLocation && bookingData.customer?.mobileNumber);
  }

  cancelBooking(bookingId: string): Observable<boolean> {
    if (this.lastCompletedBooking()?.bookingId === bookingId) {
      const current = this.lastCompletedBooking()!;
      this.lastCompletedBooking.set({ ...current, status: 'cancelled' });
    }
    return of(true);
  }
}
