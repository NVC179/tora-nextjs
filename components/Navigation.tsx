import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="mb-8 md:mb-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <h2 className="nav-link">
          <Link href="/about">
            studio
          </Link>
        </h2>
        <h2 className="nav-link">
          <a 
            href="https://www.instagram.com/torastudio.vn/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            instagram
          </a>
        </h2>
      </div>
    </nav>
  )
}