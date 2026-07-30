export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Pricing & Payment' | 'Airport' | 'Outstation' | 'Cancellation';
}
