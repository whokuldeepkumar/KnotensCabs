export type BookingCategory = 'local' | 'airport-pickup' | 'airport-drop' | 'outstation-one-way' | 'outstation-round';

export type BookingType = BookingCategory;

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  pickupAddress: string;
  dropAddress: string;
  specialInstructions?: string;
  gstNumber?: string;
}

export interface BookingRequest {
  serviceType: BookingType;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  journeyTime: string;
  returnDate?: string;
  selectedVehicleId: string;
  passengerName: string;
  phone: string;
  email?: string;
  comments?: string;
}

export interface FareEstimate {
  serviceType: BookingType;
  vehicleName: string;
  estimatedDistanceKm: number;
  baseFare: number;
  driverAllowance: number;
  totalEstimate: number;
  includedKm: number;
  extraKmRate: number;
}

export interface ItemizedFare {
  serviceCategory: BookingCategory;
  vehicleId: string;
  vehicleName: string;
  estimatedDistanceKm: number;
  baseFare: number;
  distanceCharge: number;
  driverAllowance: number;
  nightCharge: number;
  waitingCharge: number;
  estimatedToll: number;
  estimatedStateTax: number;
  discountAmount: number;
  couponCodeApplied?: string;
  subtotal: number;
  grandTotal: number;
}

export interface PaymentDetails {
  method: 'pay-to-driver' | 'upi-advance' | 'card' | 'corporate-billing';
  status: 'pending' | 'partially-paid' | 'completed';
  advanceAmount: number;
  dueAmount: number;
}

export interface BookingRecord {
  bookingId: string;
  category: BookingCategory;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  journeyTime: string;
  returnDate?: string;
  vehicleId: string;
  customer: CustomerDetails;
  fare: ItemizedFare;
  payment: PaymentDetails;
  status: 'confirmed' | 'dispatched' | 'completed' | 'cancelled';
  createdAt: string;
}
