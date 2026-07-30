import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="admin-login-page">
      <div class="login-card card">
        <div class="brand-header text-center">
          <div class="logo-box">
            <span class="material-symbols-outlined icon">local_taxi</span>
          </div>
          <h1>Knotens Cabs Admin</h1>
          <p>Jaipur Central Dispatch & Portal</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <label for="username">Username / Email</label>
            <input id="username" type="text" formControlName="username" placeholder="admin@knotens.cabs">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" placeholder="••••••••">
          </div>

          <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary btn-lg w-full">
            @if (isSubmitting()) {
              <span>Logging in...</span>
            } @else {
              <span>Login to Dispatch Console</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            }
          </button>
        </form>

        <div class="login-footer text-center">
          <span class="secure-badge">
            <span class="material-symbols-outlined icon">lock</span> 256-Bit SSL Encrypted Session
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #0B192C 0%, #1E293B 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .login-card {
      width: 100%;
      max-width: 440px;
      padding: 2.5rem 2rem;
      background: #FFFFFF;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .brand-header {
      margin-bottom: 2rem;

      .logo-box {
        width: 56px;
        height: 56px;
        background: var(--primary-color);
        color: #FFFFFF;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;

        .icon { font-size: 32px; }
      }

      h1 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
      p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }

      input {
        width: 100%;
        padding: 0.75rem 0.85rem;
        font-family: var(--font-family);
        font-size: 0.9rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        outline: none;

        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
        }
      }
    }
    .w-full { width: 100%; }
    .login-footer {
      margin-top: 2rem;

      .secure-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.775rem;
        color: var(--text-muted);

        .icon { font-size: 16px; color: #10B981; }
      }
    }
  `]
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly isSubmitting = signal<boolean>(false);

  readonly loginForm = this.fb.group({
    username: ['admin@knotens.cabs', [Validators.required]],
    password: ['admin123', [Validators.required]]
  });

  onLogin() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/dashboard']);
    }, 600);
  }
}
