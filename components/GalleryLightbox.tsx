'use client'

import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { getImageProps } from 'next/image'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

export default function GalleryLightbox({ images, index, onClose }: {
  images: string[]; index: number; onClose: () => void
}) {
  return <LightGallery plugins={[lgThumbnail, lgZoom]} dynamic
    dynamicEl={images.map(src => ({
      src: getImageProps({ src, alt: '', width: 960, height: 960 }).props.src,
      thumb: getImageProps({ src, alt: '', width: 60, height: 60 }).props.src,
    }))}
    onInit={({ instance }) => instance.openGallery(index)}
    onAfterClose={onClose} closable download={false} preload={1}
    mobileSettings={{ controls: true, showCloseIcon: true, download: false }} />
}
