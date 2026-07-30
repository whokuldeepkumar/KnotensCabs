import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavMenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="admin-sidebar" [class.collapsed]="isCollapsed()">
      <div class="sidebar-brand">
        <div class="logo-icon">
          <span class="material-symbols-outlined">local_taxi</span>
        </div>
        @if (!isCollapsed()) {
          <div class="brand-text">
            <span class="name">KNOTENS <span class="accent">ADMIN</span></span>
            <span class="sub">Jaipur Dispatch Console</span>
          </div>
        }
      </div>

      <nav class="sidebar-nav">
        @for (item of navItems; track item.route) {
          <a 
            [routerLink]="item.route" 
            routerLinkActive="active" 
            class="nav-item"
            [title]="item.label">
            <span class="material-symbols-outlined icon">{{ item.icon }}</span>
            @if (!isCollapsed()) {
              <span class="label">{{ item.label }}</span>
              @if (item.badge) {
                <span class="badge">{{ item.badge }}</span>
              }
            }
          </a>
        }
      </nav>

      <div class="sidebar-footer">
        <button type="button" (click)="toggleCollapse.emit()" class="collapse-toggle-btn">
          <span class="material-symbols-outlined">
            {{ isCollapsed() ? 'chevron_right' : 'chevron_left' }}
          </span>
          @if (!isCollapsed()) {
            <span>Collapse Sidebar</span>
          }
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .admin-sidebar {
      width: 260px;
      height: 100vh;
      background: #0B192C;
      color: #94A3B8;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-right: 1px solid rgba(255, 255, 255, 0.08);

      &.collapsed {
        width: 80px;

        .sidebar-brand {
          justify-content: center;
          padding: 1.25rem 0.5rem;
        }

        .nav-item {
          justify-content: center;
          padding: 0.85rem;
        }
      }
    }
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .logo-icon {
        width: 40px;
        height: 40px;
        background: #1565C0;
        color: #FFFFFF;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .material-symbols-outlined { font-size: 24px; }
      }

      .brand-text {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;

          .accent { color: #FF9800; }
        }

        .sub {
          font-size: 0.7rem;
          color: #64748B;
        }
      }
    }
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      color: #94A3B8;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;

      .icon { font-size: 22px; color: #64748B; }

      .badge {
        margin-left: auto;
        background: #FF9800;
        color: #FFFFFF;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.15rem 0.5rem;
        border-radius: 50px;
      }

      &:hover, &.active {
        background: rgba(21, 101, 192, 0.2);
        color: #FFFFFF;

        .icon { color: #1565C0; }
      }
    }
    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .collapse-toggle-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94A3B8;
      padding: 0.6rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.825rem;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
      }
    }
  `]
})
export class AdminSidebarComponent {
  readonly isCollapsed = input<boolean>(false);
  readonly toggleCollapse = output<void>();

  readonly navItems: NavMenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Bookings', icon: 'book_online', route: '/admin/bookings', badge: '12 New' },
    { label: 'Customers', icon: 'group', route: '/admin/customers' },
    { label: 'Drivers', icon: 'badge', route: '/admin/drivers' },
    { label: 'Vehicles Fleet', icon: 'directions_car', route: '/admin/vehicles' },
    { label: 'Tariffs & Pricing', icon: 'payments', route: '/admin/pricing' },
    { label: 'Routes Manager', icon: 'alt_route', route: '/admin/routes' },
    { label: 'Promo Coupons', icon: 'confirmation_number', route: '/admin/coupons' },
    { label: 'CMS & Banners', icon: 'article', route: '/admin/cms' },
    { label: 'Media Library', icon: 'photo_library', route: '/admin/media' },
    { label: 'Reports', icon: 'summarize', route: '/admin/reports' },
    { label: 'Analytics', icon: 'monitoring', route: '/admin/analytics' },
    { label: 'System Users', icon: 'manage_accounts', route: '/admin/users' },
    { label: 'Roles & Permissions', icon: 'admin_panel_settings', route: '/admin/roles' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' }
  ];
}
