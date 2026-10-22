import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projectsData } from '../../data/projects'
import { isSection, sections } from '../../lib/sections'

export function generateStaticParams() {
  return sections.map(section => ({ section }))
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!isSection(section)) notFound()

  return (
    <section aria-label={section}>
      <h2 className="section-title">{section}</h2>
      {projectsData[section].map((item, index) => section === 'studio' ? (
        <article key={item.id} className="studio-layout">
          <div className="studio-image-large"><Image src={item.image} alt={item.title || 'tôra studio'}
            width={600} height={600} sizes="(max-width: 768px) 90vw, 480px" priority={index === 0} /></div>
          <div className="studio-info-below">
            <div className="studio-address-item"><p>23C Tông Đản, Hoàn Kiếm, Hà Nội</p><br />
              <p>email: <a href="mailto:torastudiovn@gmail.com">torastudiovn@gmail.com</a></p></div>
            <div className="studio-social-item">
              <a href="https://www.instagram.com/torastudio.vn/" target="_blank" rel="noopener noreferrer" className="social-link-item"><Image src="/logo/icon_ig.svg" alt="Instagram" width={20} height={20} /></a>
              <a href="https://facebook.com/torastudiovn/" target="_blank" rel="noopener noreferrer" className="social-link-item"><Image src="/logo/icon_fb1.svg" alt="Facebook" width={20} height={20} /></a>
            </div>
          </div>
        </article>
      ) : (
        <Link key={item.id} className="project-item" href={item.externalLink || `/${section}/${item.id}`}
          target={item.externalLink ? '_blank' : undefined} rel={item.externalLink ? 'noopener noreferrer' : undefined}>
          <div className="fifty fifty-left"><div className="chunk">
            <h2>{item.title}</h2><div className="meta-data">
              {item.location && item.period ? <p>{item.location}<br />{item.period}</p> :
                item.shortDescription ? <p>{item.shortDescription}<br />...đọc tiếp</p> : null}
            </div>
          </div></div>
          <div className="fifty fifty-right"><div className="img-holder">
            <Image src={item.image} alt={item.title} fill
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 40vw, 280px" priority={index === 0} />
          </div></div>
        </Link>
      ))}
    </section>
  )
}
