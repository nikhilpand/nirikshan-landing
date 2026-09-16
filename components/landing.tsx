'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Icon } from './icon'
import { LINKS, gaps, stack, workflow } from '@/lib/content'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={cn('reveal', className)} style={{ '--delay': `${delay}s` } as CSSProperties}>{children}</div>
}

function MagneticButton({ href, children, secondary = false, target }: { href: string; children: ReactNode; secondary?: boolean; target?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const frame = useRef<number | null>(null)
  const handleMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = el.getBoundingClientRect()
    const dx = (event.clientX - box.left - box.width / 2) * 0.10
    const dy = (event.clientY - box.top - box.height / 2) * 0.14
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
  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current) }, [])
  return (
    <a ref={ref} href={href} target={target} rel={target ? 'noreferrer' : undefined} className={cn('magnetic-btn', secondary ? 'magnetic-btn--secondary' : 'magnetic-btn--primary')} onMouseMove={handleMove} onMouseLeave={reset}>
      <span>{children}</span><Icon name="arrowUp" size={17} />
    </a>
  )
}

function Logo() {
  return <a href="#top" className="brand" aria-label="NIRIKSHAN home">
    <span className="brand-mark"><span>N</span><i /></span>
    <span><strong>NIRIKSHAN</strong><small>TEAM SQUAREX • SIH 2026</small></span>
  </a>
}

function QRModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previous }
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="NIRIKSHAN officer app QR code" onMouseDown={onClose}>
    <div className="qr-modal" onMouseDown={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
      <div className="eyebrow eyebrow--sky">OFFICER APP</div>
      <h3>Scan to install NIRIKSHAN.</h3>
      <p>Open the camera on your phone and scan this code.</p>
      <div className="qr-large"><img src="/nirikshan-app-qr.svg" alt="QR code to download the NIRIKSHAN Officer App" /></div>
      <a className="modal-download" href={LINKS.app}><Icon name="download" size={17}/> Download APK directly</a>
    </div>
  </div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  return <header className="nav-shell">
    <div className="nav">
      <Logo />
      <nav className={cn('desktop-nav', open && 'desktop-nav--open')}>
        <a href="#problem" onClick={() => setOpen(false)}>Why</a>
        <a href="#control" onClick={() => setOpen(false)}>Control layer</a>
        <a href="#architecture" onClick={() => setOpen(false)}>Technology</a>
        <a href="#impact" onClick={() => setOpen(false)}>Impact</a>
      </nav>
      <div className="nav-actions"><a className="nav-pill" href={LINKS.portal} target="_blank" rel="noreferrer">Live portal <Icon name="arrowUp" size={14}/></a><button className="menu-btn" onClick={() => setOpen(v => !v)} aria-label="Toggle navigation"><Icon name={open ? 'close' : 'menu'} size={20}/></button></div>
    </div>
  </header>
}

