import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .root { background: #080810; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #F0EDE6; }

  /* INPUTS */
  .lbl { display: block; font-size: 11px; font-weight: 600; letter-spacing: .6px; text-transform: uppercase; color: rgba(240,237,230,.38); margin-bottom: 7px; }
  .inp { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(245,200,66,.14); border-radius: 14px; padding: 13px 16px; color: #F0EDE6; font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border-color .2s; margin-bottom: 14px; }
  .inp:focus { border-color: rgba(245,200,66,.5); background: rgba(245,200,66,.03); }
  .inp::placeholder { color: rgba(240,237,230,.2); }
  .textarea { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(245,200,66,.14); border-radius: 14px; padding: 13px 16px; color: #F0EDE6; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; resize: none; height: 90px; transition: border-color .2s; }
  .textarea:focus { border-color: rgba(245,200,66,.5); }
  .textarea::placeholder { color: rgba(240,237,230,.2); }

  /* GOLD BUTTON */
  .gold-btn { width: 100%; padding: 15px; background: linear-gradient(135deg,#F5C842,#C88A00); border: none; border-radius: 14px; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #0A0A0F; cursor: pointer; box-shadow: 0 4px 22px rgba(245,200,66,.28); transition: transform .15s, box-shadow .15s; }
  .gold-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(245,200,66,.4); }

  /* GLASS CARD */
  .glass { background: linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.02)); border: 1px solid rgba(245,200,66,.17); border-radius: 24px; padding: 22px 20px; margin-bottom: 14px; position: relative; overflow: hidden; }
  .glass::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(245,200,66,.4),transparent); }

  /* ── LOGIN ── */
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px 16px; background: #080810; }
  .login-card { width: 100%; max-width: 390px; background: linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02)); border: 1px solid rgba(245,200,66,.22); border-radius: 28px; padding: 40px 34px; box-shadow: 0 0 70px rgba(245,200,66,.07), 0 40px 80px rgba(0,0,0,.65); position: relative; overflow: hidden; }
  .login-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(245,200,66,.55),transparent); }
  .login-logo { display: flex; align-items: center; gap: 11px; justify-content: center; margin-bottom: 30px; }
  .logo-box { width: 44px; height: 44px; border-radius: 13px; background: linear-gradient(135deg,#F5C842,#B87800); display: flex; align-items: center; justify-content: center; }
  .logo-name { font-family: 'Syne', sans-serif; font-size: 23px; font-weight: 800; color: #F0EDE6; }
  .logo-name span { color: #F5C842; }
  .login-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #F0EDE6; text-align: center; margin-bottom: 4px; }
  .login-sub { font-size: 13px; color: rgba(240,237,230,.38); text-align: center; margin-bottom: 28px; }
  .forgot-row { text-align: right; margin: -6px 0 18px; }
  .forgot-link { font-size: 12px; color: #F5C842; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 18px 0; color: rgba(240,237,230,.22); font-size: 12px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,.07); }
  .google-btn { width: 100%; padding: 13px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; color: #F0EDE6; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background .2s; }
  .google-btn:hover { background: rgba(255,255,255,.07); }
  .g-circle { width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
  .switch-txt { text-align: center; font-size: 13px; color: rgba(240,237,230,.35); margin-top: 20px; }
  .switch-link { color: #F5C842; cursor: pointer; font-weight: 500; background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; }

  /* ── DASHBOARD ── */
  .dash-wrap { background: #080810; min-height: 100vh; padding: 28px 16px 50px; }
  .dash-inner { max-width: 440px; margin: 0 auto; }
  .dash-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .dt-greet { font-size: 13px; color: rgba(240,237,230,.38); }
  .dt-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #F0EDE6; }
  .dt-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#F5C842,#C88A00); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; color: #0A0A0F; }

  .stats { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; margin-bottom: 22px; }
  .stat { background: linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.02)); border: 1px solid rgba(245,200,66,.14); border-radius: 20px; padding: 18px 14px; position: relative; overflow: hidden; }
  .stat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(245,200,66,.28),transparent); }
  .stat-n { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; line-height: 1; }
  .stat-l { font-size: 11px; color: rgba(240,237,230,.38); margin-top: 5px; font-weight: 500; }
  .stat-bar { height: 3px; border-radius: 2px; margin-top: 10px; }

  /* HERO BUTTON */
  .hero-wrap { position: relative; margin-bottom: 22px; border-radius: 28px; padding: 32px 24px 28px; background: linear-gradient(145deg,rgba(245,200,66,.12),rgba(200,138,0,.06)); border: 1px solid rgba(245,200,66,.32); overflow: hidden; }
  .hero-wrap::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle,rgba(245,200,66,.13) 0%,transparent 70%); }
  .hero-wrap::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(245,200,66,.6),transparent); }
  .hero-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: .7px; text-transform: uppercase; color: rgba(245,200,66,.6); margin-bottom: 6px; position: relative; z-index: 1; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #F0EDE6; margin-bottom: 22px; line-height: 1.3; position: relative; z-index: 1; }
  .hero-btn { position: relative; z-index: 1; width: 100%; padding: 20px 24px; background: linear-gradient(135deg,#FFD740 0%,#F5C842 40%,#C88A00 100%); border: none; border-radius: 18px; font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #0A0A0F; cursor: pointer; letter-spacing: .2px; display: flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 0 0 1px rgba(245,200,66,.4), 0 4px 0 rgba(0,0,0,.4), 0 8px 32px rgba(245,200,66,.45), 0 20px 60px rgba(245,200,66,.22), 0 0 80px rgba(245,200,66,.12); transition: transform .15s, box-shadow .15s; }
  .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(245,200,66,.5), 0 6px 0 rgba(0,0,0,.35), 0 12px 40px rgba(245,200,66,.55), 0 28px 70px rgba(245,200,66,.28), 0 0 100px rgba(245,200,66,.18); }
  .hero-btn:active { transform: translateY(1px); }
  .hero-btn-icon { width: 22px; height: 22px; background: rgba(0,0,0,.18); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .hero-hint { position: relative; z-index: 1; text-align: center; font-size: 11px; color: rgba(240,237,230,.3); margin-top: 12px; }

  .panel { background: linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.02)); border: 1px solid rgba(255,255,255,.07); border-radius: 22px; padding: 20px; margin-bottom: 14px; }
  .panel-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .panel-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #F0EDE6; }
  .see-all { font-size: 12px; color: #F5C842; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }

  .quick-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; }
  .qb { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all .2s; border: none; font-family: 'DM Sans', sans-serif; }
  .qb:hover { background: rgba(245,200,66,.06); }
  .qb-lbl { font-size: 11px; color: rgba(240,237,230,.42); font-weight: 500; margin-top: 8px; }

  .cr { display: flex; align-items: center; gap: 13px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.05); }
  .cr:last-child { border-bottom: none; padding-bottom: 0; }
  .cr-ic { width: 36px; height: 36px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .ic-open { background: rgba(255,74,107,.12); border: 1px solid rgba(255,74,107,.2); }
  .ic-pend { background: rgba(245,200,66,.1); border: 1px solid rgba(245,200,66,.22); }
  .ic-done { background: rgba(0,214,143,.1); border: 1px solid rgba(0,214,143,.2); }
  .cr-info { flex: 1; }
  .cr-title { font-size: 13px; font-weight: 500; color: #F0EDE6; margin-bottom: 2px; }
  .cr-date { font-size: 11px; color: rgba(240,237,230,.32); }
  .badge { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: .3px; }
  .b-open { background: rgba(255,74,107,.13); color: #FF4A6B; border: 1px solid rgba(255,74,107,.28); }
  .b-pend { background: rgba(245,200,66,.11); color: #F5C842; border: 1px solid rgba(245,200,66,.28); }
  .b-done { background: rgba(0,214,143,.1); color: #00D68F; border: 1px solid rgba(0,214,143,.22); }

  /* ── COMPLAINT ── */
  .comp-wrap { background: #080810; min-height: 100vh; padding: 28px 16px 50px; }
  .comp-inner { max-width: 440px; margin: 0 auto; }
  .comp-back { display: flex; align-items: center; gap: 8px; cursor: pointer; color: rgba(240,237,230,.45); font-size: 14px; margin-bottom: 22px; background: none; border: none; font-family: 'DM Sans', sans-serif; padding: 0; }
  .comp-back:hover { color: #F5C842; }
  .comp-hdr-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #F0EDE6; margin-bottom: 4px; }
  .comp-hdr-sub { font-size: 13px; color: rgba(240,237,230,.35); margin-bottom: 22px; }
  .fc-title { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: rgba(240,237,230,.4); letter-spacing: .5px; text-transform: uppercase; margin-bottom: 14px; }

  .prio-row { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 8px; }
  .pp { padding: 9px 4px; border-radius: 13px; border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.04); text-align: center; font-size: 12px; color: rgba(240,237,230,.4); cursor: pointer; font-weight: 500; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .pp-low { background: rgba(0,214,143,.1); border-color: rgba(0,214,143,.3); color: #00D68F; }
  .pp-med { background: rgba(245,200,66,.1); border-color: rgba(245,200,66,.3); color: #F5C842; }
  .pp-high { background: rgba(255,74,107,.12); border-color: rgba(255,74,107,.3); color: #FF4A6B; }

  .upload-box { border: 1.5px dashed rgba(245,200,66,.22); border-radius: 16px; padding: 22px 16px; text-align: center; cursor: pointer; background: rgba(245,200,66,.02); transition: all .2s; }
  .upload-box:hover { background: rgba(245,200,66,.05); border-color: rgba(245,200,66,.4); }
  .ub-t { font-size: 13px; color: rgba(240,237,230,.38); }
  .ub-t strong { color: #F5C842; }
  .ub-hint { font-size: 11px; color: rgba(240,237,230,.2); margin-top: 4px; }

  .loc-row { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,.04); border: 1px solid rgba(245,200,66,.14); border-radius: 14px; padding: 13px 15px; cursor: pointer; transition: all .2s; }
  .loc-row:hover { border-color: rgba(245,200,66,.32); }
  .loc-main { font-size: 14px; color: #F0EDE6; }
  .loc-sub { font-size: 11px; color: rgba(240,237,230,.32); }

  .submit-orb-wrap { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 10px 0 4px; }
  .submit-orb { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg,#FFD740,#F5C842,#C88A00); border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 0 0 12px rgba(245,200,66,.09), 0 0 0 24px rgba(245,200,66,.04), 0 8px 32px rgba(245,200,66,.4); transition: transform .15s; }
  .submit-orb:hover { transform: scale(1.06); }
  .orb-lbl { font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 800; color: #0A0A0F; letter-spacing: .6px; }
  .orb-cap { text-align: center; }
  .orb-cap-t { font-size: 14px; font-weight: 600; color: #F0EDE6; }
  .orb-cap-s { font-size: 12px; color: rgba(240,237,230,.32); margin-top: 2px; }

  .trust { display: flex; justify-content: center; margin-top: 20px; }
  .tc { font-size: 11px; color: rgba(240,237,230,.25); padding: 0 10px; border-right: 1px solid rgba(255,255,255,.08); }
  .tc:last-child { border-right: none; }
`;

// ── SVG ICONS ──
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A0A0F">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
);
const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0F">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);
const SendIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A0A0F">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);
const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(245,200,66,.5)">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </svg>
);

// ── DUMMY DATA ──
const complaints = [
  { id: 1, title: "Harassment at Metro Station", date: "3 hours ago", status: "open" },
  { id: 2, title: "Broken CCTV — Sector 9", date: "Yesterday", status: "pending" },
  { id: 3, title: "Unsafe Road Lighting", date: "3 days ago", status: "approved" },
];

const statusMap = {
  open: { icClass: "ic-open", badgeClass: "b-open", label: "Open", color: "#FF4A6B" },
  pending: { icClass: "ic-pend", badgeClass: "b-pend", label: "Pending", color: "#F5C842" },
  approved: { icClass: "ic-done", badgeClass: "b-done", label: "Approved", color: "#00D68F" },
};

// ══════════════════════════════
//  LOGIN SCREEN
// ══════════════════════════════
function LoginScreen({ goTo }) {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-box"><ShieldIcon /></div>
          <div className="logo-name">Safe<span>Box</span> AI</div>
        </div>

        <div className="login-title">Welcome back</div>
        <div className="login-sub">Sign in to your secure workspace</div>

        <label className="lbl">Email address</label>
        <input className="inp" type="email" placeholder="you@example.com" />

        <label className="lbl">Password</label>
        <input className="inp" type="password" placeholder="••••••••••" />

        <div className="forgot-row">
          <button className="forgot-link">Forgot password?</button>
        </div>

        <button className="gold-btn" onClick={() => goTo("dash")}>Sign In</button>

        <div className="divider">or</div>

        <button className="google-btn">
          <div className="g-circle">G</div>
          Continue with Google
        </button>

        <div className="switch-txt">
          New here?{" "}
          <button className="switch-link" onClick={() => goTo("signup")}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
function SignupScreen({ goTo }) {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-box">🔐</div>
          <div className="logo-name">Safe<span>Box</span> AI</div>
        </div>

        <div className="login-title">Create Account</div>
        <div className="login-sub">Join SafeBox AI</div>

        <label className="lbl">Full Name</label>
        <input className="inp" placeholder="Enter your name" />

        <label className="lbl">Email</label>
        <input className="inp" type="email" placeholder="you@example.com" />

        <label className="lbl">Password</label>
        <input className="inp" type="password" placeholder="••••••••" />

        <button className="gold-btn" onClick={() => goTo("login")}>
          Sign Up
        </button>

        <div className="switch-txt">
          Already have an account?{" "}
          <button className="switch-link" onClick={() => goTo("login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════
//  DASHBOARD SCREEN
// ══════════════════════════════
function DashboardScreen({ goTo }) {
  return (
    <div className="dash-wrap">
      <div className="dash-inner">

        {/* Header */}
        <div className="dash-top">
          <div>
            <div className="dt-greet">Good morning,</div>
            <div className="dt-name">Priya Sharma</div>
          </div>
          <div className="dt-avatar">PS</div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <div className="stat-n" style={{ color: "#F0EDE6" }}>16</div>
            <div className="stat-l">Total</div>
            <div className="stat-bar" style={{ background: "rgba(255,255,255,.12)" }} />
          </div>
          <div className="stat">
            <div className="stat-n" style={{ color: "#F5C842" }}>5</div>
            <div className="stat-l">Pending</div>
            <div className="stat-bar" style={{ background: "rgba(245,200,66,.4)" }} />
          </div>
          <div className="stat">
            <div className="stat-n" style={{ color: "#00D68F" }}>9</div>
            <div className="stat-l">Approved</div>
            <div className="stat-bar" style={{ background: "rgba(0,214,143,.35)" }} />
          </div>
        </div>

        {/* HERO REPORT BUTTON */}
        <div className="hero-wrap">
          <div className="hero-eyebrow">Safety tool</div>
          <div className="hero-title">Something wrong?<br />Report it instantly.</div>
          <button className="hero-btn" onClick={() => goTo("comp")}>
            <div className="hero-btn-icon"><AlertIcon /></div>
            Report Incident
          </button>
          <div className="hero-hint">Encrypted · Anonymous option available</div>
        </div>

        {/* Quick Actions */}
        <div className="panel">
          <div className="panel-hd">
            <div className="panel-title">Quick actions</div>
          </div>
          <div className="quick-grid">
            <button className="qb" onClick={() => goTo("comp")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div className="qb-lbl">New Report</div>
            </button>
            <button className="qb">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(240,237,230,.4)" strokeWidth="2">
                <circle cx="12" cy="10" r="4" />
                <path d="M12 14c-5 0-8 2-8 4v1h16v-1c0-2-3-4-8-4z" />
              </svg>
              <div className="qb-lbl">Contacts</div>
            </button>
            <button className="qb">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(240,237,230,.4)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="qb-lbl">Safe Zones</div>
            </button>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="panel">
          <div className="panel-hd">
            <div className="panel-title">Recent complaints</div>
            <button className="see-all">View all</button>
          </div>
          {complaints.map((c) => {
            const s = statusMap[c.status];
            return (
              <div className="cr" key={c.id}>
                <div className={`cr-ic ${s.icClass}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={s.color}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>
                <div className="cr-info">
                  <div className="cr-title">{c.title}</div>
                  <div className="cr-date">{c.date}</div>
                </div>
                <span className={`badge ${s.badgeClass}`}>{s.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            style={{ background: "none", border: "none", fontSize: 12, color: "rgba(240,237,230,.2)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
            onClick={() => goTo("login")}
          >
            ← Back to login
          </button>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════
//  COMPLAINT SCREEN
// ══════════════════════════════
function ComplaintScreen({ goTo }) {
  const [priority, setPriority] = useState("low");

  return (
    <div className="comp-wrap">
      <div className="comp-inner">

        <button className="comp-back" onClick={() => goTo("dash")}>
          <BackIcon />
          Back to Dashboard
        </button>

        <div className="comp-hdr-title">Report an Incident</div>
        <div className="comp-hdr-sub">Encrypted and anonymous — your safety matters</div>

        {/* Details */}
        <div className="glass">
          <div className="fc-title">Incident details</div>
          <label className="lbl">Complaint title</label>
          <input className="inp" type="text" placeholder="Brief title of the issue..." />
          <label className="lbl">Priority</label>
          <div className="prio-row">
            {["low", "med", "high"].map((p) => (
              <button
                key={p}
                className={`pp ${priority === p ? `pp-${p}` : ""}`}
                onClick={() => setPriority(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="glass">
          <div className="fc-title">Description</div>
          <textarea
            className="textarea"
            placeholder="What happened? Include time, location, people involved..."
          />
        </div>

        {/* Evidence */}
        <div className="glass">
          <div className="fc-title">Evidence</div>
          <div className="upload-box" onClick={() => alert("File picker would open here")}>
            <div style={{ margin: "0 auto 10px", width: 28 }}><UploadIcon /></div>
            <div className="ub-t"><strong>Tap to upload</strong> photo or video</div>
            <div className="ub-hint">PNG, JPG, MP4 — up to 50 MB</div>
          </div>
        </div>

        {/* Location */}
        <div className="glass">
          <div className="fc-title">Location</div>
          <div className="loc-row" onClick={() => alert("GPS: Hyderabad, Telangana")}>
            <PinIcon />
            <div>
              <div className="loc-main">Hyderabad, Telangana</div>
              <div className="loc-sub">Tap to update GPS location</div>
            </div>
            <ChevronIcon />
          </div>
        </div>

        {/* Submit */}
        <div className="glass">
          <div className="submit-orb-wrap">
            <button
              className="submit-orb"
              onClick={() => alert("Complaint submitted!\nRef: SB-2024-1092\n\nAuthorities notified.")}
            >
              <SendIcon />
              <span className="orb-lbl">SUBMIT</span>
            </button>
            <div className="orb-cap">
              <div className="orb-cap-t">Submit Complaint</div>
              <div className="orb-cap-s">Encrypted and anonymised on send</div>
            </div>
          </div>
        </div>

        <div className="trust">
          <span className="tc">End-to-end encrypted</span>
          <span className="tc">ISO 27001</span>
          <span className="tc">Anonymous option</span>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════
//  APP ROOT
// ══════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("login");

  return (
    <>
      <style>{styles}</style>
      <div className="root">
        {screen === "login" && <LoginScreen goTo={setScreen} />}
        {screen === "signup" && <SignupScreen goTo={setScreen} />}
        {screen === "dash" && <DashboardScreen goTo={setScreen} />}
        {screen === "comp" && <ComplaintScreen goTo={setScreen} />}
      </div>
    </>
  );
}
