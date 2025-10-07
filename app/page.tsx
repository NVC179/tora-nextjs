'use client'

import { useState, useEffect } from 'react'
import { projectsData } from '../data/projects'
import { Project } from '../types'
import ProjectDetail from '../components/ProjectDetail'
import { categories } from '../data/categories'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Swipe gesture states
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overscrollBehaviorX = 'none'
    document.documentElement.style.overscrollBehaviorX = 'none'

    return () => {
      document.body.style.overscrollBehaviorX = ''
      document.documentElement.style.overscrollBehaviorX = ''
    }
  }, [])

  // Check first visit và auto-open nav trên mobile
  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hasVisited')
    const isMobile = window.innerWidth <= 768

    if (isFirstVisit && isMobile) {
      setMobileNavOpen(true)
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])

  // Minimum swipe distance (in px)

  const EDGE_THRESHOLD = 30
  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    const touchX = e.targetTouches[0].clientX

    setTouchEnd(null)

    // Kiểm tra edge swipe
    if (touchX < EDGE_THRESHOLD) {
      if (selectedProject) {
        // Ở ProjectDetail: ngăn browser back, xử lý custom swipe
        e.preventDefault()
        setTouchStart(touchX)
      } else {
        // Không ở ProjectDetail: không xử lý, để browser back tự nhiên
        setTouchStart(null)
        return
      }
    } else {
      setTouchStart(touchX)
    }
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Nếu đang ở ProjectDetail - vuốt từ trái sang phải để back
    if (selectedProject && isRightSwipe) {
      setSelectedProject(null)
    }
    // Nếu không ở ProjectDetail - vuốt từ trái sang phải -> mở nav
    else if (!selectedProject && isRightSwipe && !mobileNavOpen) {
      setMobileNavOpen(true)
    }
    // Vuốt từ phải sang trái -> đóng nav
    else if (isLeftSwipe && mobileNavOpen) {
      setMobileNavOpen(false)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => onTouchStart(e)
    const handleTouchMove = (e: TouchEvent) => onTouchMove(e)
    const handleTouchEnd = () => onTouchEnd()

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStart, touchEnd, mobileNavOpen, selectedProject])

  const handleSectionClick = (section: string) => {
    setCurrentSection(section)
    setSelectedCategory('')
    setSelectedProject(null)
    setMobileNavOpen(false)
  }

  const handleBackToHome = () => {
    setCurrentSection('')
    setSelectedCategory('')
    setSelectedProject(null)
    setMobileNavOpen(false)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleBackToSection = () => {
    setSelectedProject(null)
  }

  const getCurrentData = (): Project[] => {
    if (!currentSection) return []
    return projectsData[currentSection as keyof typeof projectsData] || []
  }

  const getFilteredData = (): Project[] => {
    let data = getCurrentData()

    if (selectedCategory) {
      data = data.filter(item => item.category === selectedCategory)
    }

    return data
  }

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  return (
    <div className="desktop">
      {/* Mobile Navigation Bar */}
      <div className="mobile-nav-bar">
        <a href="#" onClick={toggleMobileNav} className="mobile-nav-logo">
          <h2>tôra studio</h2>
        </a>
        <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
          {mobileNavOpen ? '×' : '☰'}
        </div>
      </div>

      {/* Mobile Navigation Overlay - Click để đóng nav */}
      {mobileNavOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Navigation Dropdown - Đơn giản như desktop */}
      <div className={`mobile-nav-dropdown ${mobileNavOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-sections">
          <li><h2 onClick={() => handleSectionClick('works')}>works</h2></li>
          <li><h2 onClick={() => handleSectionClick('journal')}>journal</h2></li>
          <li><h2 onClick={() => handleSectionClick('shop')}>shop</h2></li>
          <li><h2 onClick={() => handleSectionClick('studio')}>studio</h2></li>
        </ul>
      </div>

      {/* Menu Block */}
      <div className="menublock">
        <div>
          <h1>
            <a href="#" onClick={handleBackToHome}>tôra studio</a>
          </h1>

          {!currentSection ? (
            // Hiển thị menu chính khi ở trang chủ
            <div className="nav">
              <ul>
                <li><a onClick={() => handleSectionClick('works')}><h2>works</h2></a></li>
                <li><a onClick={() => handleSectionClick('journal')}><h2>journal</h2></a></li>
                <li><a onClick={() => handleSectionClick('shop')}><h2>shop</h2></a></li>
                <li><a onClick={() => handleSectionClick('studio')}><h2>studio</h2></a></li>
              </ul>
            </div>
          ) : (
            // Hiển thị tên section và categories khi chọn section
            <div>
              {selectedProject ? (
                // Khi xem chi tiết project - chỉ hiển thị back button
                <div className="back-button" onClick={handleBackToSection}>
                  ← Back to {currentSection}
                </div>
              ) : (
                // Khi ở danh sách project - hiển thị h2 và categories
                <>
                  <h2>
                    {currentSection}
                  </h2>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {currentSection && selectedProject ? (
          // Hiển thị chi tiết project
          <ProjectDetail project={selectedProject} />
        ) : (
          // Hiển thị danh sách projects
          <div>
            {getFilteredData().map((item) => (
              <div key={item.id} className="project-item" onClick={() => {
                if (item.externalLink) {
                  // Chuyển hướng trang mới
                  window.open(item.externalLink, '_blank');
                } else {
                  // Mở chi tiết project
                  handleProjectClick(item);
                }
              }}>
                {currentSection === 'studio' ? (
                  // Layout đặc biệt cho studio - chỉ ảnh to và thông tin bên dưới
                  <div className="studio-layout">
                    <div className="studio-image-large">
                      <img src={item.image} alt={item.title} />
                    </div>

                    {/* Thông tin studio phía dưới ảnh */}
                    <div className="studio-info-below">
                      {/* Địa chỉ */}
                      <div className="studio-address-item">
                        <p>
                          23C Tông Đản, Hoàn Kiếm, Hà Nội
                        </p>
                        <br />
                        <p>
                          email: torastudiovn@gmail.com
                        </p>
                      </div>

                      {/* Social icons */}
                      <div className="studio-social-item">
                        <a
                          href="https://www.instagram.com/torastudio.vn/"
                          target="_blank"
                          rel="noreferrer"
                          className="social-link-item"
                        >
                          <img src="/logo/icon_ig.svg" alt="Instagram" />
                        </a>
                        <a
                          href="https://facebook.com/torastudiovn/"
                          target="_blank"
                          rel="noreferrer"
                          className="social-link-item"
                        >
                          <img src="/logo/icon_fb1.svg" alt="Facebook" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Layout bình thường cho các sections khác
                  <>
                    <div className="fifty fifty-left">
                      <div className="chunk">
                        <h2>{item.title}</h2>
                        <div className="meta-data">
                          {item.location && item.period ? (
                            <p>
                              {item.location}
                              <br />
                              {item.period}
                            </p>
                          ) : item.shortDescription ? (
                            <p>{item.shortDescription}
                              <br />
                              ...đọc tiếp
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="fifty fifty-right">
                      <div className="img-holder">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}