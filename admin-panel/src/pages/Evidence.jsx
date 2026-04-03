import React, { useState } from 'react';
import { StatCard, ActBtn } from '../components/Shared';
import { evidenceFiles } from '../data';

const filterOptions = ['All', '🖼 Images', '🎥 Videos', '📸 Detections', 'Apr 2026'];

export default function Evidence() {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <div className="g4" style={{ marginBottom: 16 }}>
        <StatCard icon="🖼" iconClass="blue" value="284" label="Images" />
        <StatCard icon="🎥" value="47" label="Videos" />
        <StatCard icon="📸" iconClass="gold" value="128" label="Detection Shots" />
        <StatCard icon="💾" iconClass="green" value="12.4 GB" label="Storage Used" />
      </div>

      <div className="card">
        <div className="sec-hdr">
          <div className="sec-title">Evidence Vault</div>
          <ActBtn style={{ padding: '6px 14px' }}>⬆ Upload</ActBtn>
        </div>

        <div className="filters">
          {filterOptions.map((opt, i) => (
            <button key={i} className={`filter-btn${filter === i ? ' sel' : ''}`} onClick={() => setFilter(i)}>{opt}</button>
          ))}
        </div>

        <div className="ev-grid">
          {evidenceFiles.map((e, i) => (
            <div key={i} className="ev-item">
              <div className="ev-thumb">{e.emoji}</div>
              <div className="ev-info">
                <div className="ev-name">{e.name}</div>
                <div className="ev-date">{e.date}</div>
              </div>
              <div className="ev-type">{e.type}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
          <ActBtn style={{ padding: '7px 20px' }}>← Prev</ActBtn>
          <span style={{ fontSize: 12, color: 'var(--text3)', padding: '7px 12px' }}>Page 1 of 36</span>
          <ActBtn style={{ padding: '7px 20px' }}>Next →</ActBtn>
        </div>
      </div>
    </>
  );
}