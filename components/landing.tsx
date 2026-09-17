'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Icon } from './icon'
import {
  LINKS,
  PROJECT_INFO,
  CORE_METRICS,
  TRUST_ENGINE_STEPS,
  OFFLINE_LIFECYCLE,
  PRODUCT_SURFACES,
  SIMULATED_AUDITS,
  TECH_SPECS,
} from '@/lib/content'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div className={cn('reveal', className)} style={{ '--delay': `${delay}s` } as CSSProperties}>
      {children}
    </div>
  )
}

function MagneticButton({
  href,
  children,
  secondary = false,
  target,
  onClick,
}: {
  href?: string
  children: ReactNode
  secondary?: boolean
  target?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const frame = useRef<number | null>(null)

  const handleMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = el.getBoundingClientRect()
    const dx = (event.clientX - box.left - box.width / 2) * 0.08
    const dy = (event.clientY - box.top - box.height / 2) * 0.12
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => el.style.setProperty('--mx', `${dx}px`))
    el.style.setProperty('--my', `${dy}px`)
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <a
      ref={ref}
      href={href || '#'}
      target={target}
      rel={target ? 'noreferrer' : undefined}
      onClick={onClick}
      className={cn('magnetic-btn', secondary ? 'magnetic-btn--secondary' : 'magnetic-btn--primary')}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <span>{children}</span>
      <Icon name="arrowUp" size={15} />
    </a>
  )
}

function Logo() {
  return (
    <a href="#top" className="brand" aria-label="NIRIKSHAN Home">
      <span className="brand-mark">
        <span>N</span>
        <i />
      </span>
      <span>
        <strong>{PROJECT_INFO.name}</strong>
        <small>{PROJECT_INFO.team} • {PROJECT_INFO.problemId}</small>
      </span>
    </a>
  )
}

function QRModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Inspector APK Download QR"
      onMouseDown={onClose}
    >
      <div className="qr-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          <Icon name="close" size={18} />
        </button>
        <div className="eyebrow eyebrow--emerald">OFFICIAL ANDROID CLIENT</div>
        <h3>Scan to Install Inspector App</h3>
        <p>Point any Android camera or QR scanner to download the signed v1.0.0 APK release.</p>
        <div className="qr-frame">
          <img src="/nirikshan-app-qr.svg" alt="NIRIKSHAN Inspector App QR Code" />
        </div>
        <div className="modal-badges">
          <span><Icon name="shield" size={13} /> Hardware Verified</span>
          <span><Icon name="wifi" size={13} /> 100% Offline Ready</span>
        </div>
        <a className="modal-download-btn" href={LINKS.app} target="_blank" rel="noreferrer">
          <Icon name="download" size={16} /> Direct APK Download
        </a>
      </div>
    </div>
  )
}

