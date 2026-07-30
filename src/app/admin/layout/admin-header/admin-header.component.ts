import { Component, input, output, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="admin-header">
      <div class="header-left">
        <button type="button" (click)="toggleSidebar.emit()" class="icon-btn" aria-label="Toggle Navigation">
          <span class="material-symbols-outlined">menu</span>
        </button>

        <div class="search-box">
          <span class="material-symbols-outlined icon">search</span>
          <input type="text" placeholder="Search Bookings, Drivers, Customers (Press '/' to focus)...">
        </div>
      </div>

      <div class="header-right">
        <!-- Quick Action Badge -->
        <a routerLink="/admin/bookings" class="quick-action-badge">
          <span class="pulse-dot"></span>
          <span>Dispatch Active</span>
        </a>

        <!-- Notifications Menu Toggle -->
        <div class="menu-dropdown-wrapper">
          <button type="button" (click)="showNotifications.set(!showNotifications())" class="icon-btn notification-btn">
            <span class="material-symbols-outlined">notifications</span>
            <span class="notif-count">4</span>
          </button>

          @if (showNotifications()) {
            <div class="dropdown-card card animate-fade-in">
              <div class="dropdown-header">
                <strong>Dispatch Notifications</strong>
                <span class="mark-read">Mark all read</span>
              </div>
              <div class="notif-list">
                <div class="notif-item">
                  <span class="material-symbols-outlined icon green">local_taxi</span>
                  <div>
                    <strong>New Booking #KC-9812</strong>
                    <p>Jaipur Airport drop requested for 04:30 PM</p>
                  </div>
                </div>
                <div class="notif-item">
                  <span class="material-symbols-outlined icon orange">badge</span>
                  <div>
                    <strong>Driver Assigned</strong>
                    <p>Vikram Singh assigned to trip #KC-9810</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Profile Menu -->
        <div class="menu-dropdown-wrapper">
          <button type="button" (click)="showProfile.set(!showProfile())" class="profile-btn">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Admin Avatar" class="avatar">
            <div class="profile-info">
              <span class="name">Admin Manager</span>
              <span class="role">Super Administrator</span>
            </div>
            <span class="material-symbols-outlined icon">arrow_drop_down</span>
          </button>

          @if (showProfile()) {
            <div class="dropdown-card card profile-dropdown animate-fade-in">
              <a routerLink="/admin/settings" class="dropdown-item">
                <span class="material-symbols-outlined">settings</span> System Settings
              </a>
              <a routerLink="/admin/users" class="dropdown-item">
                <span class="material-symbols-outlined">manage_accounts</span> User Management
              </a>
              <div class="divider"></div>
              <button type="button" (click)="logout()" class="dropdown-item logout">
                <span class="material-symbols-outlined">logout</span> Logout
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .admin-header {
      height: 70px;
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.75rem;
      position: sticky;
      top: 0;
      z-index: 900;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex: 1;
      max-width: 550px;
    }
    .icon-btn {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary);
      cursor: pointer;

      &:hover {
        background: var(--primary-light);
        color: var(--primary-color);
      }
    }
    .search-box {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;

      .icon {
        position: absolute;
        left: 12px;
        color: var(--text-muted);
        font-size: 20px;
      }

      input {
        width: 100%;
        padding: 0.6rem 0.85rem 0.6rem 2.4rem;
        font-family: var(--font-family);
        font-size: 0.875rem;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-full);
        outline: none;

        &:focus {
          border-color: var(--primary-color);
          background: #FFFFFF;
        }
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .quick-action-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #ECFDF5;
      color: #047857;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: 50px;
      text-decoration: none;
      border: 1px solid #A7F3D0;

      .pulse-dot {
        width: 8px;
        height: 8px;
        background: #10B981;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
      }
    }
    .menu-dropdown-wrapper {
      position: relative;
    }
    .notification-btn {
      position: relative;

      .notif-count {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #EF4444;
        color: #FFFFFF;
        font-size: 0.65rem;
        font-weight: 800;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .dropdown-card {
      position: absolute;
      top: 50px;
      right: 0;
      width: 320px;
      background: #FFFFFF;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      padding: 1rem;
      z-index: 1000;
    }
    .dropdown-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      margin-bottom: 0.85rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);

      .mark-read { color: var(--primary-color); font-size: 0.75rem; cursor: pointer; }
    }
    .notif-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .notif-item {
      display: flex;
      gap: 0.75rem;
      font-size: 0.8rem;

      .icon {
        font-size: 20px;
        &.green { color: #10B981; }
        &.orange { color: #F59E0B; }
      }

      strong { font-size: 0.85rem; color: var(--text-primary); display: block; }
      p { color: var(--text-secondary); margin: 0; }
    }
    .profile-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: none;
      border: none;
      cursor: pointer;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .profile-info {
        text-align: left;
        @media (max-width: 640px) { display: none; }

        .name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); display: block; }
        .role { font-size: 0.725rem; color: var(--text-muted); }
      }
    }
    .profile-dropdown {
      width: 220px;
      padding: 0.5rem;

      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 0.85rem;
        font-size: 0.875rem;
        color: var(--text-primary);
        text-decoration: none;
        border-radius: 6px;
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;

        .material-symbols-outlined { font-size: 20px; color: var(--text-muted); }

        &:hover {
          background: var(--primary-light);
          color: var(--primary-color);
          .material-symbols-outlined { color: var(--primary-color); }
        }

        &.logout {
          color: #EF4444;
          .material-symbols-outlined { color: #EF4444; }
          &:hover { background: #FEE2E2; }
        }
      }

      .divider {
        height: 1px;
        background: var(--border-color);
        margin: 0.4rem 0;
      }
    }
  `]
})
export class AdminHeaderComponent {
  readonly isSidebarCollapsed = input<boolean>(false);
  readonly toggleSidebar = output<void>();

  readonly showNotifications = signal<boolean>(false);
  readonly showProfile = signal<boolean>(false);

  private router = inject(Router);

  logout() {
    this.showProfile.set(false);
    this.router.navigate(['/admin/login']);
  }
}
