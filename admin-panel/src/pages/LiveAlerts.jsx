import React, { useState } from 'react';
import { StatCard, FilterBar, ActBtn } from '../components/Shared';
import { allAlerts } from '../data';

export default function LiveAlerts() {
  const [filter, setFilter] = useState(0);
  const filterOptions = ['All', '🚗 Vehicle', '🚨 SOS', '⚠ Suspicious', '✅ Handled'];

  return (
    <>
      <div className="g4" style={{ marginBottom: 16 }}>
        <StatCard icon="🚨" iconClass="red" value="4" label="Active Now" />
        <StatCard icon="⚡" iconClass="" value="28" label="Today Total" style={{ background: 'rgba(255,149,0,.1)' }} />
        <StatCard icon="✅" iconClass="green" value="24" label="Handled" />
        <StatCard icon="⏱" iconClass="blue" value="4.2m" label="Avg Response" />
      </div>

      <div className="card">
        <div className="sec-hdr">
          <div>
            <div className="sec-title">Live Detection Feed</div>
            <div className="sec-sub">Real-time vehicle & incident alerts</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="live-dot"></div>
            <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>

        <div className="filters">
          {filterOptions.map((opt, i) => (
            <button key={i} className={`filter-btn${filter === i ? ' sel' : ''}`} onClick={() => setFilter(i)}>{opt}</button>
          ))}
        </div>

        {allAlerts.map((a, i) => (
          <div key={i} className="alert-row">
            <div className={`alert-pulse ${a.status}`}></div>
            <div className="alert-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div className="alert-plate">{a.plate}</div>
                <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 9, fontWeight: 600, background: a.status === 'live' ? 'rgba(255,74,107,.12)' : 'rgba(0,214,143,.1)', color: a.status === 'live' ? 'var(--red)' : 'var(--green)' }}>{a.status}</span>
                <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 9, fontWeight: 600, background: 'rgba(74,158,255,.1)', color: 'var(--blue)' }}>{a.type}</span>
              </div>
              <div className="alert-meta">📍 {a.loc} · 👤 {a.user} · 🕒 {a.time}</div>
            </div>
            <div className="alert-actions">
              <ActBtn>👁 Details</ActBtn>
              <ActBtn variant="success">📞 Call</ActBtn>
              {a.status === 'live' && (
                <ActBtn style={{ background: 'rgba(0,214,143,.08)', borderColor: 'rgba(0,214,143,.3)', color: 'var(--green)' }}>✓ Handle</ActBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}