function HeroVisual({ onQr }: { onQr: () => void }) {
  return <div className="hero-visual">
    <div className="orb orb--yellow"/><div className="orb orb--sky"/><div className="orb orb--mint"/>
    <div className="hero-card">
      <div className="hero-card__top"><div><span>LIVE INSPECTION</span><strong>Facility #0482</strong></div><b><i/> VERIFIED</b></div>
      <div className="map-panel">
        <div className="map-grid"/>
        <div className="map-road road-a"/><div className="map-road road-b"/><div className="map-road road-c"/>
        <div className="geofence geofence--outer"/><div className="geofence geofence--inner"/><div className="map-pin"><span/></div>
        <div className="map-label map-label--top"><Icon name="pin" size={15}/> Within 150m <b>VERIFIED</b></div>
        <div className="scan-sweep"/>
        <div className="qr-scene" onClick={onQr} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onQr() }} aria-label="Open NIRIKSHAN app QR code">
          <div className="qr-scene__glow"/><div className="qr-scene__panel"><img src="/nirikshan-app-qr.svg" alt="NIRIKSHAN app QR"/><span>SCAN APP</span></div>
        </div>
      </div>
      <div className="hero-mini-grid">
        <div><span className="mini-icon mini-icon--sky"><Icon name="qr" size={18}/></span><small>QR LOCK</small><strong>Verified</strong></div>
        <div><span className="mini-icon mini-icon--mint"><Icon name="camera" size={18}/></span><small>EVIDENCE</small><strong>Geotagged</strong></div>
        <div><span className="mini-icon mini-icon--yellow"><Icon name="bolt" size={18}/></span><small>ALERTS</small><strong>Live</strong></div>
      </div>
    </div>
    <div className="float-card float-card--left"><span className="status-dot status-dot--mint"><Icon name="shield" size={17}/></span><div><small>PHYSICAL PRESENCE</small><strong>QR + GPS locked</strong></div></div>
    <div className="float-card float-card--right"><span className="status-dot status-dot--yellow"><Icon name="bolt" size={17}/></span><div><small>RESPONSE</small><strong>&lt; 500ms alerts</strong></div></div>
    <div className="scroll-cue"><span/><small>Scroll to explore</small></div>
  </div>
}

function Hero({ onQr }: { onQr: () => void }) {
  return <section id="top" className="hero section-pad">
    <div className="background-lines"/><div className="hero-glow hero-glow--one"/><div className="hero-glow hero-glow--two"/>
    <div className="container hero-grid">
      <div className="hero-copy">
        <Reveal><div className="eyebrow"><span className="live-dot"/> SMART INDIA HACKATHON 2026 <em>•</em> SIH26095</div></Reveal>
        <Reveal delay={0.05}><h1>Inspect.<br/><span>Verify.</span><br/>Create real <u>impact.</u></h1></Reveal>
        <Reveal delay={0.1}><p className="hero-lede">NIRIKSHAN turns field inspections into a live, evidence-backed control loop — verify presence, capture proof and trigger action without waiting for the paperwork.</p></Reveal>
        <Reveal delay={0.15}><div className="hero-ctas"><MagneticButton href={LINKS.portal}>Open NIRIKSHAN portal</MagneticButton><MagneticButton href={LINKS.demo} secondary target="_blank"><Icon name="play" size={16}/> Watch demo</MagneticButton></div></Reveal>
        <Reveal delay={0.2}><div className="trust-row"><span><Icon name="qr" size={15}/> QR + 150m GPS</span><span><Icon name="bolt" size={15}/> Live alerts</span><span><Icon name="wifi" size={15}/> Offline ready</span><span><Icon name="shield" size={15}/> Evidence-first</span></div></Reveal>
      </div>
      <Reveal className="hero-visual-wrap" delay={0.12}><HeroVisual onQr={onQr}/></Reveal>
    </div>
  </section>
}

function SectionTitle({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body?: string; dark?: boolean }) {
  return <div className={cn('section-title', dark && 'section-title--dark')}><div className="eyebrow">{eyebrow}</div><h2 dangerouslySetInnerHTML={{ __html: title }}/>{body && <p>{body}</p>}</div>
}

function Problem() {
  return <section id="problem" className="section-pad section-soft"><div className="container">
    <Reveal><SectionTitle eyebrow="THE PROBLEM" title="Where trust breaks,<br/><span>verification must step in.</span>" body="The inspection mandate can stay the same. NIRIKSHAN strengthens the layer around it."/></Reveal>
    <div className="gap-grid">{gaps.map(([n, title, desc], i) => <Reveal key={n} delay={i * 0.05}><article className={cn('gap-card', `gap-card--${i + 1}`)}><span>{n}</span><div className="gap-accent"/><h3>{title}</h3><p>{desc}</p></article></Reveal>)}</div>
  </div></section>
}

