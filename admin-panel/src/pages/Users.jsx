import React, { useState } from 'react';
import { StatCard, SearchBar, ActBtn } from '../components/Shared';
import { users } from '../data';

const filterOptions = ['All Users', '✅ Verified', '⏳ Pending', '🚫 Blocked', '🔴 Reported'];

export default function Users() {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <div className="g4" style={{ marginBottom: 16 }}>
        <StatCard icon="👥" iconClass="gold" value="2,847" label="Total Users" />
        <StatCard icon="✅" iconClass="green" value="2,741" label="Verified" />
        <StatCard icon="🚫" iconClass="red" value="23" label="Blocked" />
        <StatCard icon="📱" iconClass="blue" value="1,294" label="Active Today" />
      </div>

      <div className="card">
        <div className="sec-hdr"><div className="sec-title">User Management</div></div>

        <div className="filters">
          {filterOptions.map((opt, i) => (
            <button key={i} className={`filter-btn${filter === i ? ' sel' : ''}`} onClick={() => setFilter(i)}>{opt}</button>
          ))}
        </div>

        <SearchBar placeholder="Search by name or phone number…" />

        <table className="tbl">
          <thead>
            <tr>
              <th>User</th><th>Phone</th><th>Emergency Contacts</th><th>Joined</th><th>Reports Filed</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${u.color}22`, border: `1.5px solid ${u.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: u.color }}>{u.name[0]}</div>
                    <span style={{ fontWeight: 500, color: 'var(--text)' }}>{u.name}</span>
                  </div>
                </td>
                <td>{u.phone}</td>
                <td><span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(74,158,255,.1)', color: 'var(--blue)' }}>{u.ec} contacts</span></td>
                <td style={{ color: 'var(--text3)' }}>{u.joined}</td>
                <td><span style={{ fontWeight: 600, color: u.reports > 4 ? 'var(--red)' : u.reports > 1 ? 'var(--amber)' : 'var(--text2)' }}>{u.reports}</span></td>
                <td>
                  <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: u.status === 'active' ? 'rgba(0,214,143,.1)' : 'rgba(255,74,107,.12)', color: u.status === 'active' ? 'var(--green)' : 'var(--red)' }}>
                    {u.status === 'active' ? '✅ Active' : '🚫 Blocked'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <ActBtn>👁 Profile</ActBtn>
                    <ActBtn variant="danger">{u.status === 'active' ? '🚫 Block' : '✓ Unblock'}</ActBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}