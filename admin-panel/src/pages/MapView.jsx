import React from 'react';
import { StatCard, ActBtn } from '../components/Shared';
import { mapAlertLocations } from '../data';

const badgeStyles = {
  'badge-red': { bg: 'rgba(255,74,107,.12)', col: 'var(--red)' },
  'badge-blue': { bg: 'rgba(74,158,255,.1)', col: 'var(--blue)' },
  'badge-amber': { bg: 'rgba(255,149,0,.1)', col: 'var(--amber)' },
  'badge-green': { bg: 'rgba(0,214,143,.1)', col: 'var(--green)' },
};

function InlineBadge({ cls, children }) {
  const s = badgeStyles[cls] || {};
  return (
    <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.col }}>
      {children}
    </span>
  );
}

export default function MapView() {
  return (
    <>
      <div className="g3" style={{ marginBottom: 14 }}>
        <StatCard icon="🚨" iconClass="red" value="4" label="Active Alerts" />
        <StatCard icon="⚠" value="3" label="Danger Zones" />
        <StatCard icon="📍" iconClass="green" value="12" label="Tracked Locations" />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="map-placeholder" style={{ height: 440 }}>
          <div className="map-grid"></div>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="map-dot red-dot" style={{ left: '42%', top: '38%' }}></div>
            <div className="map-dot red-dot" style={{ left: '55%', top: '30%' }}></div>
            <div className="map-dot amber-dot" style={{ left: '48%', top: '52%' }}></div>
            <div className="map-dot amber-dot" style={{ left: '65%', top: '60%' }}></div>
            <div className="map-dot amber-dot" style={{ left: '35%', top: '22%' }}></div>
            <div className="map-dot green-dot" style={{ left: '30%', top: '55%' }}></div>
            <div className="map-dot green-dot" style={{ left: '70%', top: '40%' }}></div>
            <div className="map-label-badge" style={{ left: '42%', top: '28%', transform: 'translateX(-50%)' }}>Hitech City</div>
            <div className="map-label-badge" style={{ left: '42%', top: '44%', transform: 'translateX(-50%)' }}>Banjara Hills</div>
            <div className="map-label-badge" style={{ left: '52%', top: '57%', transform: 'translateX(-50%)' }}>Jubilee Hills</div>
            <div className="map-label-badge" style={{ left: '68%', top: '65%', transform: 'translateX(-50%)' }}>LB Nagar</div>
          </div>
          <div className="map-overlay">
            <div className="map-legend">
              <div className="ml-item"><div className="ml-dot" style={{ background: 'var(--red)' }}></div>Live Alert</div>
              <div className="ml-item"><div className="ml-dot" style={{ background: 'var(--amber)' }}></div>Suspicious</div>
              <div className="ml-item"><div className="ml-dot" style={{ background: 'var(--green)' }}></div>Cleared</div>
            </div>
            <div className="map-legend" style={{ marginTop: 4 }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>LAYERS</div>
              <div style={{ fontSize: 11, color: 'var(--gold)', marginBottom: 2 }}>✓ Alerts</div>
              <div style={{ fontSize: 11, color: 'var(--gold)', marginBottom: 2 }}>✓ Complaints</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>○ Heatmap</div>
            </div>
          </div>
          <div className="map-controls">
            <button className="mc-btn">+</button>
            <button className="mc-btn">−</button>
            <button className="mc-btn" style={{ fontSize: 12 }}>⊙</button>
          </div>
          <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(8,8,16,.8)', border: '1px solid var(--border2)', borderRadius: 10, padding: '6px 12px', fontSize: 11, color: 'var(--text3)' }}>
            Hyderabad, Telangana · Live Feed
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="sec-hdr" style={{ marginBottom: 10 }}><div className="sec-title">Alert Locations</div></div>
        <table className="tbl">
          <thead>
            <tr><th>Location</th><th>Alert Type</th><th>Time</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {mapAlertLocations.map((row, i) => (
              <tr key={i}>
                <td>📍 {row.loc}</td>
                <td><InlineBadge cls={row.typeCls}>{row.type}</InlineBadge></td>
                <td>{row.time}</td>
                <td><InlineBadge cls={row.statusCls}>{row.statusLabel}</InlineBadge></td>
                <td><ActBtn>{row.action}</ActBtn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}