function Workflow() {
  return <section id="control" className="workflow section-pad"><div className="workflow-glow"/><div className="container">
    <Reveal><SectionTitle dark eyebrow="THE CONTROL LAYER" title="One continuous loop.<br/><span>Five moments of proof.</span>" body="From surprise assignment to proof-of-fix, every meaningful step leaves a trace."/></Reveal>
    <div className="workflow-path">
      {workflow.map(([n, title, desc, icon], i) => <div className="workflow-step" key={n}><div className="workflow-node"><span>{n}</span><div className="node-icon"><Icon name={icon} size={23}/></div></div><h3>{title}</h3><p>{desc}</p>{i < workflow.length - 1 && <div className="workflow-connector"><i/></div>}</div>)}
    </div>
    <Reveal delay={0.12}><div className="workflow-foot"><span><Icon name="lock" size={17}/> Tamper-resistant audit trail</span><span><Icon name="camera" size={17}/> Geotagged evidence</span><span><Icon name="wifi" size={17}/> Store-and-forward offline mode</span></div></Reveal>
  </div></section>
}

function LiveProof() {
  return <section className="section-pad proof-section"><div className="container proof-grid"><Reveal><div className="proof-dashboard">
    <div className="dashboard-top"><div><small>SUPERVISOR SIGNAL</small><strong>Issue #IR-1048</strong></div><span>ACTION REQUIRED</span></div>
    <div className="incident"><div className="incident-icon"><Icon name="bolt" size={20}/></div><div><b>Critical checklist mismatch</b><p>Evidence received • geotag attached • remote watch available</p></div></div>
    <div className="incident-bar"><i/></div><div className="incident-labels"><small>TRIAGE</small><small>78% PRIORITY</small></div>
    <div className="dash-cards"><div><Icon name="video" size={19}/><b>Live CCTV</b><small>RTSP / HLS</small></div><div><Icon name="wifi" size={19}/><b>WebRTC call</b><small>Supervisor ready</small></div></div>
  </div></Reveal><Reveal delay={0.08}><div><div className="eyebrow eyebrow--mint">FROM EVIDENCE TO ACTION</div><h2 className="section-head">A report shouldn't<br/><span>sit for seven days.</span></h2><p className="body-copy">NIRIKSHAN turns field evidence into an actionable digital event. Supervisors can see alerts, review proof and record resolution without waiting for a paper trail.</p><div className="metric-grid"><div><strong>&lt;500ms</strong><small>Target alert path</small></div><div><strong>150m</strong><small>Presence geofence</small></div></div></div></Reveal></div></section>
}

function Architecture() {
  return <section id="architecture" className="section-pad section-warm"><div className="container">
    <Reveal><SectionTitle eyebrow="TECHNOLOGY" title="Lightweight in the field.<br/><span>Powerful behind it.</span>" body="A layered system keeps field capture fast while the platform handles authentication, real-time events, cloud data and media transport."/></Reveal>
    <div className="architecture-grid"><div className="stack-list">{stack.map(([tag, title, desc], i) => <Reveal key={tag} delay={i * 0.04}><div className={cn('stack-row', `stack-row--${i + 1}`)}><span>{tag}</span><div><strong>{title}</strong><p>{desc}</p></div><Icon name="arrow" size={18}/></div></Reveal>)}</div><Reveal delay={0.12}><div className="trust-panel"><div className="eyebrow eyebrow--sky">SECURITY & TRUST</div><div className="trust-item"><Icon name="lock" size={20}/><div><b>JWT</b><span>Authenticated API access</span></div></div><div className="trust-item"><Icon name="pin" size={20}/><div><b>QR + GPS</b><span>Physical presence lock</span></div></div><div className="trust-item"><Icon name="shield" size={20}/><div><b>CRYPTO</b><span>Tamper-resistant audit payload</span></div></div><div className="trust-item"><Icon name="wifi" size={20}/><div><b>OFFLINE</b><span>Store-and-forward field resilience</span></div></div><div className="runtime"><small>RUNTIME PATH</small><strong>Assignment → Verification → Evidence → Alert → Resolution</strong></div></div></Reveal></div>
  </div></section>
}

