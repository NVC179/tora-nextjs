'use client'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const LightGalleryComponent = dynamic(() => import('lightgallery/react'), {
  ssr: false,
})
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { Project } from '../types'
import Image from 'next/image'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const lightboxRef = useRef<any>(null)
  const [showContactModal, setShowContactModal] = useState(false)

  const openLightbox = (index: number) => {
    if (lightboxRef.current) {
      lightboxRef.current.openGallery(index)
    }
  }

  const contactMethods = [
    {
      name: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 6l-10 7L2 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      value: 'torastudiovn@gmail.com',
      link: 'mailto:torastudiovn@gmail.com'
    },
    {
      name: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FD5949" />
              <stop offset="50%" stopColor="#D6249F" />
              <stop offset="100%" stopColor="#285AEB" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#instagram-gradient)" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="url(#instagram-gradient)" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="url(#instagram-gradient)" />
        </svg>
      ),
      value: '@torastudio.vn',
      link: 'https://www.instagram.com/torastudio.vn/'
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2" />
        </svg>
      ),
      value: 'tôra studio',
      link: 'https://www.facebook.com/torastudiovn/'
    }
  ]

  return (
    <div className="project-detail">
      {/* Gallery Grid */}
      <div className="gallery-section">
        {/* Lightbox Component */}
        <LightGalleryComponent
          onInit={(ref) => {
            if (ref) {
              lightboxRef.current = ref.instance
            }
          }}
          plugins={[lgThumbnail, lgZoom]}
          dynamic
          dynamicEl={(project.gallery ?? []).map((src) => ({
            src,
            thumb: src,
            subHtml: `<h4>${project.title}</h4>`
          }))}
          closable={true}
          download={false}
        />
        {/* Image Grid - 3x3 desktop, 2x2 mobile */}
        <div className="image-grid">
          {project.gallery?.map((imageSrc, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img
                src={imageSrc}
                alt={`${project.title} - Image ${index + 1}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="project-description">
        <h3>{project.title}</h3>
        {project.productInfo ? (
          <div className="product-info text-left">
            <br />
            <p>Kích thước : {project.productInfo.size}</p>
            <p>Vật liệu: {project.productInfo.material}</p>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p>Giá : {project.productInfo.price}</p>
              <button
                onClick={() => setShowContactModal(true)}
                className="buy-button"
              >
                Mua hàng
              </button>
            </div>
          </div>
        ) : (
          <p>{project.description}</p>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowContactModal(false)}
            >
              ×
            </button>
            <h3>Liên hệ mua hàng</h3>
            <p className="modal-subtitle">Chọn cách thức liên hệ bạn muốn</p>
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  <span className="contact-icon">{method.icon}</span>
                  <div className="contact-info">
                    <div className="contact-name">{method.name}</div>
                    <div className="contact-value">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}