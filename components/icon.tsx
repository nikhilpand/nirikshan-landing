import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }

export function Icon({ name, size = 20, ...rest }: Props & { name: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  }

  switch (name) {
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )
    case 'arrowUp':
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      )
    case 'download':
      return (
        <svg {...common}>
          <path d="M12 3v11" />
          <path d="m8 10 4 4 4-4" />
          <path d="M5 20h14" />
        </svg>
      )
    case 'play':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8 5 4-5 4z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'qr':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <path d="M15 14h2v2h-2zM19 14h1M14 18h3v2h-3zM19 18h1v2h-1z" />
        </svg>
      )
    case 'camera':
      return (
        <svg {...common}>
          <path d="M4 7h3l1.5-2h7L17 7h3v12H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
          <path d="m8.5 12 2.2 2.2 4.8-4.8" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...common}>
          <path d="m13 2-9 12h7l-1 8 9-12h-7z" />
        </svg>
      )
    case 'wifi':
      return (
        <svg {...common}>
          <path d="M4 9a12 12 0 0 1 16 0" />
          <path d="M7 12a7.5 7.5 0 0 1 10 0" />
          <path d="M10 15a3.2 3.2 0 0 1 4 0" />
          <path d="M12 19h.01" />
        </svg>
      )
    case 'video':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="m16 10 5-3v10l-5-3z" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path d="M9 19c-4 .8-4-2-5-2m10 4v-3.1c0-1 .1-1.4-.5-2 2.6-.3 5.3-1.3 5.3-5.7 0-1.3-.5-2.4-1.3-3.3.1-.3.6-1.6-.1-3.2 0 0-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C5.8 2.4 4.8 2.7 4.8 2.7c-.7 1.6-.2 2.9-.1 3.2A4.8 4.8 0 0 0 3.4 9c0 4.4 2.7 5.4 5.3 5.7-.5.5-.5 1.1-.5 2v3.1" />
        </svg>
      )
    case 'bot':
      return (
        <svg {...common}>
          <path d="M12 2v2M4 11a8 8 0 0 1 16 0c0 4.4-3.6 8-8 8s-8-3.6-8-8zM9 11h.01M15 11h.01M2 13h2M20 13h2" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="m12 3 1.9 4.9L19 10l-5.1 2.1L12 17l-1.9-4.9L5 10l5.1-2.1zM19 17l.9 2.1L22 20l-2.1.9L19 23l-.9-2.1L16 20l2.1-.9zM5 19l.7 1.4L7 21l-1.3.6L5 23l-.7-1.4L3 21l1.3-.6z" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'radar':
      return (
        <svg {...common}>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
          <path d="M12 3v9l6 3" />
        </svg>
      )
    case 'terminal':
      return (
        <svg {...common}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}
