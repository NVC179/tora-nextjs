'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { isSection, sections } from '../lib/sections'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === pathname
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  const [canGoBack, setCanGoBack] = useState(false)
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)
  const [, section, projectId] = pathname.split('/')
  const currentSection = isSection(section ?? '') ? section : ''

  useEffect(() => {
    setCanGoBack(previousPath.current === `/${section}`)
    previousPath.current = pathname
    setMenuPath(pathname === '/' && window.matchMedia('(max-width: 768px)').matches ? pathname : null)
  }, [pathname, section])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 769px)')
    const updateMenu = () => setMenuPath(!desktop.matches && pathname === '/' ? pathname : null)
    desktop.addEventListener('change', updateMenu)
    return () => desktop.removeEventListener('change', updateMenu)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuPath(null)
        toggleRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
        const targets = [toggleRef.current, ...links].filter(Boolean) as HTMLElement[]
        const first = targets[0]
        const last = targets[targets.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const backLink = currentSection && projectId ? (
    <Link className="back-button" href={`/${currentSection}`} onClick={event => {
      if (canGoBack && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
        event.preventDefault()
        router.back()
      }
    }}>← Back to {currentSection}</Link>
  ) : null

  return (
    <div className="desktop">
      <header className="mobile-nav-bar">
        <Link href="/" className="mobile-nav-logo">tôra studio</Link>
        <button ref={toggleRef} type="button" className="mobile-nav-toggle"
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen}
          aria-controls="mobile-navigation" onClick={() => setMenuPath(menuOpen ? null : pathname)}>
          {menuOpen ? '×' : '☰'}
        </button>
      </header>
      {menuOpen && <div className="mobile-nav-overlay" onClick={() => {
        setMenuPath(null); toggleRef.current?.focus()
      }} />}
      <nav ref={menuRef} id="mobile-navigation" aria-label="Menu mobile"
        className={`mobile-nav-dropdown ${menuOpen ? 'active' : ''}`}
        onTouchStart={event => {
          if (event.touches.length !== 1) { touchStart.current = null; return }
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
        }}
        onTouchCancel={() => { touchStart.current = null }}
        onTouchEnd={event => {
          const start = touchStart.current
          touchStart.current = null
          const end = event.changedTouches[0]
          if (start && end && start.x - end.clientX > 70 &&
            Math.abs(end.clientY - start.y) < 35 && Date.now() - start.time < 600) {
            setMenuPath(null); toggleRef.current?.focus()
          }
        }}>
        <ul className="mobile-nav-sections">
          {sections.map(item => <li key={item}><Link href={`/${item}`}
            aria-current={currentSection === item ? 'page' : undefined}
            onClick={() => setMenuPath(null)}>{item}</Link></li>)}
        </ul>
      </nav>
      <aside className="menublock" inert={menuOpen}>
        <h1><Link href="/">tôra studio</Link></h1>
        <nav className="nav" aria-label="Menu chính"><ul>
          {sections.map(item => <li key={item}><Link href={`/${item}`}
            aria-current={currentSection === item ? 'page' : undefined}><h2>{item}</h2></Link></li>)}
        </ul></nav>
        {backLink}
      </aside>
      <main id="main-content" className="content" inert={menuOpen}>
        {backLink && <div className="mobile-back">{backLink}</div>}
        {children}
      </main>
    </div>
  )
}
