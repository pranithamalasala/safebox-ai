import React, { useState } from 'react';
import { StatCard } from '../components/Shared';
import { notifications } from '../data';

export default function Notifications() {
  const [ntType, setNtType] = useState(0);
  const ntOptions = ['📩 Direct', '📢 Broadcast', '🚨 Emergency'];

  return (
    <>
      <div className="g3" style={{ marginBottom: 16 }}>
        <StatCard icon="📤" iconClass="gold" value="847" label="Sent Today" />
        <StatCard icon="✅" iconClass="green" value="94%" label="Delivery Rate" />
        <StatCard icon="🚨" iconClass="red" value="3" label="Emergency Broadcasts" />
      </div>

      <div className="g2">
        <div className="card">
          <div className="sec-hdr" style={{ marginBottom: 14 }}><div className="sec-title">Compose Notification</div></div>

          <div className="notif-type">
            {ntOptions.map((opt, i) => (
              <button key={i} className={`nt-btn${ntType === i ? ' sel' : ''}`} onClick={() => setNtType(i)}>{opt}</button>
            ))}
          </div>

          <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.5px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Recipients</label>
          <input className="search-inp" style={{ marginBottom: 12 }} placeholder="Search users or select group…" />

          <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.5px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
          <textarea className="notif-ta" placeholder="Type your message here…"></textarea>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            <button className="send-btn">📤 Send Now</button>
            <button className="act-btn" style={{ padding: '10px 14px' }}>⏰ Schedule</button>
          </div>
        </div>

        <div className="card">
          <div className="sec-hdr" style={{ marginBottom: 12 }}><div className="sec-title">Recent Notifications</div></div>
          {notifications.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border2)' }}>
              <div style={{ fontSize: 20 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{n.title}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{n.time} · {n.reach.toLocaleString()} reached</div>
              </div>
              <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 9, fontWeight: 600, background: n.bg, color: n.col }}>{n.type}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}