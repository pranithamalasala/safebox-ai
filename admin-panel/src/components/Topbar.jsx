import React from 'react';

const pageTitles = {
  dashboard: 'Dashboard',
  alerts: 'Live Alerts',
  complaints: 'Complaint Management',
  vehicles: 'Vehicle Tracking',
  users: 'User Management',
  map: 'Map View',
  analytics: 'Analytics',
  notifications: 'Notifications',
  evidence: 'Evidence Management',
};

export default function Topbar({ currentPage }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="page-title">{pageTitles[currentPage] || currentPage}</div>
        <span className="badge badge-green" style={{ fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s infinite', display: 'inline-block' }}></span>
          System Online
        </span>
      </div>
      <div className="topbar-right">
        <button className="tb-btn"><span style={{ fontSize: 13 }}>🔔</span> Alerts</button>
        <button className="tb-btn gold"><span style={{ fontSize: 13 }}>🛡</span> Safe Mode ON</button>
        <button className="tb-btn" style={{ width: 36, height: 32, padding: 0, justifyContent: 'center', fontSize: 16 }}>⚙</button>
      </div>
    </div>
  );
}