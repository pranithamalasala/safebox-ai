import React, { useState } from 'react';

export function Badge({ children, variant = 'gold', style }) {
  return (
    <span className={`badge badge-${variant}`} style={style}>
      {children}
    </span>
  );
}

export function StatCard({ icon, iconClass, value, label, change, changeType }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass || ''}`}>{icon}</div>
      <div className="stat-val">{value}</div>
      <div className="stat-lbl">{label}</div>
      {change && <div className={`stat-change ${changeType || 'up'}`}>{change}</div>}
    </div>
  );
}

export function FilterBar({ options, defaultSelected = 0 }) {
  const [selected, setSelected] = useState(defaultSelected);
  return (
    <div className="filters">
      {options.map((opt, i) => (
        <button
          key={i}
          className={`filter-btn${selected === i ? ' sel' : ''}`}
          onClick={() => setSelected(i)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SearchBar({ placeholder }) {
  return (
    <div className="search-wrap">
      <div className="search-icon">🔍</div>
      <input className="search-inp" placeholder={placeholder} />
    </div>
  );
}

export function ActBtn({ children, variant, onClick, style }) {
  return (
    <button
      className={`act-btn${variant ? ` ${variant}` : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ title, sub, right }) {
  return (
    <div className="sec-hdr">
      <div>
        <div className="sec-title">{title}</div>
        {sub && <div className="sec-sub">{sub}</div>}
      </div>
      {right}
    </div>
  );
}