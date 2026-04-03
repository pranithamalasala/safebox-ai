import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .root { background: #080810; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #F0EDE6; }

  .lbl { display: block; font-size: 11px; font-weight: 600; letter-spacing: .6px; text-transform: uppercase; color: rgba(240,237,230,.38); margin-bottom: 7px; }
  .inp { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(245,200,66,.14); border-radius: 14px; padding: 13px 16px; color: #F0EDE6; font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border-color .2s; margin-bottom: 14px; }
  .inp:focus { border-color: rgba(245,200,66,.5); background: rgba(245,200,66,.03); }
  .inp::placeholder { color: rgba(240,237,230,.2); }
  .inp-err { border-color: rgba(255,74,107,.45) !important; }
  .err-msg { font-size: 11px; color: #FF4A6B; margin-top: -10px; margin-bottom: 10px; padding-left: 4px; }

  .inp-row { position: relative; }
  .inp-prefix { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 15px; color: #F5C842; font-weight: 600; pointer-events: none; }
  .inp-ph { padding-left: 52px !important; }
  .inp-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); cursor: pointer; color: rgba(240,237,230,.3); background: none; border: none; padding: 0; }
  .inp-ic-r { padding-right: 44px !important; }

  .gold-btn { width: 100%; padding: 15px; background: linear-gradient(135deg,#F5C842,#C88A00); border: none; border-radius: 14px; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #0A0A0F; cursor: pointer; box-shadow: 0 4px 22px rgba(245,200,66,.28); transition: transform .15s, box-shadow .15s; }
  .gold-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(245,200,66,.4); }
  .gold-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .ghost-btn { width: 100%; padding: 13px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; color: rgba(240,237,230,.6); font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; transition: background .2s; margin-top: 10px; }
  .ghost-btn:hover { background: rgba(255,255,255,.07); }

  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px 16px; background: #080810; }
  .login-card { width: 100%; max-width: 420px; background: linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02)); border: 1px solid rgba(245,200,66,.22); border-radius: 28px; padding: 36px 30px; box-shadow: 0 0 70px rgba(245,200,66,.07),0 40px 80px rgba(0,0,0,.65); position: relative; overflow: hidden; }
  .login-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background: linear-gradient(90deg,transparent,rgba(245,200,66,.55),transparent); }

  .login-logo { display: flex; align-items: center; gap: 11px; justify-content: center; margin-bottom: 24px; }
  .logo-box { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg,#F5C842,#B87800); display: flex; align-items: center; justify-content: center; }
  .logo-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #F0EDE6; }
  .logo-name span { color: #F5C842; }

  /* PROGRESS BAR */
  .prog-wrap { margin-bottom: 24px; }
  .prog-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .prog-step { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #F0EDE6; }
  .prog-count { font-size: 12px; color: rgba(240,237,230,.35); }
  .prog-bar-bg { height: 4px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; }
  .prog-bar-fill { height: 100%; background: linear-gradient(90deg,#F5C842,#C88A00); border-radius: 4px; transition: width .4s ease; }
  .prog-dots { display: flex; justify-content: center; gap: 8px; margin-top: 10px; }
  .prog-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.12); transition: all .3s; }
  .prog-dot.active { background: #F5C842; width: 18px; border-radius: 3px; }
  .prog-dot.done { background: rgba(0,214,143,.5); }

  /* SECTION LABEL */
  .section-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(245,200,66,.08); border: 1px solid rgba(245,200,66,.2); border-radius: 20px; padding: 5px 12px; margin-bottom: 16px; }
  .section-badge-txt { font-size: 11px; font-weight: 600; color: #F5C842; letter-spacing: .5px; text-transform: uppercase; }

  /* GENDER PILLS */
  .gender-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .gender-pill { flex: 1; min-width: 80px; padding: 10px 8px; border-radius: 13px; border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.04); text-align: center; font-size: 13px; color: rgba(240,237,230,.45); cursor: pointer; font-family: 'DM Sans',sans-serif; font-weight: 500; transition: all .2s; }
  .gender-pill.sel { background: rgba(245,200,66,.1); border-color: rgba(245,200,66,.4); color: #F5C842; }

  /* EMERGENCY CONTACTS */
  .ec-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 14px 16px; margin-bottom: 10px; position: relative; }
  .ec-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .ec-label { font-size: 12px; font-weight: 600; color: rgba(240,237,230,.4); text-transform: uppercase; letter-spacing: .5px; }
  .ec-remove { background: none; border: none; color: rgba(255,74,107,.5); cursor: pointer; font-size: 12px; font-family: 'DM Sans',sans-serif; }
  .ec-remove:hover { color: #FF4A6B; }
  .add-ec-btn { width: 100%; padding: 11px; background: rgba(245,200,66,.04); border: 1.5px dashed rgba(245,200,66,.22); border-radius: 13px; color: #F5C842; font-size: 13px; font-family: 'DM Sans',sans-serif; cursor: pointer; transition: all .2s; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; gap: 7px; }
  .add-ec-btn:hover { background: rgba(245,200,66,.08); border-color: rgba(245,200,66,.4); }
  .ec-limit { font-size: 11px; color: rgba(240,237,230,.25); text-align: center; margin-top: -8px; margin-bottom: 14px; }

  /* LOCATION TOGGLE */
  .loc-toggle { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(245,200,66,.14); border-radius: 14px; padding: 14px 16px; margin-bottom: 14px; cursor: pointer; transition: all .2s; }
  .loc-toggle:hover { border-color: rgba(245,200,66,.3); }
  .loc-toggle-info { flex: 1; }
  .loc-toggle-title { font-size: 14px; color: #F0EDE6; font-weight: 500; }
  .loc-toggle-sub { font-size: 11px; color: rgba(240,237,230,.32); margin-top: 2px; }
  .toggle-switch { width: 42px; height: 24px; border-radius: 12px; background: rgba(255,255,255,.1); position: relative; transition: background .25s; flex-shrink: 0; }
  .toggle-switch.on { background: linear-gradient(135deg,#F5C842,#C88A00); }
  .toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: #fff; position: absolute; top: 3px; left: 3px; transition: left .25s; box-shadow: 0 1px 4px rgba(0,0,0,.3); }
  .toggle-switch.on .toggle-knob { left: 21px; }

  /* OTP SCREEN */
  .otp-wrap { text-align: center; }
  .otp-phone-show { font-size: 15px; color: #F5C842; font-weight: 600; margin-bottom: 24px; }
  .otp-boxes { display: flex; gap: 10px; justify-content: center; margin: 24px 0; }
  .otp-box { width: 52px; height: 60px; background: rgba(255,255,255,.05); border: 1px solid rgba(245,200,66,.2); border-radius: 14px; font-family: 'Syne',sans-serif; font-size: 24px; font-weight: 800; color: #F5C842; text-align: center; outline: none; caret-color: #F5C842; transition: border-color .2s; }
  .otp-box:focus { border-color: rgba(245,200,66,.6); background: rgba(245,200,66,.04); }
  .otp-box.filled { border-color: rgba(245,200,66,.45); background: rgba(245,200,66,.05); }
  .resend-row { font-size: 13px; color: rgba(240,237,230,.35); margin-top: 16px; }
  .resend-btn { background: none; border: none; color: #F5C842; font-family: 'DM Sans',sans-serif; font-size: 13px; cursor: pointer; font-weight: 500; }
  .resend-btn:disabled { color: rgba(245,200,66,.3); cursor: default; }
  .otp-success { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 24px 0; }
  .otp-check { width: 72px; height: 72px; border-radius: 50%; background: rgba(0,214,143,.12); border: 2px solid rgba(0,214,143,.3); display: flex; align-items: center; justify-content: center; }

  /* SWITCH */
  .switch-txt { text-align: center; font-size: 13px; color: rgba(240,237,230,.35); margin-top: 18px; }
  .switch-link { color: #F5C842; cursor: pointer; font-weight: 500; background: none; border: none; font-family: 'DM Sans',sans-serif; font-size: 13px; }

  .trust { display: flex; justify-content: center; margin-top: 18px; flex-wrap: wrap; gap: 4px; }
  .tc { font-size: 11px; color: rgba(240,237,230,.22); padding: 0 8px; border-right: 1px solid rgba(255,255,255,.08); }
  .tc:last-child { border-right: none; }

  .divider { display: flex; align-items: center; gap: 12px; margin: 14px 0; color: rgba(240,237,230,.22); font-size: 12px; }
  .divider::before, .divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }

  .pw-strength { display: flex; gap: 4px; margin-top: -8px; margin-bottom: 12px; }
  .pw-bar { flex: 1; height: 3px; border-radius: 2px; background: rgba(255,255,255,.08); transition: background .3s; }
`;

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0F">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
);
const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

function pwStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthColors = ["#FF4A6B", "#FF9500", "#F5C842", "#00D68F"];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

const STEPS = [
  "Basic Info",
  "Safety Add-ons",
  "Verify OTP",
];

export default function SignupScreen({ goTo }) {
  const [step, setStep] = useState(0);

  // Step 0 fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [gender, setGender] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [errors, setErrors] = useState({});

  // Step 1 fields
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "", phone: "" }
  ]);
  const [locationOn, setLocationOn] = useState(false);

  // Step 2 OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const otpRefs = useRef([]);

  // Resend timer logic
  const startTimer = () => {
    setResendTimer(30);
    const iv = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(iv); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const strength = pwStrength(password);

  // Validate step 0
  const validateStep0 = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit phone number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (password.length < 8) e.password = "Password must be at least 8 characters";
    if (password !== confirmPw) e.confirmPw = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    emergencyContacts.forEach((ec, i) => {
      if (!ec.name.trim()) e[`ec_name_${i}`] = "Name required";
      if (!ec.phone.trim() || ec.phone.replace(/\D/g, "").length < 10) e[`ec_phone_${i}`] = "Valid phone required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    if (step === 1) startTimer();
    setStep(s => s + 1);
  };

  // OTP input handling
  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
    if (!v && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      setOtpVerified(true);
      setTimeout(() => goTo ? goTo("dash") : null, 2000);
    }
  };

  const addEmergencyContact = () => {
    if (emergencyContacts.length < 3) {
      setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
    }
  };

  const removeEmergencyContact = (i) => {
    setEmergencyContacts(emergencyContacts.filter((_, idx) => idx !== i));
  };

  const updateEC = (i, field, val) => {
    const updated = emergencyContacts.map((ec, idx) =>
      idx === i ? { ...ec, [field]: val } : ec
    );
    setEmergencyContacts(updated);
  };

  const progress = ((step) / (STEPS.length)) * 100;

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-box"><ShieldIcon /></div>
          <div className="logo-name">Safe<span>Box</span> AI</div>
        </div>

        {/* Progress */}
        {!otpVerified && (
          <div className="prog-wrap">
            <div className="prog-label">
              <span className="prog-step">{STEPS[step]}</span>
              <span className="prog-count">Step {step + 1} of {STEPS.length}</span>
            </div>
            <div className="prog-bar-bg">
              <div className="prog-bar-fill" style={{ width: `${Math.max(progress, 12)}%` }} />
            </div>
            <div className="prog-dots">
              {STEPS.map((_, i) => (
                <div key={i} className={`prog-dot ${i < step ? "done" : i === step ? "active" : ""}`} />
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 0: BASIC INFO ── */}
        {step === 0 && (
          <>
            <div className="section-badge">
              <span className="section-badge-txt">👤 Your Details</span>
            </div>

            <label className="lbl">Full Name *</label>
            <input
              className={`inp ${errors.fullName ? "inp-err" : ""}`}
              placeholder="Priya Sharma"
              value={fullName}
              onChange={e => { setFullName(e.target.value); setErrors(v => ({ ...v, fullName: "" })); }}
            />
            {errors.fullName && <div className="err-msg">{errors.fullName}</div>}

            <label className="lbl">Phone Number *</label>
            <div className="inp-row">
              <span className="inp-prefix">+91</span>
              <input
                className={`inp inp-ph ${errors.phone ? "inp-err" : ""}`}
                placeholder="98765 43210"
                value={phone}
                type="tel"
                maxLength={10}
                onChange={e => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(v => ({ ...v, phone: "" })); }}
              />
            </div>
            {errors.phone && <div className="err-msg">{errors.phone}</div>}

            <label className="lbl">Email <span style={{ color: "rgba(240,237,230,.3)", fontWeight: 400, textTransform: "none" }}>(optional)</span></label>
            <input
              className={`inp ${errors.email ? "inp-err" : ""}`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
            />
            {errors.email && <div className="err-msg">{errors.email}</div>}

            <label className="lbl">Password *</label>
            <div className="inp-row">
              <input
                className={`inp inp-ic-r ${errors.password ? "inp-err" : ""}`}
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: "" })); }}
              />
              <button className="inp-icon" onClick={() => setShowPw(p => !p)} type="button">
                <EyeIcon open={showPw} />
              </button>
            </div>
            {password && (
              <div className="pw-strength">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="pw-bar" style={{ background: i < strength ? strengthColors[strength - 1] : undefined }} />
                ))}
              </div>
            )}
            {errors.password && <div className="err-msg">{errors.password}</div>}
            {password && strength < 4 && (
              <div style={{ fontSize: 11, color: strengthColors[strength - 1] || "rgba(240,237,230,.3)", marginTop: -10, marginBottom: 10, paddingLeft: 4 }}>
                {strengthLabels[strength - 1] || "Too short"} password
              </div>
            )}

            <label className="lbl">Confirm Password *</label>
            <div className="inp-row">
              <input
                className={`inp inp-ic-r ${errors.confirmPw ? "inp-err" : ""}`}
                type={showCpw ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPw}
                onChange={e => { setConfirmPw(e.target.value); setErrors(v => ({ ...v, confirmPw: "" })); }}
              />
              <button className="inp-icon" onClick={() => setShowCpw(p => !p)} type="button">
                <EyeIcon open={showCpw} />
              </button>
            </div>
            {errors.confirmPw && <div className="err-msg">{errors.confirmPw}</div>}

            <label className="lbl">Gender <span style={{ color: "rgba(240,237,230,.3)", fontWeight: 400, textTransform: "none" }}>(optional)</span></label>
            <div className="gender-row">
              {["Female", "Male", "Non-binary", "Prefer not to say"].map(g => (
                <button
                  key={g}
                  className={`gender-pill ${gender === g ? "sel" : ""}`}
                  onClick={() => setGender(g === gender ? "" : g)}
                  type="button"
                >
                  {g}
                </button>
              ))}
            </div>

            <button className="gold-btn" onClick={handleNext}>Continue →</button>
            <div className="switch-txt">
              Already have an account?{" "}
              <button className="switch-link" onClick={() => goTo?.("login")}>Sign In</button>
            </div>
          </>
        )}

        {/* ── STEP 1: SAFETY ADD-ONS ── */}
        {step === 1 && (
          <>
            <div className="section-badge">
              <span className="section-badge-txt">🛡️ Safety Add-ons</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Emergency Contacts *</label>
              <div style={{ fontSize: 12, color: "rgba(240,237,230,.32)", marginBottom: 12 }}>
                Add up to 3 trusted contacts who'll be notified in emergencies.
              </div>

              {emergencyContacts.map((ec, i) => (
                <div className="ec-card" key={i}>
                  <div className="ec-header">
                    <span className="ec-label">Contact {i + 1}</span>
                    {i > 0 && (
                      <button className="ec-remove" onClick={() => removeEmergencyContact(i)}>Remove</button>
                    )}
                  </div>
                  <label className="lbl">Name</label>
                  <input
                    className={`inp ${errors[`ec_name_${i}`] ? "inp-err" : ""}`}
                    placeholder="Contact name"
                    value={ec.name}
                    onChange={e => { updateEC(i, "name", e.target.value); setErrors(v => ({ ...v, [`ec_name_${i}`]: "" })); }}
                  />
                  {errors[`ec_name_${i}`] && <div className="err-msg">{errors[`ec_name_${i}`]}</div>}

                  <label className="lbl">Phone Number</label>
                  <div className="inp-row">
                    <span className="inp-prefix">+91</span>
                    <input
                      className={`inp inp-ph ${errors[`ec_phone_${i}`] ? "inp-err" : ""}`}
                      placeholder="98765 43210"
                      type="tel"
                      maxLength={10}
                      value={ec.phone}
                      onChange={e => { updateEC(i, "phone", e.target.value.replace(/\D/g, "")); setErrors(v => ({ ...v, [`ec_phone_${i}`]: "" })); }}
                    />
                  </div>
                  {errors[`ec_phone_${i}`] && <div className="err-msg">{errors[`ec_phone_${i}`]}</div>}
                </div>
              ))}

              {emergencyContacts.length < 3 ? (
                <button className="add-ec-btn" onClick={addEmergencyContact}>
                  <PlusIcon /> Add another contact
                </button>
              ) : (
                <div className="ec-limit">Maximum 3 emergency contacts</div>
              )}
            </div>

            <div className="divider">Safety settings</div>

            <label className="lbl">Location Permission</label>
            <div className="loc-toggle" onClick={() => setLocationOn(l => !l)}>
              <PinIcon />
              <div className="loc-toggle-info">
                <div className="loc-toggle-title">Enable location access</div>
                <div className="loc-toggle-sub">Used only during emergency alerts</div>
              </div>
              <div className={`toggle-switch ${locationOn ? "on" : ""}`}>
                <div className="toggle-knob" />
              </div>
            </div>
            {locationOn && (
              <div style={{ fontSize: 11, color: "rgba(0,214,143,.6)", marginTop: -8, marginBottom: 14, paddingLeft: 4 }}>
                ✓ Location enabled — shared only during SOS
              </div>
            )}

            <button className="gold-btn" onClick={handleNext}>Send OTP →</button>
            <button className="ghost-btn" onClick={() => setStep(0)}>← Back</button>
          </>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && !otpVerified && (
          <div className="otp-wrap">
            <div style={{ fontSize: 20, marginBottom: 8 }}>📱</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#F0EDE6", marginBottom: 6 }}>
              Verify your number
            </div>
            <div style={{ fontSize: 13, color: "rgba(240,237,230,.38)", marginBottom: 4 }}>
              We sent a 6-digit OTP to
            </div>
            <div className="otp-phone-show">+91 {phone.slice(0, 5) + " " + phone.slice(5)}</div>

            <div className="otp-boxes">
              {otp.map((val, i) => (
                <input
                  key={i}
                  className={`otp-box ${val ? "filled" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  ref={el => otpRefs.current[i] = el}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                />
              ))}
            </div>

            <button
              className="gold-btn"
              onClick={handleVerify}
              disabled={otp.join("").length < 6}
            >
              Verify & Create Account
            </button>

            <div className="resend-row">
              Didn't receive it?{" "}
              <button
                className="resend-btn"
                disabled={resendTimer > 0}
                onClick={startTimer}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>
            <button className="ghost-btn" style={{ marginTop: 12 }} onClick={() => setStep(1)}>← Change number</button>
          </div>
        )}

        {/* ── OTP SUCCESS ── */}
        {otpVerified && (
          <div className="otp-success">
            <div className="otp-check"><CheckIcon /></div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#F0EDE6" }}>
              You're all set!
            </div>
            <div style={{ fontSize: 13, color: "rgba(240,237,230,.38)", textAlign: "center" }}>
              Account created successfully.<br />Taking you to your dashboard…
            </div>
            <div style={{ width: 40, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#F5C842,#C88A00)", marginTop: 8 }} />
          </div>
        )}

        {/* TRUST BADGES */}
        {!otpVerified && (
          <div className="trust">
            <span className="tc">End-to-end encrypted</span>
            <span className="tc">ISO 27001</span>
            <span className="tc">Anonymous option</span>
          </div>
        )}
      </div>
    </div>
  );
}
