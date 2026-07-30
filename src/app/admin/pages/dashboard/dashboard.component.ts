import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-page flex-column gap-4">
      <div class="page-title-bar flex justify-between items-center">
        <div>
          <h2>Jaipur Dispatch Dashboard</h2>
          <p class="sub">Live overview of bookings, driver assignments, and revenue.</p>
        </div>
        <div class="date-badge card">
          <span class="material-symbols-outlined icon">calendar_today</span>
          <span>Today: {{ todayDate }}</span>
        </div>
      </div>

      <!-- Stat Cards Grid -->
      <div class="stats-grid">
        <div class="stat-card card">
          <div class="icon-bg blue"><span class="material-symbols-outlined">book_online</span></div>
          <div>
            <span class="label">Today's Bookings</span>
            <strong class="value">48 Rides</strong>
            <span class="trend up">+14% vs yesterday</span>
          </div>
        </div>

        <div class="stat-card card">
          <div class="icon-bg orange"><span class="material-symbols-outlined">pending_actions</span></div>
          <div>
            <span class="label">Pending Dispatch</span>
            <strong class="value">6 Trips</strong>
            <span class="trend neutral">Needs driver assignment</span>
          </div>
        </div>

        <div class="stat-card card">
          <div class="icon-bg green"><span class="material-symbols-outlined">payments</span></div>
          <div>
            <span class="label">Today's Revenue</span>
            <strong class="value">₹84,500</strong>
            <span class="trend up">+22% growth</span>
          </div>
        </div>

        <div class="stat-card card">
          <div class="icon-bg purple"><span class="material-symbols-outlined">local_taxi</span></div>
          <div>
            <span class="label">Active Cabs On Road</span>
            <strong class="value">32 Vehicles</strong>
            <span class="trend up">92% Fleet utilization</span>
          </div>
        </div>
      </div>

      <!-- Recent Bookings Table -->
      <div class="recent-table-card card">
        <div class="table-header flex justify-between items-center">
          <h3>Live Booking Feed</h3>
          <button class="btn btn-outline btn-sm">View All Bookings</button>
        </div>

        <div class="table-responsive mt-3">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Passenger</th>
                <th>Trip Category</th>
                <th>Pickup → Drop</th>
                <th>Date & Time</th>
                <th>Fare</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              @for (b of recentBookings; track b.id) {
                <tr>
                  <td><strong>{{ b.id }}</strong></td>
                  <td>{{ b.name }} ({{ b.phone }})</td>
                  <td><span class="cat-tag">{{ b.category }}</span></td>
                  <td>{{ b.route }}</td>
                  <td>{{ b.dateTime }}</td>
                  <td><strong class="price">₹{{ b.fare }}</strong></td>
                  <td><span class="status-badge" [class]="b.statusClass">{{ b.status }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .page-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0; }
      .sub { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
    }
    .date-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.85rem;
      background: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;

      @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 640px) { grid-template-columns: 1fr; }
    }
    .stat-card {
      padding: 1.25rem;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon-bg {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;

        &.blue { background: #1565C0; }
        &.orange { background: #FF9800; }
        &.green { background: #10B981; }
        &.purple { background: #8B5CF6; }

        .material-symbols-outlined { font-size: 26px; }
      }

      .label { font-size: 0.8rem; color: var(--text-muted); display: block; }
      .value { font-size: 1.35rem; font-weight: 800; color: var(--text-primary); display: block; }
      .trend { font-size: 0.725rem; font-weight: 600; &.up { color: #10B981; } &.neutral { color: #F59E0B; } }
    }
    .recent-table-card {
      padding: 1.5rem;
      background: #FFFFFF;

      h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
    }
    .table-responsive { overflow-x: auto; }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th {
        background: var(--bg-color);
        color: var(--text-secondary);
        padding: 0.75rem 1rem;
        font-weight: 700;
        text-align: left;
      }

      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--border-color);
      }
    }
    .cat-tag {
      background: var(--primary-light);
      color: var(--primary-color);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
    }
    .price { color: var(--primary-color); font-weight: 800; }
    .status-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 50px;

      &.confirmed { background: #ECFDF5; color: #047857; }
      &.pending { background: #FEF3C7; color: #B45309; }
      &.completed { background: #EFF6FF; color: #1D4ED8; }
    }
  `]
})
export class AdminDashboardComponent {
  readonly todayDate = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  readonly recentBookings = [
    { id: 'KC-849102', name: 'Vikram Singh', phone: '9829012345', category: 'Airport Drop', route: 'Malviya Nagar → Jaipur Airport T2', dateTime: 'Today, 04:30 PM', fare: '799', status: 'Confirmed', statusClass: 'confirmed' },
    { id: 'KC-849101', name: 'Ananya Sharma', phone: '9829098765', category: 'One Way', route: 'Jaipur → Ajmer Dargah', dateTime: 'Today, 05:00 PM', fare: '1799', status: 'Pending', statusClass: 'pending' },
    { id: 'KC-849100', name: 'Rajesh Gupta', phone: '9829055443', category: 'Local 8H', route: 'C-Scheme Sightseeing', dateTime: 'Today, 09:00 AM', fare: '2000', status: 'Completed', statusClass: 'completed' }
  ];
}