function Impact() {
  return <section id="impact" className="section-pad impact"><div className="container"><Reveal><SectionTitle eyebrow="WHY IT MATTERS" title="Accountability that moves<br/><span>at field speed.</span>" body="NIRIKSHAN focuses on stronger verification, faster intervention and a more auditable operational trail."/></Reveal><div className="impact-grid"><Reveal><article><div className="impact-number">01</div><Icon name="shield" size={24}/><h3>Public fund accountability</h3><p>Unverified inspection outcomes are harder to accept as trusted records.</p></article></Reveal><Reveal delay={0.05}><article><div className="impact-number">02</div><Icon name="bolt" size={24}/><h3>Real-time field oversight</h3><p>Evidence becomes an actionable digital event instead of a delayed report.</p></article></Reveal><Reveal delay={0.1}><article><div className="impact-number">03</div><Icon name="check" size={24}/><h3>Administrative efficiency</h3><p>Less manual follow-up while preserving a traceable audit trail.</p></article></Reveal></div><Reveal delay={0.12}><div className="impact-strip"><div><strong>7 days</strong><span>paper / WhatsApp delay</span></div><i>→</i><div><strong>&lt;500ms</strong><span>target alert path</span></div><div><strong>QR + GPS</strong><span>presence verification</span></div><div><strong>LIVE</strong><span>CCTV + WebRTC</span></div></div></Reveal></div></section>
}

function Download({ onQr }: { onQr: () => void }) {
  return <section id="download" className="section-pad download-section"><div className="container"><Reveal><div className="download-card"><div className="download-orb"/><div className="download-copy"><div className="eyebrow eyebrow--yellow">FOR INSPECTORS</div><h2>Ready for the field?</h2><p>Install the NIRIKSHAN Officer App, or open the live portal to experience the system end-to-end.</p><div className="download-actions"><MagneticButton href={LINKS.app} target="_blank">Download Officer App</MagneticButton><MagneticButton href={LINKS.portal} secondary target="_blank">Open live portal</MagneticButton></div></div><button className="qr-card" onClick={onQr} aria-label="Enlarge Officer App QR code"><span>SCAN TO INSTALL</span><div className="qr-blur"><img src="/nirikshan-app-qr.svg" alt="Officer app QR code"/></div><small>Click to enlarge</small></button></div></Reveal></div></section>
}

function Footer() {
  return <footer><div className="container footer-grid"><div><Logo/><p>NIRIKSHAN — Smart Real-Time Monitoring & Inspection Mobile App.<br/>Team SquareX • SIH 2026 • SIH26095.</p></div><div className="footer-links"><div><small>EXPLORE</small><a href="#problem">Problem</a><a href="#control">Control layer</a><a href="#architecture">Technology</a><a href="#impact">Impact</a></div><div><small>RESOURCES</small><a href={LINKS.portal} target="_blank" rel="noreferrer">Live portal</a><a href={LINKS.report} target="_blank" rel="noreferrer">Project report</a><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a><a href={LINKS.demo} target="_blank" rel="noreferrer">Demo video</a></div></div></div><div className="container footer-bottom"><span>© 2026 NIRIKSHAN — Team SquareX.</span><span>Inspect • Verify • Impact</span></div></footer>
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
    if (reduced) { items.forEach(el => el.classList.add('reveal--visible')); return }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal--visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <div className="site-shell">
    <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }}/><Nav/><main><Hero onQr={() => setQrOpen(true)}/><Problem/><Workflow/><LiveProof/><Architecture/><Impact/><Download onQr={() => setQrOpen(true)}/></main><Footer/><QRModal open={qrOpen} onClose={() => setQrOpen(false)}/>
  </div>
}
