import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent, AdminHeaderComponent],
  template: `
    <div class="admin-layout-wrapper" [class.sidebar-collapsed]="isSidebarCollapsed()">
      <app-admin-sidebar 
        [isCollapsed]="isSidebarCollapsed()" 
        (toggleCollapse)="toggleSidebar()">
      </app-admin-sidebar>

      <div class="admin-main-container">
        <app-admin-header 
          [isSidebarCollapsed]="isSidebarCollapsed()" 
          (toggleSidebar)="toggleSidebar()">
        </app-admin-header>

        <main class="admin-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: #F1F5F9;
    }
    .admin-main-container {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .sidebar-collapsed .admin-main-container {
      margin-left: 80px;
    }
    .admin-content {
      flex: 1;
      padding: 2rem;

      @media (max-width: 768px) {
        padding: 1.25rem;
      }
    }
  `]
})
export class AdminLayoutComponent {
  readonly isSidebarCollapsed = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update(val => !val);
  }
}
