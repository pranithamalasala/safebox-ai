import React, { useState } from 'react';
import { StatCard, SearchBar, ActBtn } from '../components/Shared';
import { vehicles } from '../data';

const filterOptions = ['All', '🚫 Blacklisted', '⚠ Suspicious', '✅ Cleared'];

const statusStyle = {
  blacklisted: { bg: 'rgba(255,74,107,.12)', col: 'var(--red)', label: '🚫 Blacklisted' },
  suspicious: { bg: 'rgba(255,149,0,.1)', col: 'var(--amber)', label: '⚠ Suspicious' },
  cleared: { bg: 'rgba(0,214,143,.1)', col: 'var(--green)', label: '✅ Cleared' },
};

export default function Vehicles() {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <div className="g4" style={{ marginBottom: 16 }}>
        <StatCard icon="🚗" iconClass="blue" value="312" label="Total Detected" />
        <StatCard icon="🚫" iconClass="red" value="18" label="Blacklisted" />
        <StatCard icon="⚠" value="34" label="Suspicious" />
        <StatCard icon="✅" iconClass="green" value="260" label="Cleared" />
      </div>

      <div className="card">
        <div className="sec-hdr"><div className="sec-title">Vehicle Registry</div></div>

        <div className="filters">
          {filterOptions.map((opt, i) => (
            <button key={i} className={`filter-btn${filter === i ? ' sel' : ''}`} onClick={() => setFilter(i)}>{opt}</button>
          ))}
        </div>

        <SearchBar placeholder="Search plate number…" />

        {vehicles.map((v, i) => {
          const s = statusStyle[v.status];
          return (
            <div key={i} className="veh-card">
              <div className="veh-plate-box">{v.plate}</div>
              <div className="veh-info">
                <div className="veh-name">Owner: {v.owner}</div>
                <div className="veh-meta">
                  Linked complaints: {v.complaints} &nbsp;·&nbsp;
                  <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 20, fontSize: 9, fontWeight: 600, background: s.bg, color: s.col }}>{s.label}</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginRight: 8 }}>
                <div className="veh-count">{v.detections}</div>
                <div className="veh-count-lbl">detections</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <ActBtn>👁 View</ActBtn>
                {v.status !== 'blacklisted'
                  ? <ActBtn variant="danger">🚫 Blacklist</ActBtn>
                  : <ActBtn variant="success">✓ Clear</ActBtn>
                }
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}