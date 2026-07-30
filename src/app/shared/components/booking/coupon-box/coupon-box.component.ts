import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coupon-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="coupon-box card">
      <label for="couponInput">Have a Promo Coupon Code?</label>
      
      <div class="coupon-input-group">
        <input 
          id="couponInput" 
          type="text" 
          [(ngModel)]="code" 
          placeholder="e.g. PINKCITY10"
          [disabled]="appliedCode().length > 0">
          
        @if (appliedCode().length === 0) {
          <button type="button" (click)="apply()" class="btn btn-outline btn-sm">Apply</button>
        } @else {
          <button type="button" (click)="remove()" class="btn btn-sm btn-remove">Remove</button>
        }
      </div>

      @if (msg()) {
        <span class="coupon-msg" [class.success]="appliedCode().length > 0" [class.error]="appliedCode().length === 0">
          {{ msg() }}
        </span>
      }

      <div class="available-offers">
        <span class="offer-lbl">Available Offers:</span>
        <button type="button" (click)="useCode('PINKCITY10')" class="offer-btn">
          PINKCITY10 (10% OFF)
        </button>
        <button type="button" (click)="useCode('KNOTENS200')" class="offer-btn">
          KNOTENS200 (Flat ₹200 OFF)
        </button>
      </div>
    </div>
  `,
  styles: [`
    .coupon-box {
      padding: 1.25rem;
      background: #FFFFFF;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-primary);
        display: block;
        margin-bottom: 0.5rem;
      }
    }
    .coupon-input-group {
      display: flex;
      gap: 0.5rem;

      input {
        flex: 1;
        padding: 0.6rem 0.85rem;
        font-family: var(--font-family);
        font-size: 0.875rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        text-transform: uppercase;
        outline: none;

        &:focus {
          border-color: var(--primary-color);
        }
      }
    }
    .btn-remove {
      background: #FEE2E2;
      color: #DC2626;
      border: 1px solid #FCA5A5;
    }
    .coupon-msg {
      font-size: 0.775rem;
      display: block;
      margin-top: 0.4rem;

      &.success { color: #10B981; }
      &.error { color: #EF4444; }
    }
    .available-offers {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.85rem;

      .offer-lbl { font-size: 0.75rem; color: var(--text-muted); }
    }
    .offer-btn {
      background: var(--accent-light);
      color: var(--accent-dark);
      border: 1px dashed var(--accent-dark);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.725rem;
      font-weight: 700;
      cursor: pointer;
    }
  `]
})
export class CouponBoxComponent {
  readonly appliedCode = input<string>('');
  readonly codeApplied = output<string>();

  code = '';
  readonly msg = signal<string>('');

  useCode(c: string) {
    this.code = c;
    this.apply();
  }

  apply() {
    if (this.code.toUpperCase() === 'PINKCITY10' || this.code.toUpperCase() === 'KNOTENS200') {
      this.msg.set(`Coupon '${this.code.toUpperCase()}' applied successfully!`);
      this.codeApplied.emit(this.code.toUpperCase());
    } else {
      this.msg.set('Invalid promo coupon code.');
      this.codeApplied.emit('');
    }
  }

  remove() {
    this.code = '';
    this.msg.set('');
    this.codeApplied.emit('');
  }
}
