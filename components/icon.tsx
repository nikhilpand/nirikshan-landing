import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }

export function Icon({ name, size = 20, ...rest }: Props & { name: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...rest }
  switch (name) {
    case 'arrow': return <svg {...common}><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>
    case 'arrowUp': return <svg {...common}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
    case 'download': return <svg {...common}><path d="M12 3v11"/><path d="m8 10 4 4 4-4"/><path d="M5 20h14"/></svg>
    case 'play': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m10 8 5 4-5 4z" fill="currentColor" stroke="none"/></svg>
    case 'pin': return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
    case 'qr': return <svg {...common}><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M15 14h2v2h-2zM19 14h1M14 18h3v2h-3zM19 18h1v2h-1z"/></svg>
    case 'camera': return <svg {...common}><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>
    case 'shield': return <svg {...common}><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></svg>
    case 'bolt': return <svg {...common}><path d="m13 2-9 12h7l-1 8 9-12h-7z"/></svg>
    case 'wifi': return <svg {...common}><path d="M4 9a12 12 0 0 1 16 0"/><path d="M7 12a7.5 7.5 0 0 1 10 0"/><path d="M10 15a3.2 3.2 0 0 1 4 0"/><path d="M12 19h.01"/></svg>
    case 'video': return <svg {...common}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></svg>
    case 'lock': return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
    case 'check': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>
    case 'menu': return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    case 'close': return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>
    case 'github': return <svg {...common}><path d="M9 19c-4 .8-4-2-5-2m10 4v-3.1c0-1 .1-1.4-.5-2 2.6-.3 5.3-1.3 5.3-5.7 0-1.3-.5-2.4-1.3-3.3.1-.3.6-1.6-.1-3.2 0 0-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C5.8 2.4 4.8 2.7 4.8 2.7c-.7 1.6-.2 2.9-.1 3.2A4.8 4.8 0 0 0 3.4 9c0 4.4 2.7 5.4 5.3 5.7-.5.5-.5 1.1-.5 2v3.1"/></svg>
    default: return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>
  }
}
