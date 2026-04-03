import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import LiveAlerts from './pages/LiveAlerts';
import Complaints from './pages/Complaints';
import Vehicles from './pages/Vehicles';
import Users from './pages/Users';
import MapView from './pages/MapView';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Evidence from './pages/Evidence';

const pages = {
  dashboard: Dashboard,
  alerts: LiveAlerts,
  complaints: Complaints,
  vehicles: Vehicles,
  users: Users,
  map: MapView,
  analytics: Analytics,
  notifications: Notifications,
  evidence: Evidence,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const PageComponent = pages[currentPage] || Dashboard;

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main">
        <Topbar currentPage={currentPage} />
        <div className="content">
          <PageComponent onNavigate={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}