import Link from 'next/link'
import { sections } from '../lib/sections'

export default function Home() {
  return (
    <nav className="home-navigation" aria-label="Khám phá tôra studio">
      {sections.map(section => (
        <Link key={section} href={`/${section}`} className="home-navigation-link">
          <span>{section}</span><span aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  )
}
