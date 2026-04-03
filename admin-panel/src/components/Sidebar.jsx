import React from 'react';

const navItems = [
  { section: 'Overview' },
  { page: 'dashboard', icon: '⬛', label: 'Dashboard' },
  { section: 'Operations' },
  { page: 'alerts', icon: '🚨', label: 'Live Alerts', badge: '4' },
  { page: 'complaints', icon: '📝', label: 'Complaints', badge: '7' },
  { page: 'vehicles', icon: '🚗', label: 'Vehicles', badge: '12', badgeClass: 'green' },
  { section: 'Management' },
  { page: 'users', icon: '👥', label: 'Users' },
  { page: 'map', icon: '📍', label: 'Map View' },
  { page: 'analytics', icon: '📊', label: 'Analytics' },
  { section: 'Tools' },
  { page: 'notifications', icon: '📩', label: 'Notifications' },
  { page: 'evidence', icon: '📂', label: 'Evidence' },
];

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <div className="sidebar">
      <div className="sb-logo">
        <div className="sb-logobox">
          <svg viewBox="0 0 24 24" fill="#0A0A0F">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        </div>
        <div className="sb-logotxt">Safe<span>Box</span> AI</div>
      </div>

      <div className="sb-admin-badge">
        <div className="sb-admin-dot"></div>
        <div className="sb-admin-txt">Control System</div>
      </div>

      <div className="sb-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return <div key={i} className="sb-section">{item.section}</div>;
          }
          return (
            <div
              key={i}
              className={`sb-item${currentPage === item.page ? ' active' : ''}`}
              onClick={() => onNavigate(item.page)}
            >
              <div className="sb-item-icon">{item.icon}</div>
              <div className="sb-item-label">{item.label}</div>
              {item.badge && (
                <div className={`sb-badge${item.badgeClass ? ` ${item.badgeClass}` : ''}`}>
                  {item.badge}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sb-bottom">
        <div className="sb-user">
          <div className="sb-avatar">A</div>
          <div>
            <div className="sb-uname">Admin Arjun</div>
            <div className="sb-urole">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}