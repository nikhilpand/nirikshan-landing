export const LINKS = {
  portal: 'https://nirikshan.gov.in',
  app: 'https://github.com/erkrishna69/SIH/releases/download/v1.0.0/NIRIKSHAN-Officer-App.apk',
  github: 'https://github.com/erkrishna69/SIH',
  report: 'https://nirikshan.kxoproduction.in/report.pdf',
  demo: 'https://youtu.be/nirikshan-sih-demo',
} as const

export const PROJECT_INFO = {
  name: 'NIRIKSHAN',
  tagline: 'Smart Real-Time Inspection & Verification Platform',
  hackathon: 'Smart India Hackathon 2026',
  problemId: 'SIH26095',
  team: 'Team SquareX',
  theme: 'Smart Real-Time Monitoring & Physical Presence Verification',
  version: 'v4.2 Production',
} as const

export const CORE_METRICS = [
  { value: '150m', label: 'Presence Geofence', desc: 'Haversine perimeter lock to prevent remote check-ins' },
  { value: '<500ms', label: 'Broadcast Latency', desc: 'Direct WebSocket push to supervisor command desk' },
  { value: '100%', label: 'Offline Capable', desc: 'SQLite local storage with store-and-forward engine' },
  { value: '0', label: 'Ghost Inspections', desc: 'Cryptographic dual-lock enforces physical presence' },
] as const

export interface TrustStep {
  id: string
  title: string
  label: string
  desc: string
  icon: string
  detail: string
  validation: string
}

export const TRUST_ENGINE_STEPS: TrustStep[] = [
  {
    id: '01',
    title: '150m Haversine GPS Perimeter',
    label: 'PERIMETER CHECK',
    desc: 'Calculates the real-time geodesic distance between device hardware GPS and facility coordinates. Inspection form remains locked if distance > 150m.',
    icon: 'pin',
    detail: 'Mock location detection active • Satellite accuracy within ±3.4m',
    validation: 'Status: 38.2m from facility (PASSED)',
  },
  {
    id: '02',
    title: 'Dynamic Salted QR Handshake',
    label: 'ON-SITE SCAN',
    desc: 'Officer must scan the physical QR code mounted on-site. The token incorporates rotating cryptographic salts to prevent printed photo replay attacks.',
    icon: 'qr',
    detail: 'Private-key decrypted • Rotating 60-second salt',
    validation: 'Status: Facility #0482 QR Verified (PASSED)',
  },
  {
    id: '03',
    title: 'Hardware Camera & EXIF Signing',
    label: 'TAMPER-PROOF EVIDENCE',
    desc: 'Camera stream writes directly to protected app storage. Device gallery selection is blocked to prevent uploading old or doctored imagery.',
    icon: 'camera',
    detail: 'EXIF timestamp synchronized with atomic GPS time',
    validation: 'Status: 4 geotagged photos stamped (PASSED)',
  },
  {
    id: '04',
    title: 'SHA-256 Audit Ledger Commit',
    label: 'IMMUTABLE RECORD',
    desc: 'Each submission is hashed with device signature, inspector credentials, and geolocation before committing to central datastore.',
    icon: 'shield',
    detail: 'Signed audit trail published to supervisor verification queue',
    validation: 'Status: Hash 9e4f...32d9 committed (PASSED)',
  },
]

export const OFFLINE_LIFECYCLE = [
  {
    phase: 'PHASE 01',
    title: 'Offline Field Capture',
    subtitle: 'Zero-Network Rural Operation',
    desc: 'When an officer audits remote health centers or deep basements with no cellular signal, the client operates entirely from a local encrypted SQLite database.',
    points: [
      'Full checklist accessible offline',
      'Geotagged photos cached with AES-256 encryption',
      'Local timestamp and GPS signature preserved',
    ],
    badge: '100% Offline Resilient',
  },
  {
    phase: 'PHASE 02',
    title: 'Store-and-Forward Sync',
    subtitle: 'Automated Connectivity Handshake',
    desc: 'The instant mobile telemetry detects cellular or Wi-Fi connectivity, an automated synchronization service safely uploads buffered records with exponential backoff.',
    points: [
      'Automatic network state listener',
      'Chunked multipart upload to prevent data truncation',
      'Zero duplicate submissions via idempotency keys',
    ],
    badge: 'Zero Packet Loss',
  },
  {
    phase: 'PHASE 03',
    title: 'Central Verification & Alerting',
    subtitle: 'HQ Ingestion & Triage',
    desc: 'The backend gateway receives the payload, verifies cryptographic signatures, updates supervisor dashboards, and triggers instant alerts if compliance thresholds fail.',
    points: [
      'Sub-500ms WebSocket broadcast on critical flags',
      'Immutable audit trail updated in MongoDB Atlas',
      'Public redressal dashboard reflects verified outcome',
    ],
    badge: 'Sub-Second Escalation',
  },
] as const

