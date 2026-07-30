import { Component, input, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-gallery',
  standalone: true,
  template: `
    <div class="vehicle-gallery">
      <div class="main-image card">
        <img [src]="activeImage()" [alt]="vehicleName()" loading="lazy">
        <span class="gallery-badge">{{ vehicleName() }} Gallery</span>
      </div>

      <div class="thumbnails-grid">
        @for (img of images(); track img; let i = $index) {
          <button 
            type="button" 
            class="thumb-btn card" 
            [class.active]="activeImage() === img"
            (click)="setActive(img)">
            <img [src]="img" [alt]="vehicleName() + ' image ' + (i + 1)" loading="lazy">
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .vehicle-gallery {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .main-image {
      position: relative;
      height: 380px;
      overflow: hidden;
      border-radius: var(--border-radius-md);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
      }
    }
    .gallery-badge {
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: rgba(15, 23, 42, 0.8);
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.35rem 0.85rem;
      border-radius: var(--border-radius-full);
      backdrop-filter: blur(4px);
    }
    .thumbnails-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
    }
    .thumb-btn {
      height: 80px;
      padding: 0;
      overflow: hidden;
      border: 2px solid transparent;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover, &.active {
        border-color: var(--primary-color);
        box-shadow: var(--shadow-md);
      }
    }
  `]
})
export class VehicleGalleryComponent implements OnInit {
  readonly images = input.required<string[]>();
  readonly vehicleName = input.required<string>();

  readonly activeImage = signal<string>('');

  ngOnInit() {
    if (this.images() && this.images().length > 0) {
      this.activeImage.set(this.images()[0]);
    }
  }

  setActive(img: string) {
    this.activeImage.set(img);
  }
}
