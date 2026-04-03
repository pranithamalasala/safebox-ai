import React, { useState } from 'react';
import { StatCard, SearchBar, ActBtn } from '../components/Shared';
import { complaints } from '../data';

const statusStyle = {
  pending: { bg: 'rgba(255,149,0,.1)', col: 'var(--amber)', label: '🟡 Pending' },
  inprogress: { bg: 'rgba(74,158,255,.1)', col: 'var(--blue)', label: '🔵 In Progress' },
  resolved: { bg: 'rgba(0,214,143,.1)', col: 'var(--green)', label: '🟢 Resolved' },
};

const filterOptions = ['All Status', '🟡 Pending', '🔵 In Progress', '🟢 Resolved', 'Harassment', 'Theft', 'Rash Driving'];

export default function Complaints() {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <div className="g3" style={{ marginBottom: 16 }}>
        <StatCard icon="🟡" value="42" label="Pending" />
        <StatCard icon="🔵" iconClass="blue" value="38" label="In Progress" />
        <StatCard icon="🟢" iconClass="green" value="47" label="Resolved" />
      </div>

      <div className="card">
        <div className="sec-hdr"><div className="sec-title">Complaint List</div></div>

        <div className="filters">
          {filterOptions.map((opt, i) => (
            <button key={i} className={`filter-btn${filter === i ? ' sel' : ''}`} onClick={() => setFilter(i)}>{opt}</button>
          ))}
        </div>

        <SearchBar placeholder="Search complaints by ID, user, or description…" />

        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th><th>User</th><th>Type</th><th>Location</th><th>Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => {
              const s = statusStyle[c.status];
              return (
                <tr key={i}>
                  <td><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>{c.id}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--gold)' }}>{c.user[0]}</div>
                      {c.user}
                    </div>
                  </td>
                  <td><span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(155,127,255,.1)', color: 'var(--purple)' }}>{c.type}</span></td>
                  <td>📍 {c.loc}</td>
                  <td>{c.date}</td>
                  <td><span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.col }}>{s.label}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <ActBtn>View</ActBtn>
                      <ActBtn variant="success">Update</ActBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}