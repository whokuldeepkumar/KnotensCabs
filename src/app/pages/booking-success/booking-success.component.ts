import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BookingService } from '../../core/services/booking.service';
import { BookingRecord } from '../../core/models/booking.model';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.scss'
})
export class BookingSuccessComponent implements OnInit {
  private seo = inject(SeoService);
  private bookingService = inject(BookingService);

  readonly booking = this.bookingService.lastCompletedBooking;

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Booking Confirmed | Knotens Cabs Jaipur',
      description: 'Your taxi booking with Knotens Cabs Jaipur has been confirmed. Our driver details will be sent via SMS/WhatsApp.'
    });
  }

  whatsappConfirm() {
    const b = this.booking();
    if (!b) return;

    const text = `*Booking Confirmed - Knotens Cabs*%0A` +
      `*Booking ID:* ${b.bookingId}%0A` +
      `*Passenger:* ${b.customer.fullName}%0A` +
      `*Pickup:* ${b.pickupLocation}%0A` +
      `*Drop:* ${b.dropLocation}%0A` +
      `*Date:* ${b.journeyDate} at ${b.journeyTime}%0A` +
      `*Total Fare:* ₹${b.fare.grandTotal}`;

    window.open(`https://wa.me/919103612859?text=${text}`, '_blank');
  }
}