export const PRODUCT_SURFACES = [
  {
    id: 'inspector',
    title: 'Inspector Mobile Application',
    tag: 'ON-SITE FIELD CLIENT',
    desc: 'Engineered with React Native and Expo for budget Android hardware. Operates offline in rural locations, handles dynamic QR scans, and captures tamper-proof evidence.',
    features: [
      'Hardware GPS enforcement with mock-location stripping',
      'Direct in-app camera with EXIF metadata stamping',
      'Local SQLite storage with automatic store-and-forward',
      'Surprise duty assignment notification 60–90m prior',
    ],
    spec: 'React Native • Expo • SQLite • Native Camera & Location API',
  },
  {
    id: 'command',
    title: 'Command & Operations Center',
    tag: 'SUPERVISOR DESK',
    desc: 'Real-time administrative portal built for District Collectors and nodal heads. Provides live geofence radar, high-priority alert queues, and remote RTSP streaming.',
    features: [
      'Sub-500ms WebSocket incident alert broadcast',
      'Live geofence radar showing active inspector proximity',
      'Mandatory proof-of-fix verification workflow',
      'RTSP/HLS surveillance gateway and WebRTC audio intercom',
    ],
    spec: 'Next.js • Fastify Gateway • Socket.io • MongoDB Atlas • RTSP/HLS',
  },
] as const

export const SIMULATED_AUDITS = [
  {
    id: 'IR-1048',
    facility: 'District Healthcare Unit #0482',
    inspector: 'Inspector Anand V. (#4092)',
    distance: '38.2m (Inside 150m)',
    time: '09:42 AM',
    status: 'Flagged Anomaly',
    severity: 'high',
    flag: 'Cold-chain vaccine refrigeration temperature out of range (8.4°C vs 2-6°C mandate).',
  },
  {
    id: 'IR-1049',
    facility: 'Rural Child Development Center #0119',
    inspector: 'Inspector Priya S. (#3814)',
    distance: '19.4m (Inside 150m)',
    time: '10:15 AM',
    status: 'Verified Clean',
    severity: 'low',
    flag: 'All 18 compliance parameters verified with geotagged photographic evidence.',
  },
  {
    id: 'IR-1050',
    facility: 'Sub-Division Grain Depot #0704',
    inspector: 'Inspector Rajesh K. (#5102)',
    distance: '44.8m (Inside 150m)',
    time: '11:02 AM',
    status: 'Pending Proof-of-Fix',
    severity: 'medium',
    flag: 'Structural perimeter sealant breach noted. Facility head instructed to rectify in 48h.',
  },
] as const

export const TECH_SPECS = [
  { category: 'Mobile Client', tech: 'React Native / Expo', detail: 'Cross-platform, low battery overhead, native hardware sensor access' },
  { category: 'Local Persistence', tech: 'SQLite / AES-256', detail: 'Encrypted offline store-and-forward database' },
  { category: 'Backend Gateway', tech: 'Fastify / Node.js', detail: 'High-throughput asynchronous REST endpoints' },
  { category: 'Real-Time Pipeline', tech: 'Socket.io WebSockets', detail: 'Sub-500ms bidirectional event streaming for command desks' },
  { category: 'Cloud Datastore', tech: 'MongoDB Atlas', detail: 'Document-based flexible schema with geo-spatial index support' },
  { category: 'Media & Streaming', tech: 'RTSP / HLS & Cloudinary', detail: 'Remote CCTV stream integration and secure evidence CDN' },
] as const
