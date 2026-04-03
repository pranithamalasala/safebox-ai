export const recentAlerts = [
  { plate: 'MH12AB3456', loc: 'Banjara Hills', time: '2m ago', status: 'live' },
  { plate: 'TS09CD7890', loc: 'Hitech City', time: '8m ago', status: 'live' },
  { plate: 'AP16EF1234', loc: 'Jubilee Hills', time: '15m ago', status: 'handled' },
  { plate: 'MH01GH5678', loc: 'LB Nagar', time: '32m ago', status: 'handled' },
];

export const allAlerts = [
  { plate: 'MH12AB3456', loc: 'Banjara Hills, Near Petrol Pump', time: '2 min ago', user: 'Priya Sharma', type: 'Vehicle Detection', status: 'live' },
  { plate: 'TS09CD7890', loc: 'Hitech City, HITEC Tower', time: '8 min ago', user: 'Aisha Khan', type: 'SOS Alert', status: 'live' },
  { plate: 'AP16EF1234', loc: 'Jubilee Hills Rd No.36', time: '15 min ago', user: 'Sneha Reddy', type: 'Suspicious Vehicle', status: 'live' },
  { plate: 'MH01GH5678', loc: 'LB Nagar X-Roads', time: '32 min ago', user: 'Divya Nair', type: 'Vehicle Detection', status: 'live' },
  { plate: 'KA03IJ9012', loc: 'Kompally Main Rd', time: '48 min ago', user: 'Kavya Rao', type: 'Vehicle Detection', status: 'handled' },
  { plate: 'TS07KL3456', loc: 'Begumpet Station', time: '1h 12m ago', user: 'Meera Patel', type: 'SOS Alert', status: 'handled' },
  { plate: 'AP05MN7890', loc: 'Madhapur Village Rd', time: '2h ago', user: 'Ananya Singh', type: 'Suspicious Vehicle', status: 'handled' },
];

export const complaints = [
  { id: '#C1042', user: 'Priya Sharma', type: 'Harassment', loc: 'Banjara Hills', date: 'Apr 3, 2026', status: 'pending' },
  { id: '#C1041', user: 'Aisha Khan', type: 'Rash Driving', loc: 'Hitech City', date: 'Apr 3, 2026', status: 'inprogress' },
  { id: '#C1040', user: 'Sneha Reddy', type: 'Stalking', loc: 'Jubilee Hills', date: 'Apr 2, 2026', status: 'inprogress' },
  { id: '#C1039', user: 'Divya Nair', type: 'Theft', loc: 'LB Nagar', date: 'Apr 2, 2026', status: 'resolved' },
  { id: '#C1038', user: 'Kavya Rao', type: 'Harassment', loc: 'Kompally', date: 'Apr 1, 2026', status: 'resolved' },
  { id: '#C1037', user: 'Meera Patel', type: 'Rash Driving', loc: 'Begumpet', date: 'Apr 1, 2026', status: 'pending' },
  { id: '#C1036', user: 'Ananya Singh', type: 'Suspicious Person', loc: 'Madhapur', date: 'Mar 31, 2026', status: 'resolved' },
];

export const vehicles = [
  { plate: 'MH12AB3456', owner: 'Unknown', detections: 8, complaints: 3, status: 'blacklisted' },
  { plate: 'TS09CD7890', owner: 'Ravi Kumar', detections: 6, complaints: 2, status: 'blacklisted' },
  { plate: 'AP16EF1234', owner: 'Unknown', detections: 5, complaints: 2, status: 'suspicious' },
  { plate: 'MH01GH5678', owner: 'Mohan Das', detections: 4, complaints: 1, status: 'suspicious' },
  { plate: 'KA03IJ9012', owner: 'Suresh Rao', detections: 3, complaints: 1, status: 'suspicious' },
  { plate: 'TS07KL3456', owner: 'Verified User', detections: 2, complaints: 0, status: 'cleared' },
  { plate: 'AP05MN7890', owner: 'Verified User', detections: 1, complaints: 0, status: 'cleared' },
];

export const users = [
  { name: 'Priya Sharma', phone: '+91 98765 43210', ec: 2, joined: 'Jan 12, 2026', reports: 3, status: 'active', color: '#F5C842' },
  { name: 'Aisha Khan', phone: '+91 87654 32109', ec: 3, joined: 'Feb 3, 2026', reports: 1, status: 'active', color: '#9B7FFF' },
  { name: 'Sneha Reddy', phone: '+91 76543 21098', ec: 1, joined: 'Feb 18, 2026', reports: 5, status: 'active', color: '#4A9EFF' },
  { name: 'Divya Nair', phone: '+91 65432 10987', ec: 2, joined: 'Mar 1, 2026', reports: 0, status: 'active', color: '#00D68F' },
  { name: 'Kavya Rao', phone: '+91 54321 09876', ec: 3, joined: 'Mar 15, 2026', reports: 2, status: 'active', color: '#FF9500' },
  { name: 'Ravi Kumar', phone: '+91 43210 98765', ec: 0, joined: 'Mar 22, 2026', reports: 8, status: 'blocked', color: '#FF4A6B' },
];

export const topZones = [
  ['Banjara Hills', '34', '🔴'],
  ['Hitech City', '28', '🟡'],
  ['Jubilee Hills', '19', '🟡'],
  ['LB Nagar', '14', '🟢'],
  ['Kondapur', '9', '🟢'],
];

