import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  template: `
    <div class="payment-method-box card">
      <h3 class="box-title">Select Payment Option</h3>

      <div class="methods-grid">
        <label class="method-card card" [class.active]="selectedMethod() === 'pay-to-driver'">
          <input 
            type="radio" 
            name="payMethod" 
            value="pay-to-driver" 
            [checked]="selectedMethod() === 'pay-to-driver'"
            (change)="methodChange.emit('pay-to-driver')">
          <div class="icon-bg"><span class="material-symbols-outlined">payments</span></div>
          <div>
            <strong>Pay Cash / UPI to Driver</strong>
            <p>Zero upfront payment. Pay full fare at the end of trip to driver.</p>
          </div>
          <span class="rec-badge">Popular</span>
        </label>

        <label class="method-card card" [class.active]="selectedMethod() === 'upi-advance'">
          <input 
            type="radio" 
            name="payMethod" 
            value="upi-advance" 
            [checked]="selectedMethod() === 'upi-advance'"
            (change)="methodChange.emit('upi-advance')">
          <div class="icon-bg"><span class="material-symbols-outlined">qr_code_scanner</span></div>
          <div>
            <strong>UPI Advance Payment (Google Pay / PhonePe / Paytm)</strong>
            <p>Pay ₹500 token advance now to guarantee priority cab dispatch.</p>
          </div>
        </label>

        <label class="method-card card" [class.active]="selectedMethod() === 'corporate-billing'">
          <input 
            type="radio" 
            name="payMethod" 
            value="corporate-billing" 
            [checked]="selectedMethod() === 'corporate-billing'"
            (change)="methodChange.emit('corporate-billing')">
          <div class="icon-bg"><span class="material-symbols-outlined">corporate_fare</span></div>
          <div>
            <strong>Corporate Invoice Billing</strong>
            <p>Receive official GST Tax invoice with credit terms for business.</p>
          </div>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .payment-method-box {
      padding: 1.5rem;
      background: #FFFFFF;
    }
    .box-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
    }
    .methods-grid {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .method-card {
      position: relative;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border: 2px solid var(--border-color);
      cursor: pointer;

      input[type="radio"] { display: none; }

      .icon-bg {
        width: 44px;
        height: 44px;
        border-radius: var(--border-radius-sm);
        background: var(--bg-color);
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-symbols-outlined { font-size: 24px; }
      }

      strong {
        font-size: 0.95rem;
        display: block;
        color: var(--text-primary);
      }

      p {
        font-size: 0.775rem;
        color: var(--text-secondary);
        margin: 0;
      }

      .rec-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 0.7rem;
        font-weight: 700;
        background: var(--accent-light);
        color: var(--accent-dark);
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
      }

      &:hover, &.active {
        border-color: var(--primary-color);
        background: var(--primary-light);

        .icon-bg {
          background: var(--primary-color);
          color: #FFFFFF;
        }
      }
    }
  `]
})
export class PaymentMethodComponent {
  readonly selectedMethod = input<string>('pay-to-driver');
  readonly methodChange = output<'pay-to-driver' | 'upi-advance' | 'card' | 'corporate-billing'>();
}
