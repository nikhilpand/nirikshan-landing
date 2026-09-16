export const LINKS = {
  portal: 'https://nirikshan.gov.in',
  app: 'https://github.com/erkrishna69/SIH/releases/download/v1.0.0/NIRIKSHAN-Officer-App.apk',
  github: 'https://github.com/erkrishna69/SIH',
  report: 'https://nirikshan.kxoproduction.in/report.pdf',
  demo: 'https://youtu.be/nirikshan-sih-demo',
} as const

export const gaps = [
  ['01', 'Ghost inspections', 'A visit can be marked complete without verified physical presence.'],
  ['02', 'Proxy beneficiaries', 'Reported support is harder to trust when the beneficiary is not physically verified.'],
  ['03', 'Pre-planned collusion', 'Advance notice can allow conditions to be staged before inspection.'],
  ['04', 'Paper / WhatsApp delay', 'Field reports may sit offline for 3–7 days before reaching decision-makers.'],
] as const

export const workflow = [
  ['01', 'AI assignment', 'Surprise duty assignment, 1–2h before inspection', 'bot'],
  ['02', 'Dual-lock', 'Encrypted QR + 150m Haversine GPS geofence', 'qr'],
  ['03', 'Digital audit', 'Checklist + geotagged evidence capture', 'camera'],
  ['04', 'Live alert', 'WebSocket events designed for sub-second alerts', 'bolt'],
  ['05', 'Resolution', 'Triage + proof-of-fix log', 'check'],
] as const

export const stack = [
  ['FIELD', 'Inspector mobile app', 'React Native / Expo • SQLite • Camera • Location • QR'],
  ['API', 'Fastify gateway', 'Node.js REST API • JWT • Socket.io WebSockets'],
  ['DATA', 'Cloud datastore', 'MongoDB Atlas • Cloudinary media CDN'],
  ['MEDIA', 'Streaming layer', 'RTSP / HLS gateway • in-app WebRTC'],
] as const
