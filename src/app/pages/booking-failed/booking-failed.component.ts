import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-booking-failed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './booking-failed.component.html',
  styleUrl: './booking-failed.component.scss'
})
export class BookingFailedComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Booking Request Unable to Complete | Knotens Cabs Jaipur',
      description: 'We could not complete your online cab booking request. Please call our 24x7 helpline or retry.'
    });
  }
}