export const blacklistedVehicles = [
  ['MH12AB3456', 'Reported 8x'],
  ['TS09CD7890', 'Reported 6x'],
  ['AP16EF1234', 'Reported 5x'],
];

export const systemStatus = [
  ['AI Detection Engine', '🟢 Online'],
  ['OTP Service', '🟢 Active'],
  ['Emergency Alerts', '🟢 Active'],
  ['Location Tracking', '🟡 Partial'],
  ['Evidence Storage', '🟢 Online'],
];

export const mapAlertLocations = [
  { loc: 'Banjara Hills, Petrol Pump', type: 'SOS', typeCls: 'badge-red', time: '2m ago', statusLabel: '🔴 Live', statusCls: 'badge-red', action: 'Dispatch' },
  { loc: 'Hitech City, HITEC Tower', type: 'Vehicle', typeCls: 'badge-blue', time: '8m ago', statusLabel: '🔴 Live', statusCls: 'badge-red', action: 'Dispatch' },
  { loc: 'Jubilee Hills, Rd No.36', type: 'Suspicious', typeCls: 'badge-amber', time: '15m ago', statusLabel: '🟡 Active', statusCls: 'badge-amber', action: 'View' },
  { loc: 'LB Nagar X-Roads', type: 'Vehicle', typeCls: 'badge-blue', time: '32m ago', statusLabel: '🟢 Handled', statusCls: 'badge-green', action: 'View' },
];

export const notifications = [
  { title: 'SOS Alert — Banjara Hills', type: 'Emergency', time: '2m ago', reach: 247, icon: '🚨', bg: 'rgba(255,74,107,.12)', col: 'var(--red)' },
  { title: 'Safety Update — Hitech City', type: 'Broadcast', time: '18m ago', reach: 1240, icon: '📢', bg: 'rgba(255,149,0,.1)', col: 'var(--amber)' },
  { title: 'New Feature: SOS Button', type: 'Broadcast', time: '2h ago', reach: 2847, icon: '📢', bg: 'rgba(74,158,255,.1)', col: 'var(--blue)' },
  { title: 'Account Verification Reminder', type: 'Direct', time: '4h ago', reach: 83, icon: '📩', bg: 'rgba(245,200,66,.1)', col: 'var(--gold)' },
  { title: 'Emergency: Vehicle Alert Zone', type: 'Emergency', time: 'Yesterday', reach: 412, icon: '🚨', bg: 'rgba(255,74,107,.12)', col: 'var(--red)' },
  { title: 'Weekly Safety Report', type: 'Broadcast', time: '2 days ago', reach: 2847, icon: '📊', bg: 'rgba(0,214,143,.1)', col: 'var(--green)' },
];

export const evidenceFiles = [
  { name: 'MH12AB3456_detection.jpg', date: 'Apr 3 · 9:42 PM', type: 'IMG', emoji: '📷' },
  { name: 'banjara_hills_sos_clip.mp4', date: 'Apr 3 · 9:38 PM', type: 'VID', emoji: '🎥' },
  { name: 'TS09CD7890_plate_scan.jpg', date: 'Apr 3 · 9:10 PM', type: 'IMG', emoji: '📸' },
  { name: 'hitech_city_cam_001.mp4', date: 'Apr 3 · 8:55 PM', type: 'VID', emoji: '🎥' },
  { name: 'AP16EF1234_suspicious.jpg', date: 'Apr 2 · 11:22 PM', type: 'IMG', emoji: '📷' },
  { name: 'jubilee_hills_footage.mp4', date: 'Apr 2 · 10:47 PM', type: 'VID', emoji: '🎥' },
  { name: 'lb_nagar_detection_04.jpg', date: 'Apr 2 · 7:30 PM', type: 'IMG', emoji: '📸' },
  { name: 'kompally_alert_evidence.jpg', date: 'Apr 1 · 9:15 PM', type: 'IMG', emoji: '📷' },
  { name: 'begumpet_cam_screenshot.jpg', date: 'Apr 1 · 6:40 PM', type: 'IMG', emoji: '📸' },
];

export const incidentTypes = [
  ['Harassment', '#FF4A6B', '32%'],
  ['Theft', '#F5C842', '28%'],
  ['Rash Driving', '#4A9EFF', '18%'],
  ['Stalking', '#9B7FFF', '14%'],
  ['Other', 'rgba(255,255,255,.3)', '8%'],
];

export const dashboardBarData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  alerts: [4, 7, 3, 9, 6, 11, 8],
  complaints: [2, 4, 1, 5, 3, 7, 4],
};

export const monthlyComplaints = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data: [12, 19, 8, 24, 16, 30, 22, 28, 18, 35, 29, 41],
};

export const peakHours = {
  labels: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
  data: [2, 1, 0, 1, 5, 9, 7, 8, 12, 18, 22, 14],
  colors: ['rgba(74,158,255,.6)', 'rgba(74,158,255,.6)', 'rgba(74,158,255,.6)', 'rgba(74,158,255,.6)', '#F5C842', '#F5C842', '#F5C842', '#F5C842', '#F5C842', '#FF4A6B', '#FF4A6B', '#F5C842'],
};