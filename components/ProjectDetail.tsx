'use client'

import { useRef } from 'react'
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

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const lightboxRef = useRef<any>(null)

  const openLightbox = (index: number) => {
    if (lightboxRef.current) {
      lightboxRef.current.openGallery(index)
    }
  }

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
          dynamicEl={project.gallery.map((src) => ({
            src,
            thumb: src,
            subHtml: `<h4>${project.title}</h4>`
          }))}
          closable={true}
          download={false}
        />

        {/* Image Grid - 3x3 desktop, 2x2 mobile */}
        <div className="image-grid">
          {project.gallery.map((imageSrc, index) => (
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
        <p>{project.description}</p>
      </div>
    </div>
  )
}
