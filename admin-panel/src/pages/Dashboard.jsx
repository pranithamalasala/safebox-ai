import React, { useEffect, useRef } from 'react';
import { StatCard, SectionHeader, ActBtn } from '../components/Shared';
import { recentAlerts, topZones, blacklistedVehicles, systemStatus, dashboardBarData } from '../data';

export default function Dashboard({ onNavigate }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!chartRef.current) return;
      if (chartInstance.current) chartInstance.current.destroy();
      const Chart = window.Chart;
      if (!Chart) return;
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: dashboardBarData.labels,
          datasets: [
            { label: 'Alerts', data: dashboardBarData.alerts, backgroundColor: 'rgba(255,74,107,.7)', borderRadius: 4, barPercentage: 0.6 },
            { label: 'Complaints', data: dashboardBarData.complaints, backgroundColor: 'rgba(245,200,66,.55)', borderRadius: 4, barPercentage: 0.6 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: 'rgba(240,237,230,.4)', font: { size: 11 } } },
            y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: 'rgba(240,237,230,.4)', font: { size: 11 } }, beginAtZero: true },
          },
        },
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      <div className="g4">
        <StatCard icon="👥" iconClass="gold" value="2,847" label="Total Users" change="+12%" changeType="up" />
        <StatCard icon="🚨" iconClass="red" value="4" label="Active Alerts" change="Live" changeType="down" />
        <StatCard icon="📝" iconClass="blue" value="127" label="Complaints" change="+8%" changeType="up" />
        <StatCard icon="🚗" iconClass="green" value="312" label="Vehicles Detected" change="+23%" changeType="up" />
      </div>

      <div className="g21">
        <div className="card">
          <div className="sec-hdr">
            <div>
              <div className="sec-title">Daily Activity</div>
              <div className="sec-sub">This week's alerts & complaints</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text3)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#FF4A6B', display: 'inline-block' }}></span>Alerts
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text3)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(245,200,66,.55)', display: 'inline-block' }}></span>Complaints
              </span>
            </div>
          </div>
          <div className="chart-wrap"><canvas ref={chartRef}></canvas></div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sec-hdr" style={{ marginBottom: 12 }}>
            <div className="sec-title">Recent Alerts</div>
            <span className="badge badge-red">4 live</span>
          </div>
          {recentAlerts.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border2)' }}>
              <div className={`alert-pulse ${a.status}`}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{a.plate}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{a.loc} · {a.time}</div>
              </div>
              <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 9, fontWeight: 600, background: a.status === 'live' ? 'rgba(255,74,107,.12)' : 'rgba(0,214,143,.1)', color: a.status === 'live' ? 'var(--red)' : 'var(--green)' }}>
                {a.status}
              </span>
            </div>
          ))}
          <div className="mt8">
            <ActBtn style={{ width: '100%', textAlign: 'center' }} onClick={() => onNavigate('alerts')}>View all alerts →</ActBtn>
          </div>
        </div>
      </div>

      <div className="g3">
        <div className="card">
          <SectionHeader title="Top Complaint Zones" />
          {topZones.map((z, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border2)', fontSize: 12 }}>
              <span style={{ color: 'var(--text2)' }}>{z[2]} {z[0]}</span>
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>{z[1]}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <SectionHeader title="Blacklisted Vehicles" />
          {blacklistedVehicles.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border2)' }}>
              <div style={{ background: 'rgba(255,74,107,.08)', border: '1px solid rgba(255,74,107,.25)', borderRadius: 7, padding: '4px 8px', fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 800, color: 'var(--red)' }}>{v[0]}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{v[1]}</div>
            </div>
          ))}
          <div className="mt8">
            <ActBtn style={{ width: '100%', textAlign: 'center' }} onClick={() => onNavigate('vehicles')}>View all →</ActBtn>
          </div>
        </div>

        <div className="card">
          <SectionHeader title="System Status" />
          {systemStatus.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border2)', fontSize: 12 }}>
              <span style={{ color: 'var(--text2)' }}>{s[0]}</span>
              <span>{s[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}