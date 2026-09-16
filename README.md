# NIRIKSHAN — SIH 2026 Landing Page

Bright, modern Next.js landing page for Team SquareX / SIH26095.

## Run

```bash
npm install
npm run dev
```

## Important

The root `<html>` uses `suppressHydrationWarning` because browser extensions can inject attributes into the document before React hydration. The Next.js docs explicitly list browser extensions as a cause of hydration mismatch warnings.

The landing page also keeps scroll progress updates out of React state, so scrolling does not trigger a full component re-render on every event.

## Links

- Officer APK: https://github.com/erkrishna69/SIH/releases/download/v1.0.0/NIRIKSHAN-Officer-App.apk
- Live portal: https://nirikshan.gov.in
- Demo: https://youtu.be/nirikshan-sih-demo
