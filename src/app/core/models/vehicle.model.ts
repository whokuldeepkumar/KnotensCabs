export interface Vehicle {
  id: string;
  name: string;
  category: 'Sedan' | 'SUV' | 'Premium SUV' | 'Tempo Traveller';
  image: string;
  passengerCapacity: number;
  luggageCapacity: number;
  hasAC: boolean;
  fuelType: 'Diesel' | 'Petrol' | 'CNG / Hybrid';
  transmission: string;
  pricePerKm: number;
  basePriceAirport: number;
  hourlyRentalRate8Hours: number;
  features: string[];
  recommendedFor: string;
  popular: boolean;
}
