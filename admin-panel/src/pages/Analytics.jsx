import React, { useEffect, useRef } from 'react';
import { StatCard } from '../components/Shared';
import { monthlyComplaints, peakHours, incidentTypes } from '../data';

export default function Analytics() {
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const hrRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const Chart = window.Chart;
      if (!Chart) return;

      if (lineRef.current) {
        if (charts.current.line) charts.current.line.destroy();
        charts.current.line = new Chart(lineRef.current, {
          type: 'line',
          data: {
            labels: monthlyComplaints.labels,
            datasets: [{
              label: 'Complaints',
              data: monthlyComplaints.data,
              borderColor: '#F5C842',
              backgroundColor: 'rgba(245,200,66,.08)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#F5C842',
              pointRadius: 4,
            }],
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
      }

      if (pieRef.current) {
        if (charts.current.pie) charts.current.pie.destroy();
        charts.current.pie = new Chart(pieRef.current, {
          type: 'doughnut',
          data: {
            labels: incidentTypes.map(i => i[0]),
            datasets: [{
              data: [32, 28, 18, 14, 8],
              backgroundColor: incidentTypes.map(i => i[1]),
              borderWidth: 0,
              hoverOffset: 4,
            }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '65%',
            plugins: { legend: { display: false } },
          },
        });
      }

      if (hrRef.current) {
        if (charts.current.hr) charts.current.hr.destroy();
        charts.current.hr = new Chart(hrRef.current, {
          type: 'bar',
          data: {
            labels: peakHours.labels,
            datasets: [{
              data: peakHours.data,
              backgroundColor: peakHours.colors,
              borderRadius: 3,
            }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: 'rgba(240,237,230,.4)', font: { size: 10 } } },
              y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: 'rgba(240,237,230,.4)', font: { size: 10 } }, beginAtZero: true },
            },
          },
        });
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      Object.values(charts.current).forEach(c => { try { c.destroy(); } catch (e) {} });
    };
  }, []);

  return (
    <>
      <div className="g4" style={{ marginBottom: 16 }}>
        <StatCard icon="📈" iconClass="blue" value="+41%" label="MoM Growth" />
        <StatCard icon="🚨" iconClass="red" value="8:30pm" label="Peak Alert Time" />
        <StatCard icon="📊" iconClass="gold" value="4.1" label="Avg/Day Complaints" />
        <StatCard icon="✅" iconClass="green" value="78%" label="Resolution Rate" />
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="sec-hdr">
          <div>
            <div className="sec-title">Complaints Per Month</div>
            <div className="sec-sub">2026 annual trend</div>
          </div>
        </div>
        <div className="chart-wrap"><canvas ref={lineRef}></canvas></div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="sec-hdr" style={{ marginBottom: 10 }}><div className="sec-title">Incident Types</div></div>
          <div style={{ display: 'flex', justifyContent: 'center', height: 160, marginBottom: 12 }}>
            <canvas ref={pieRef}></canvas>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {incidentTypes.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text2)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: item[1], display: 'inline-block' }}></span>
                {item[0]} {item[2]}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="sec-hdr" style={{ marginBottom: 10 }}><div className="sec-title">Peak Unsafe Hours</div></div>
          <div className="mini-chart-wrap"><canvas ref={hrRef}></canvas></div>
          <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: 'rgba(255,74,107,.12)', color: 'var(--red)' }}>🔴 Highest: 8pm–10pm</span>
            <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: 'rgba(255,149,0,.1)', color: 'var(--amber)' }}>🟡 Moderate: 4pm–6pm</span>
            <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: 'rgba(0,214,143,.1)', color: 'var(--green)' }}>🟢 Safe: 2am–6am</span>
          </div>
        </div>
      </div>
    </>
  );
}