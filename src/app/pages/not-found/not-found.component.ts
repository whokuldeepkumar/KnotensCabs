import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta({
      title: '404 - Page Not Found | Knotens Cabs Jaipur',
      description: 'The page you are looking for might have been moved or does not exist.'
    });
  }
}
