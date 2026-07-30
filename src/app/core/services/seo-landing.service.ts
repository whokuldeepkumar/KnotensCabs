import { Injectable } from '@angular/core';
import { FaqItem } from '../models/faq.model';

export interface SeoLandingConfig {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  serviceDescription: string;
  breadcrumbs: { label: string; url?: string }[];
  faqs: FaqItem[];
  pricingNotes?: string;
  startingPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeoLandingService {
  private readonly pageConfigs: Record<string, SeoLandingConfig> = {
    'services': {
      slug: 'services',
      title: 'Our Taxi Services',
      metaTitle: 'Jaipur Taxi & Cab Booking Services | Knotens Cabs',
      metaDescription: 'Explore Knotens Cabs complete range of taxi services in Jaipur: Airport pickup & drop, local sightseeing hourly packages, one-way outstation cabs & Tempo Travellers.',
      heroHeadline: 'Premier Taxi Services in Jaipur',
      heroSubtitle: 'Local City Rides, Jaipur Airport Transfers, One Way & Round Trip Outstation Cabs',
      serviceDescription: 'Knotens Cabs offers round-the-clock taxi booking services in Jaipur with guaranteed on-time pickup, verified drivers, transparent fares, and well-maintained AC cars.',
      startingPrice: 799,
      breadcrumbs: [{ label: 'Our Services', url: '/services' }],
      faqs: [
        { id: 1, question: 'What taxi services do you offer in Jaipur?', answer: 'We offer 24x7 Airport Transfers (JAI), Jaipur Local Sightseeing (8 Hr/80 Km packages), One-Way Outstation Cabs, Multi-day Round Trips, Corporate Rentals, and Tempo Travellers.', category: 'General' },
        { id: 2, question: 'How can I book a cab with Knotens Cabs?', answer: 'You can book online through our instant booking wizard, call our dispatch at +91 98290 12345, or send us a WhatsApp message.', category: 'Booking' },
        { id: 3, question: 'Are all your cabs equipped with air conditioning?', answer: 'Yes, 100% of our fleet (Sedans, SUVs, Premium Innova Crysta, and Tempo Travellers) features high-performance dual AC units.', category: 'General' },
        { id: 4, question: 'Do you charge extra for night pickups?', answer: 'Night driver allowance (₹300-₹400) applies only between 10:00 PM and 6:00 AM for outstation trips. Flat airport rates have zero extra night surge.', category: 'Pricing & Payment' },
        { id: 5, question: 'Is there any cancellation fee?', answer: 'No cancellation fee applies if cancelled at least 2 hours prior to scheduled pickup time.', category: 'Cancellation' },
        { id: 6, question: 'Do you provide GST tax invoices for business trips?', answer: 'Yes, we provide detailed GST invoices for corporate travelers and business reimbursement.', category: 'Pricing & Payment' },
        { id: 7, question: 'Are your drivers background verified?', answer: 'All Knotens Cabs drivers undergo strict police background verification and commercial license audits.', category: 'General' },
        { id: 8, question: 'Can I book a one-way taxi from Jaipur to Delhi or Ajmer?', answer: 'Yes! We specialize in one-way outstation cabs where you pay only for one-way distance.', category: 'Outstation' },
        { id: 9, question: 'What payment methods do you accept?', answer: 'We accept Cash to Driver, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Corporate Billing.', category: 'Pricing & Payment' },
        { id: 10, question: 'What is the luggage capacity for sedan cabs?', answer: 'Sedan cabs (Dzire/Etios) accommodate 4 passengers and 2 large suitcases in the boot.', category: 'General' }
      ]
    },
    'jaipur-airport-taxi': {
      slug: 'jaipur-airport-taxi',
      title: 'Jaipur Airport Taxi Service',
      metaTitle: 'Jaipur Airport Taxi Pickup & Drop Cab Service | ₹799 Flat Rate',
      metaDescription: 'Book 24x7 Jaipur Airport (JAI) taxi pickup & drop cab starting at flat ₹799. Flight tracking, 45-min free wait time, and polite driver included.',
      heroHeadline: '24x7 Jaipur Airport Taxi (JAI)',
      heroSubtitle: 'Hassle-Free Airport Pickup & Drop Transfers starting at Flat ₹799 with Real-Time Flight Tracking',
      serviceDescription: 'Never miss a flight or wait in long taxi queues at Jaipur International Airport (JAI). Knotens Cabs provides dedicated airport taxi transfers with meet-and-greet service.',
      startingPrice: 799,
      breadcrumbs: [{ label: 'Jaipur Airport Taxi', url: '/jaipur-airport-taxi' }],
      faqs: [
        { id: 1, question: 'What is the fare for Jaipur Airport taxi pickup?', answer: 'Jaipur Airport pickup starts at flat ₹799 for Swift Dzire sedan cab with zero hidden surge pricing.', category: 'Airport' },
        { id: 2, question: 'What happens if my flight arriving at Jaipur Airport is delayed?', answer: 'We track your flight landing in real-time. Your driver will adjust pickup time automatically with 45 minutes free waiting time.', category: 'Airport' },
        { id: 3, question: 'Where will the driver meet me at Jaipur Airport Terminal 2?', answer: 'Our uniformed driver will meet you directly outside the arrival exit gate with a personalized nameboard.', category: 'Airport' },
        { id: 4, question: 'Can I book a taxi from Jaipur Airport to Ajmer or Pushkar directly?', answer: 'Yes! Direct outstation transfers from Jaipur Airport to Ajmer, Pushkar, Ranthambore, and Udaipur are available 24x7.', category: 'Airport' },
        { id: 5, question: 'How early should I book an airport drop cab in Jaipur?', answer: 'We recommend booking at least 2 hours in advance. Instant dispatch is also available for emergency bookings.', category: 'Airport' },
        { id: 6, question: 'Are toll charges included in the airport cab price?', answer: 'Airport road toll tax is included in our flat pricing structure.', category: 'Pricing & Payment' },
        { id: 7, question: 'What cab options are available for airport groups?', answer: 'We offer Maruti Ertiga (6 Seater), Innova Crysta (7 Seater), and Tempo Travellers (12-17 Seater) for family group airport luggage.', category: 'Airport' },
        { id: 8, question: 'Is airport pickup safe for female travelers at night?', answer: 'Yes! All cabs are live GPS tracked and driven by background-verified polite chauffeurs.', category: 'General' },
        { id: 9, question: 'Can I pay online via UPI for Jaipur Airport cab?', answer: 'Yes, pay via Google Pay, PhonePe, Paytm or pay cash directly to the driver upon reaching destination.', category: 'Pricing & Payment' },
        { id: 10, question: 'Do you provide baby booster seats for airport transfers?', answer: 'Child booster seats can be arranged upon prior request during booking.', category: 'General' }
      ]
    },
    'jaipur-local-taxi': {
      slug: 'jaipur-local-taxi',
      title: 'Jaipur Local Taxi & Full Day Rental',
      metaTitle: 'Jaipur Local Taxi Service | Sightseeing & Full Day Cab Hire',
      metaDescription: 'Rent local taxi in Jaipur for Pink City tour & full day hourly package starting ₹2000 for 8 Hrs/80 Km. Experienced Jaipur driver guide included.',
      heroHeadline: 'Jaipur Local Sightseeing & Hourly Taxi Hire',
      heroSubtitle: 'Explore Amer Fort, Hawa Mahal, Jal Mahal & Chokhi Dhani with 8 Hr / 80 Km Full Day Packages',
      serviceDescription: 'Discover the royal heritage of Jaipur Pink City at your own pace. Hire a local taxi package for shopping bazaars, Amer Fort, City Palace, Nahargarh, and Albert Hall Museum.',
      startingPrice: 2000,
      breadcrumbs: [{ label: 'Jaipur Local Taxi', url: '/jaipur-local-taxi' }],
      faqs: [
        { id: 1, question: 'What is included in the 8 Hours / 80 Km Jaipur local taxi package?', answer: 'The package includes 8 hours of dedicated cab hire, 80 kilometers of local travel, fuel, full AC, and driver allowance within Jaipur city limits.', category: 'General' },
        { id: 2, question: 'What are the extra charges if I exceed 8 hours or 80 km?', answer: 'Extra distance is charged at ₹11/km for Dzire and ₹14/km for Ertiga. Extra time is ₹100/hour.', category: 'Pricing & Payment' },
        { id: 3, question: 'Can the driver guide us through Jaipur tourist monuments?', answer: 'Our local drivers are born-and-raised Jaipur natives with extensive knowledge of Amer Fort, Hawa Mahal, and local food spots.', category: 'General' },
        { id: 4, question: 'Which heritage places are covered in full day Jaipur sightseeing?', answer: 'Amer Fort, Jal Mahal, Hawa Mahal, City Palace, Jantar Mantar, Nahargarh Fort, Jaigarh Fort, and Chokhi Dhani evening cultural village.', category: 'General' },
        { id: 5, question: 'Are monument entry fees or parking included in the taxi fare?', answer: 'Monument entry tickets and parking fees are paid separately by passengers at destination counters.', category: 'Pricing & Payment' },
        { id: 6, question: 'Can we customize our local Jaipur itinerary?', answer: 'Absolutely! You have 100% freedom to choose your stops, shopping markets (Johari Bazaar, Bapu Bazaar), and dining spots.', category: 'General' },
        { id: 7, question: 'Is a half day 4 Hours / 40 Km local rental available?', answer: 'Yes, half day local rental is available starting at ₹1200.', category: 'Pricing & Payment' },
        { id: 8, question: 'What is the best vehicle for a family tour of Jaipur?', answer: 'Maruti Ertiga (6 Seater) or Toyota Innova Crysta (7 Seater) offer maximum legroom and dual AC comfort.', category: 'General' },
        { id: 9, question: 'Do you offer evening drop to Chokhi Dhani ethnic resort?', answer: 'Yes, we provide late night return pick-up and drop for Chokhi Dhani dinner outings.', category: 'General' },
        { id: 10, question: 'Can I book a local cab for shopping in Jaipur markets?', answer: 'Yes, our driver will wait while you shop for gems, textiles, blue pottery, and handicrafts.', category: 'General' }
      ]
    },
    'jaipur-to-delhi-taxi': {
      slug: 'jaipur-to-delhi-taxi',
      title: 'Jaipur to Delhi Taxi Service',
      metaTitle: 'Jaipur to Delhi Taxi Service | One Way Cab ₹2899',
      metaDescription: 'Book one-way and round-trip taxi from Jaipur to Delhi NCR & IGI Airport starting ₹2899. Express Delhi-Mumbai expressway route, comfortable AC cabs.',
      heroHeadline: 'Jaipur to Delhi One Way Taxi & Outstation Cab',
      heroSubtitle: 'Travel via Express Highway to Delhi NCR, Gurgaon, Noida & IGI Airport Terminal 3 at just ₹2899',
      serviceDescription: 'Enjoy a comfortable, stress-free road journey from Jaipur to Delhi NCR via Delhi-Mumbai Expressway. Ideal for corporate travelers, flight connections at IGI Airport, and family visits.',
      startingPrice: 2899,
      breadcrumbs: [{ label: 'Jaipur to Delhi Taxi', url: '/jaipur-to-delhi-taxi' }],
      faqs: [
        { id: 1, question: 'What is the one-way taxi fare from Jaipur to Delhi?', answer: 'One-way taxi fare from Jaipur to Delhi starts at ₹2899 for Sedan cabs (Dzire/Etios) via express highway.', category: 'Outstation' },
        { id: 2, question: 'How long does a cab take from Jaipur to Delhi NCR?', answer: 'Travel time is approximately 4 to 4.5 hours via Delhi-Mumbai Expressway under normal traffic conditions.', category: 'Outstation' },
        { id: 3, question: 'Do you drop directly to Delhi IGI Airport Terminal 3?', answer: 'Yes! We offer direct doorstep to terminal door drop at IGI Airport T1, T2, and T3.', category: 'Airport' },
        { id: 4, question: 'Are highway tolls and state taxes included in the fare?', answer: 'Tolls and Haryana/Delhi state entry taxes are paid as per actual FASTag receipts.', category: 'Pricing & Payment' },
        { id: 5, question: 'Is night travel safe from Jaipur to Delhi?', answer: 'Yes, expressways are well-lit and our drivers are experienced commercial long-distance operators.', category: 'General' },
        { id: 6, question: 'Can we stop for refreshments/food at highway dhabas?', answer: 'Yes, our drivers stop at hygienic food plazas (Haldiram, Bikanervala, Neemrana) upon your request.', category: 'General' },
        { id: 7, question: 'What is the fare for Innova Crysta from Jaipur to Delhi?', answer: 'Toyota Innova Crysta one-way fare starts at ₹4499.', category: 'Outstation' },
        { id: 8, question: 'Can I book a cab from Gurgaon/Delhi to Jaipur return?', answer: 'Yes, we provide round-trip and reverse Delhi to Jaipur cab bookings 24x7.', category: 'Outstation' },
        { id: 9, question: 'Is advance payment mandatory for Jaipur to Delhi booking?', answer: 'Zero advance required for cash on arrival bookings. You can pay full fare to driver.', category: 'Pricing & Payment' },
        { id: 10, question: 'What is your luggage limit for outstation cabs to Delhi?', answer: 'Sedan carries 2 large bags; Ertiga carries 4; Innova Crysta carries 5 large suitcases.', category: 'General' }
      ]
    },
    'jaipur-to-ajmer-taxi': {
      slug: 'jaipur-to-ajmer-taxi',
      title: 'Jaipur to Ajmer & Pushkar Taxi',
      metaTitle: 'Jaipur to Ajmer Taxi Service | Cab to Dargah Sharif & Pushkar ₹1799',
      metaDescription: 'Book outstation taxi from Jaipur to Ajmer Dargah Sharif & Pushkar Brahma Temple starting ₹1799. 135 km highway trip, fast & reliable cabs.',
      heroHeadline: 'Jaipur to Ajmer Sharif & Pushkar Cab Service',
      heroSubtitle: 'Pilgrimage & Heritage Taxi Trips to Ajmer Dargah Sharif & Pushkar Lake at ₹1799',
      serviceDescription: 'Travel smoothly from Jaipur to Ajmer Dargah Sharif and Pushkar Holy Lake. We provide same-day return packages and one-way drops with polite Rajasthan drivers.',
      startingPrice: 1799,
      breadcrumbs: [{ label: 'Jaipur to Ajmer Taxi', url: '/jaipur-to-ajmer-taxi' }],
      faqs: [
        { id: 1, question: 'What is the distance and travel time from Jaipur to Ajmer?', answer: 'Distance is 135 km via NH48, taking approximately 2.5 hours.', category: 'Outstation' },
        { id: 2, question: 'What is the taxi fare for Jaipur to Ajmer one way?', answer: 'One-way taxi fare starts at ₹1799 for Sedan cab.', category: 'Outstation' },
        { id: 3, question: 'Does the cab cover both Ajmer Dargah and Pushkar Brahma Temple in 1 day?', answer: 'Yes, our same-day Jaipur-Ajmer-Pushkar tour package covers both holy sites starting at ₹2400.', category: 'Outstation' },
        { id: 4, question: 'Where will the driver park near Ajmer Dargah Sharif?', answer: 'Driver will park at approved Ajmer parking zones and assist you with local e-rickshaws to Dargah entrance.', category: 'General' },
        { id: 5, question: 'Can we visit Ana Sagar Lake and Taragarh Fort in Ajmer?', answer: 'Yes, custom sightseeing stops can be included in round-trip packages.', category: 'General' },
        { id: 6, question: 'Is Tempo Traveller available for group pilgrimage to Ajmer?', answer: 'Yes, 12, 17, and 26-seater AC Tempo Travellers are available for group yatras.', category: 'General' },
        { id: 7, question: 'What is the price for Ertiga SUV from Jaipur to Ajmer?', answer: 'Maruti Ertiga 6-seater fare starts at ₹2399.', category: 'Outstation' },
        { id: 8, question: 'Can we get early morning 4 AM pickup from Jaipur hotel?', answer: 'Yes, 24x7 early morning and late night pickups are available.', category: 'General' },
        { id: 9, question: 'Are tolls included in Ajmer taxi fare?', answer: 'Highway toll charges (approx ₹150) are paid per actual FASTag receipts.', category: 'Pricing & Payment' },
        { id: 10, question: 'How do I book Jaipur to Ajmer taxi online?', answer: 'Fill the quick booking form above or WhatsApp us at +91 98290 12345.', category: 'Booking' }
      ]
    },
    'jaipur-to-udaipur-taxi': {
      slug: 'jaipur-to-udaipur-taxi',
      title: 'Jaipur to Udaipur Taxi Service',
      metaTitle: 'Jaipur to Udaipur Taxi Service | City of Lakes Cab ₹4299',
      metaDescription: 'Book Jaipur to Udaipur outstation cab starting ₹4299 via Chittorgarh Fort highway. 395 km scenic road trip in clean AC Innova Crysta & Dzire.',
      heroHeadline: 'Jaipur to Udaipur Lake City Outstation Cab',
      heroSubtitle: 'Scenic Highway Taxi Journey to Udaipur City Palace, Lake Pichola & Fatehsagar at ₹4299',
      serviceDescription: 'Experience the royal road tour connecting Pink City Jaipur to Venice of the East Udaipur (395 km). Option to visit Chittorgarh Fort or Nathdwara enroute.',
      startingPrice: 4299,
      breadcrumbs: [{ label: 'Jaipur to Udaipur Taxi', url: '/jaipur-to-udaipur-taxi' }],
      faqs: [
        { id: 1, question: 'What is the cab fare from Jaipur to Udaipur?', answer: 'One-way Sedan fare starts at ₹4299. Innova Crysta starts at ₹6499.', category: 'Outstation' },
        { id: 2, question: 'How long does a taxi take from Jaipur to Udaipur?', answer: 'Approximately 6.5 to 7 hours via NH48 national highway.', category: 'Outstation' },
        { id: 3, question: 'Can we stop at Chittorgarh Fort or Nathdwara Shrinathji Temple on the way?', answer: 'Yes! Sightseeing enroute at Chittorgarh Fort or Nathdwara can be added to your round trip package.', category: 'Outstation' },
        { id: 4, question: 'What is the per km rate for multi-day Jaipur to Udaipur tour?', answer: 'Per km rate starts at ₹11/km for Sedan and ₹18/km for Innova Crysta (minimum 250 km/day).', category: 'Pricing & Payment' },
        { id: 5, question: 'Is driver night charge applicable for 3-day Udaipur tour?', answer: 'Yes, driver night allowance of ₹400/night applies for multi-day tours.', category: 'Pricing & Payment' },
        { id: 6, question: 'Do you drop directly to Udaipur hotel/resort near Lake Pichola?', answer: 'Yes, doorstep pickup in Jaipur and doorstep drop at your Udaipur resort.', category: 'Outstation' },
        { id: 7, question: 'Are Innova Crysta cabs available for Jaipur to Udaipur road trip?', answer: 'Yes, Innova Crysta with captain seats is our top recommended car for long highway comfort.', category: 'General' },
        { id: 8, question: 'Can we book a return cab from Udaipur to Jaipur?', answer: 'Yes, reverse drop bookings from Udaipur to Jaipur airport/city are available 24x7.', category: 'Outstation' },
        { id: 9, question: 'Are highway tolls extra for Udaipur route?', answer: 'National highway tolls (approx ₹450) are paid per actual FASTag receipts.', category: 'Pricing & Payment' },
        { id: 10, question: 'How far in advance should I reserve a taxi to Udaipur?', answer: 'We advise booking 24 hours in advance during peak Rajasthan tourist season.', category: 'Booking' }
      ]
    }
  };

  getConfig(slug: string): SeoLandingConfig {
    if (this.pageConfigs[slug]) {
      return this.pageConfigs[slug];
    }
    // Generic Default Fallback Config
    const formatTitle = slug.replace(/-/g, ' ').toUpperCase();
    return {
      slug,
      title: `${formatTitle} Taxi Service`,
      metaTitle: `${formatTitle} Taxi Service Jaipur | Knotens Cabs`,
      metaDescription: `Book reliable ${formatTitle} taxi service with Knotens Cabs in Jaipur. On-time guaranteed, clean AC cars, experienced drivers & low rates.`,
      heroHeadline: `${formatTitle} Cab Booking`,
      heroSubtitle: 'Reliable Local & Outstation Taxi Service in Jaipur, Rajasthan',
      serviceDescription: `Knotens Cabs provides premium ${formatTitle} taxi services with 24x7 dispatch, transparent per-km rates, and verified polite drivers.`,
      startingPrice: 799,
      breadcrumbs: [{ label: formatTitle, url: `/${slug}` }],
      faqs: this.pageConfigs['services'].faqs
    };
  }
}