function Nav({ onQr }: { onQr: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-shell">
      <div className="nav">
        <Logo />
        <nav className={cn('desktop-nav', open && 'desktop-nav--open')}>
          <a href="#surfaces" onClick={() => setOpen(false)}>Surfaces</a>
          <a href="#trust-engine" onClick={() => setOpen(false)}>Trust Engine</a>
          <a href="#offline-flow" onClick={() => setOpen(false)}>Offline → Sync</a>
          <a href="#dashboard" onClick={() => setOpen(false)}>Command Center</a>
          <a href="#specs" onClick={() => setOpen(false)}>Specifications</a>
        </nav>
        <div className="nav-actions">
          <button className="nav-qr-btn" onClick={onQr} aria-label="Scan App QR Code">
            <Icon name="qr" size={14} />
            <span>Scan APK</span>
          </button>
          <a className="nav-primary-btn" href={LINKS.portal} target="_blank" rel="noreferrer">
            <span>Live Portal</span>
            <Icon name="arrowUp" size={13} />
          </a>
          <button
            className="menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <Icon name={open ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onQr }: { onQr: () => void }) {
  return (
    <section id="top" className="hero section-pad">
      <div className="container hero-grid">
        <div className="hero-content">
          <Reveal>
            <div className="hero-status-pill">
              <span className="status-ping" />
              <strong>{PROJECT_INFO.hackathon}</strong>
              <span className="meta-sep">/</span>
              <span>PROBLEM ID {PROJECT_INFO.problemId}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="hero-title">
              Physical presence verified.
              <br />
              <span className="text-emerald">Zero ghost inspections.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="hero-desc">
              NIRIKSHAN binds government field audits to a <strong>150m Haversine GPS geofence</strong> and
              <strong>dynamic wall QR codes</strong>. Real-time verification for inspectors on-site and
              command teams at headquarters with complete offline resilience.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="hero-actions">
              <MagneticButton href={LINKS.portal} target="_blank">
                Launch Command Center
              </MagneticButton>
              <MagneticButton href={LINKS.demo} secondary target="_blank">
                <Icon name="play" size={15} /> Watch Demonstration
              </MagneticButton>
              <button className="hero-app-btn" onClick={onQr} aria-label="Download Inspector App">
                <Icon name="qr" size={16} />
                <span>Get Inspector App</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="hero-metric-ticker">
              <div className="ticker-item">
                <Icon name="pin" size={13} />
                <span>150m Geofence Lock</span>
              </div>
              <div className="ticker-item">
                <Icon name="bolt" size={13} />
                <span>&lt;500ms Socket Alerts</span>
              </div>
              <div className="ticker-item">
                <Icon name="wifi" size={13} />
                <span>SQLite Store-and-Forward</span>
              </div>
              <div className="ticker-item">
                <Icon name="shield" size={13} />
                <span>Cryptographic Audit Trail</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="hero-visual-col" delay={0.14}>
          <div className="hero-telemetry-card">
            <div className="telemetry-top">
              <div className="telemetry-live">
                <span className="live-indicator-dot" />
                <span>ACTIVE INSPECTION IN PROGRESS</span>
              </div>
              <span className="telemetry-badge">FACILITY #0482</span>
            </div>

            <div className="hero-preview-frame">
              <img
                src="/hero-inspector.jpg"
                alt="Field Inspector verifying physical presence with dynamic QR code"
                className="hero-card-img"
              />
              <div className="preview-overlay">
                <div className="overlay-geofence-box">
                  <Icon name="pin" size={13} />
                  <span>38.2m from target • Geofence Verified</span>
                </div>
              </div>
            </div>

            <div className="telemetry-bottom-grid">
              <div>
                <small>INSPECTION ASSIGNMENT</small>
                <strong>Surprise Allocation (T-74m)</strong>
              </div>
              <div className="grid-sep" />
              <div>
                <small>IMAGE SOURCE</small>
                <strong>Direct Camera Stream</strong>
              </div>
              <div className="grid-sep" />
              <div>
                <small>INTEGRITY HASH</small>
                <strong className="text-emerald">SHA-256 Validated</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProductSurfaces() {
  const [activeSurface, setActiveSurface] = useState<'inspector' | 'command'>('inspector')

  return (
    <section id="surfaces" className="section-pad surfaces-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="eyebrow eyebrow--emerald">TWO SIDES OF THE PLATFORM</div>
            <h2>Built for the Field Officer & the Command Center</h2>
            <p>
              NIRIKSHAN is designed as a synchronized system: an ultra-lightweight client for rugged
              field devices and an operations console for supervisory oversight.
            </p>

            <div className="surface-selector-pill">
              <button
                className={cn('surface-tab-btn', activeSurface === 'inspector' && 'surface-tab-btn--active')}
                onClick={() => setActiveSurface('inspector')}
              >
                <Icon name="pin" size={15} />
                <span>Inspector Mobile Client</span>
              </button>
              <button
                className={cn('surface-tab-btn', activeSurface === 'command' && 'surface-tab-btn--active')}
                onClick={() => setActiveSurface('command')}
              >
                <Icon name="radar" size={15} />
                <span>Command & Operations Center</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="surface-showcase-card">
          {activeSurface === 'inspector' ? (
            <div className="surface-grid">
              <div className="surface-text">
                <span className="surface-tag">REACT NATIVE / EXPO • SQLITE</span>
                <h3>Field Inspector Mobile Application</h3>
                <p>
                  Built for field conditions with spotty network coverage and budget hardware. The client
                  enforces physical presence using hardware location sensors and camera APIs while
                  prohibiting mock locations or stored gallery uploads.
                </p>

                <ul className="surface-feature-list">
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>150m Geofence Lock:</strong> Audit forms remain strictly disabled until distance to registered facility is verified.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Dynamic QR Handshake:</strong> Reads on-site QR codes with rotating cryptographically salted tokens.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Encrypted SQLite Cache:</strong> Completes audits in full offline mode, queueing evidence safely until connectivity resumes.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Direct In-App Camera:</strong> Strips gallery upload access to eliminate fraudulent or repurposed photography.</span>
                  </li>
                </ul>

                <div className="surface-meta-strip">
                  <span>Architecture: <strong>React Native • SQLite • Native Keystore</strong></span>
                </div>
              </div>

              <div className="surface-visual">
                <div className="mock-phone-frame">
                  <div className="mock-phone-header">
                    <span>NIRIKSHAN CLIENT</span>
                    <span>4G • 94%</span>
                  </div>
                  <div className="mock-phone-body">
                    <div className="client-status-card">
                      <span className="status-dot-emerald" />
                      <div>
                        <strong>Physical Presence Verified</strong>
                        <small>Haversine Distance: 38.2m (Target: &lt;150m)</small>
                      </div>
                    </div>

                    <div className="client-evidence-box">
                      <small>CHECKLIST PROGRESS</small>
                      <strong>18 of 18 Parameters Verified</strong>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div className="client-tag-row">
                      <span>Camera: EXIF Signed</span>
                      <span>SQLite: Synced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="surface-grid">
              <div className="surface-text">
                <span className="surface-tag">FASTIFY • SOCKET.IO • MONGODB ATLAS</span>
                <h3>Command & Operations Center</h3>
                <p>
                  The administrative cockpit for District Collectors, State Observers, and department
                  heads. Provides instant visibility into active field audits, flag escalations, and
                  geofence proximity.
                </p>

                <ul className="surface-feature-list">
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Sub-500ms Incident Broadcast:</strong> WebSocket alerts trigger when high-severity non-compliance items are detected.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Geofence Radar Cockpit:</strong> Real-time map visualization of inspector proximity across active facilities.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>Proof-of-Fix Mandate:</strong> Tickets cannot be marked resolved without photographic verification audited by secondary desk.</span>
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    <span><strong>RTSP Remote Watch:</strong> Integration hook for live surveillance feeds during high-stakes sensitive inspections.</span>
                  </li>
                </ul>

                <div className="surface-meta-strip">
                  <span>Stack: <strong>Next.js • Fastify • Socket.io • MongoDB Atlas</strong></span>
                </div>
              </div>

              <div className="surface-visual">
                <div className="mock-terminal-frame">
                  <div className="mock-terminal-header">
                    <span>OPS MONITOR // INCIDENT QUEUE</span>
                    <span>WEBSOCKET: ACTIVE</span>
                  </div>
                  <div className="mock-terminal-body">
                    <div className="terminal-incident-entry">
                      <div className="entry-header">
                        <span className="badge-flag">CRITICAL NON-COMPLIANCE</span>
                        <small>09:42:15 AM</small>
                      </div>
                      <strong>Facility #0482: Storage Temperature Deviation</strong>
                      <p>Cold-chain vaccine refrigeration logged at 8.4°C (Mandate: 2–6°C). Secondary desk alerted.</p>
                      <code>Latency: 342ms • Audit ID #IR-1048 • WebSocket Broadcast Sent</code>
                    </div>

                    <div className="terminal-status-row">
                      <span>Active Field Audits: <strong>14</strong></span>
                      <span>Flagged Incidents: <strong>2</strong></span>
                      <span>Resolved Today: <strong>9</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TrustEngine() {
  const [activeStep, setActiveStep] = useState(0)
  const current = TRUST_ENGINE_STEPS[activeStep]

  return (
    <section id="trust-engine" className="section-pad trust-engine-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="eyebrow eyebrow--emerald">VERIFICATION PIPELINE</div>
            <h2>The Verification & Trust Engine</h2>
            <p>
              Four cryptographic layers enforce integrity at every step of the inspection, ensuring that
              records cannot be falsified, backdated, or submitted remotely.
            </p>
          </div>
        </Reveal>

        <div className="engine-layout">
          <div className="engine-nav-list">
            {TRUST_ENGINE_STEPS.map((step, idx) => (
              <button
                key={step.id}
                className={cn('engine-nav-item', idx === activeStep && 'engine-nav-item--active')}
                onClick={() => setActiveStep(idx)}
              >
                <div className="step-num-badge">{step.id}</div>
                <div className="step-nav-info">
                  <span className="step-nav-label">{step.label}</span>
                  <strong>{step.title}</strong>
                </div>
                {idx === activeStep && <div className="engine-nav-indicator" />}
              </button>
            ))}
          </div>

          <div className="engine-display-panel">
            <div className="engine-panel-card">
              <div className="panel-header">
                <div className="panel-badge-wrap">
                  <span className="panel-step-tag">LAYER {current.id} // {current.label}</span>
                </div>
                <span className="panel-valid-tag">{current.validation}</span>
              </div>

              <h3>{current.title}</h3>
              <p className="panel-desc">{current.desc}</p>

              <div className="panel-code-box">
                <div className="code-label">CRYPTOGRAPHIC INTEGRITY PROTOCOL</div>
                <code>{current.detail}</code>
              </div>

              <div className="engine-indicators">
                <div className="indicator-item">
                  <Icon name="shield" size={15} />
                  <span>Tamper-Resistant</span>
                </div>
                <div className="indicator-item">
                  <Icon name="check" size={15} />
                  <span>Hardware Enforced</span>
                </div>
                <div className="indicator-item">
                  <Icon name="lock" size={15} />
                  <span>Cryptographically Signed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OfflineLifecycle() {
  return (
    <section id="offline-flow" className="section-pad offline-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="eyebrow eyebrow--emerald">OPERATIONAL RESILIENCE</div>
            <h2>Offline → Sync → Verified</h2>
            <p>
              Inspections in rural villages and concrete infrastructure often have zero network coverage.
              NIRIKSHAN guarantees zero data loss through an automated store-and-forward lifecycle.
            </p>
          </div>
        </Reveal>

        <div className="lifecycle-grid">
          {OFFLINE_LIFECYCLE.map((phase, i) => (
            <Reveal key={phase.phase} delay={i * 0.08}>
              <div className="lifecycle-card">
                <div className="lifecycle-top">
                  <span className="lifecycle-phase-tag">{phase.phase}</span>
                  <span className="lifecycle-badge">{phase.badge}</span>
                </div>

                <div className="lifecycle-art-box">
                  <img
                    src={
                      i === 0
                        ? '/doodle-offline-sync.png'
                        : i === 1
                        ? '/doodle-notify-bell.png'
                        : '/doodle-citizen-stream.png'
                    }
                    alt={phase.title}
                    className="lifecycle-doodle-img"
                    loading="lazy"
                  />
                </div>

                <div className="lifecycle-body">
                  <small className="lifecycle-sub">{phase.subtitle}</small>
                  <h3>{phase.title}</h3>
                  <p>{phase.desc}</p>
                </div>

                <ul className="lifecycle-points">
                  {phase.points.map((pt) => (
                    <li key={pt}>
                      <Icon name="check" size={13} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RealTimeDashboard() {
  const [filter, setFilter] = useState<'all' | 'flagged' | 'verified'>('all')

  const filtered = SIMULATED_AUDITS.filter((item) => {
    if (filter === 'flagged') return item.severity === 'high' || item.severity === 'medium'
    if (filter === 'verified') return item.severity === 'low'
    return true
  })

  return (
    <section id="dashboard" className="section-pad dashboard-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="eyebrow eyebrow--emerald">REAL-TIME MONITORING CONSOLE</div>
            <h2>Supervisory Operations & Audit Telemetry</h2>
            <p>
              District collectors and state nodal officers monitor active field inspections, review
              geotagged compliance flags, and mandate photographic proof-of-fix.
            </p>

            <div className="dashboard-filter-bar">
              <button
                className={cn('filter-btn', filter === 'all' && 'filter-btn--active')}
                onClick={() => setFilter('all')}
              >
                All Audits ({SIMULATED_AUDITS.length})
              </button>
              <button
                className={cn('filter-btn', filter === 'flagged' && 'filter-btn--active')}
                onClick={() => setFilter('flagged')}
              >
                Flagged Non-Compliance (2)
              </button>
              <button
                className={cn('filter-btn', filter === 'verified' && 'filter-btn--active')}
                onClick={() => setFilter('verified')}
              >
                Verified Clean (1)
              </button>
            </div>
          </div>
        </Reveal>

        <div className="dashboard-table-card">
          <div className="table-header-strip">
            <div className="strip-title">
              <span className="live-ping-dot" />
              <strong>LIVE AUDIT FEED</strong>
              <small>WEBSOCKET PING: 284ms • CONNECTED</small>
            </div>
            <span className="strip-meta">3 ACTIVE SECTORS MONITORED</span>
          </div>

          <div className="audit-list">
            {filtered.map((audit) => (
              <div key={audit.id} className={cn('audit-row', `audit-row--${audit.severity}`)}>
                <div className="row-id-cell">
                  <span className="audit-id-tag">{audit.id}</span>
                  <small className="audit-time">{audit.time}</small>
                </div>

                <div className="row-facility-cell">
                  <strong>{audit.facility}</strong>
                  <div className="row-meta-sub">
                    <span>{audit.inspector}</span>
                    <span className="meta-sep">•</span>
                    <span className="text-emerald">{audit.distance}</span>
                  </div>
                </div>

                <div className="row-flag-cell">
                  <p>{audit.flag}</p>
                </div>

                <div className="row-status-cell">
                  <span className={cn('status-pill', `status-pill--${audit.severity}`)}>
                    {audit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="table-footer-strip">
            <span>Showing verified live inspection events. All records bound to SHA-256 signatures.</span>
            <a href={LINKS.portal} target="_blank" rel="noreferrer" className="table-portal-link">
              Open Full Portal <Icon name="arrow" size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricsSection() {
  return (
    <section className="metrics-strip">
      <div className="container">
        <div className="metrics-grid">
          {CORE_METRICS.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 0.06}>
              <div className="metric-cell">
                <strong className="metric-number">{item.value}</strong>
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecificationsSection() {
  return (
    <section id="specs" className="section-pad specs-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="eyebrow eyebrow--emerald">TECHNICAL SPECIFICATIONS</div>
            <h2>Engineered for Scale and Strict Security</h2>
            <p>
              Architected with modular boundaries between field capture, API gateway, media routing,
              and immutable datastores.
            </p>
          </div>
        </Reveal>

        <div className="specs-table-card">
          <div className="specs-grid">
            {TECH_SPECS.map((spec) => (
              <div key={spec.category} className="spec-item">
                <small className="spec-category">{spec.category}</small>
                <strong>{spec.tech}</strong>
                <p>{spec.detail}</p>
              </div>
            ))}
          </div>

          <div className="specs-footer-bar">
            <div>
              <small>SMART INDIA HACKATHON 2026</small>
              <strong>Problem ID: {PROJECT_INFO.problemId} • {PROJECT_INFO.team}</strong>
            </div>
            <div className="specs-links">
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={15} /> GitHub Repository
              </a>
              <a href={LINKS.report} target="_blank" rel="noreferrer">
                Project Report (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DownloadBanner({ onQr }: { onQr: () => void }) {
  return (
    <section className="section-pad download-banner-section">
      <div className="container">
        <Reveal>
          <div className="download-banner-card">
            <div className="banner-content">
              <div className="eyebrow eyebrow--emerald">EVALUATION READY</div>
              <h2>Deploy the Inspector App On Any Android Device</h2>
              <p>
                Experience NIRIKSHAN first-hand. Scan the QR code with your mobile camera or download
                the signed APK package directly.
              </p>
              <div className="banner-actions">
                <MagneticButton href={LINKS.app} target="_blank">
                  <Icon name="download" size={16} /> Download Inspector APK
                </MagneticButton>
                <MagneticButton href={LINKS.portal} secondary target="_blank">
                  Open Command Center
                </MagneticButton>
                <button className="banner-qr-trigger" onClick={onQr}>
                  <Icon name="qr" size={16} /> Scan QR Code
                </button>
              </div>
            </div>

            <div className="banner-qr-interactive" onClick={onQr} role="button" tabIndex={0}>
              <span>OFFICIAL APK QR</span>
              <div className="banner-qr-box">
                <img src="/nirikshan-app-qr.svg" alt="Inspector App QR Code" />
              </div>
              <small>Click to enlarge QR code</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            NIRIKSHAN — Smart Real-Time Monitoring & Physical Presence Inspection Platform.
            <br />
            Built for Smart India Hackathon 2026.
            <br />
            Problem Statement: {PROJECT_INFO.problemId} • {PROJECT_INFO.team}.
          </p>
        </div>

        <div className="footer-links-grid">
          <div>
            <small>PLATFORM</small>
            <a href="#surfaces">Inspector App</a>
            <a href="#surfaces">Command Center</a>
            <a href="#trust-engine">Trust Engine</a>
            <a href="#offline-flow">Offline Lifecycle</a>
          </div>
          <div>
            <small>EVALUATION</small>
            <a href={LINKS.portal} target="_blank" rel="noreferrer">Live Portal ↗</a>
            <a href={LINKS.report} target="_blank" rel="noreferrer">Project Report (PDF) ↗</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">Source Code ↗</a>
            <a href={LINKS.demo} target="_blank" rel="noreferrer">Demonstration Video ↗</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 {PROJECT_INFO.name} • {PROJECT_INFO.team}. All Rights Reserved.</span>
        <span>Physical Presence Verification • Zero Ghost Inspections</span>
      </div>
    </footer>
  )
}

export default function Landing() {
  const [qrOpen, setQrOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      items.forEach((el) => el.classList.add('reveal--visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />
      <Nav onQr={() => setQrOpen(true)} />
      <main>
        <Hero onQr={() => setQrOpen(true)} />
        <ProductSurfaces />
        <TrustEngine />
        <OfflineLifecycle />
        <RealTimeDashboard />
        <MetricsSection />
        <SpecificationsSection />
        <DownloadBanner onQr={() => setQrOpen(true)} />
      </main>
      <Footer />
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  )
}
