'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { projectsData } from '../data/projects'
import { Project } from '../types'
import ProjectDetail from '../components/ProjectDetail'
import { categories } from '../data/categories'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Swipe gesture states - dùng ref để tránh stale closure trong event listeners
  const touchStartRef = useRef<number | null>(null)
  const touchEndRef = useRef<number | null>(null)
  
  // Refs để track state hiện tại trong event listeners
  const selectedProjectRef = useRef<Project | null>(null)
  const mobileNavOpenRef = useRef(false)
  const currentSectionRef = useRef('')

  // Sync refs with state
  useEffect(() => { selectedProjectRef.current = selectedProject }, [selectedProject])
  useEffect(() => { mobileNavOpenRef.current = mobileNavOpen }, [mobileNavOpen])
  useEffect(() => { currentSectionRef.current = currentSection }, [currentSection])

  // Flag để biết popstate đang được xử lý (tránh push state lại)
  const isHandlingPopState = useRef(false)

  // Check first visit và auto-open nav trên mobile
  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hasVisited')
    const isMobile = window.innerWidth <= 768
    
    if (isFirstVisit && isMobile) {
      setMobileNavOpen(true)
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])

  // ===== HISTORY API: Ngăn browser back gesture thoát trang =====
  // Push nhiều history entries để tạo buffer, ngăn Android back gesture thoát trang
  useEffect(() => {
    // Khởi tạo: replace state hiện tại với app state
    history.replaceState({ appState: 'home' }, '')

    const handlePopState = (e: PopStateEvent) => {
      isHandlingPopState.current = true

      // Browser back gesture hoặc nút back được kích hoạt
      // Xử lý back logic giống swipe trong app
      if (selectedProjectRef.current) {
        // Đang xem project detail -> quay lại danh sách
        setSelectedProject(null)
      } else if (currentSectionRef.current) {
        // Đang ở section -> quay lại home
        setCurrentSection('')
        setSelectedCategory('')
      } else if (mobileNavOpenRef.current) {
        // Nav đang mở -> đóng nav
        setMobileNavOpen(false)
      }

      // Luôn push lại nhiều state để tạo buffer, tránh thoát trang
      // Dùng setTimeout để đảm bảo state đã được cập nhật
      setTimeout(() => {
        // Push 3 entries buffer để Android back gesture không bao giờ thoát
        history.pushState({ appState: 'buffer1' }, '')
        history.pushState({ appState: 'buffer2' }, '')
        history.pushState({ appState: 'active' }, '')
        isHandlingPopState.current = false
      }, 50)
    }

    // Push nhiều state ban đầu để có history entries buffer cho back gesture
    history.pushState({ appState: 'buffer1' }, '')
    history.pushState({ appState: 'buffer2' }, '')
    history.pushState({ appState: 'active' }, '')

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, []) // Empty deps - chỉ setup 1 lần, dùng refs để đọc state mới nhất

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e: TouchEvent) => {
    // Bỏ qua nếu đang trong lightgallery
    const target = e.target as HTMLElement
    if (target.closest('.lg-outer') || target.closest('.lg-container')) {
      return
    }
    
    const startX = e.targetTouches[0].clientX
    touchEndRef.current = null
    touchStartRef.current = startX

    // Nếu touch bắt đầu từ cạnh trái hoặc cạnh phải, preventDefault ngay để chặn browser gesture
    const edgeThreshold = 40
    const screenWidth = window.innerWidth
    if (startX <= edgeThreshold || startX >= screenWidth - edgeThreshold) {
      e.preventDefault()
    }
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    // Bỏ qua nếu đang trong lightgallery
    const target = e.target as HTMLElement
    if (target.closest('.lg-outer') || target.closest('.lg-container')) {
      return
    }

    const touchStart = touchStartRef.current

    // Nếu có touchStart, tính toán hướng swipe
    if (touchStart !== null) {
      const currentTouch = e.targetTouches[0].clientX
      const diff = touchStart - currentTouch
      
      // Edge detection: check nếu swipe bắt đầu từ cạnh trái hoặc phải màn hình
      const edgeThreshold = 50 // 50px từ cạnh
      const screenWidth = window.innerWidth
      const isFromLeftEdge = touchStart <= edgeThreshold
      const isFromRightEdge = touchStart >= screenWidth - edgeThreshold

      // Nếu đang ở ProjectDetail và swipe từ phải sang trái (back gesture)
      // HOẶC swipe bắt đầu từ cạnh trái màn hình (browser back gesture)
      if (selectedProjectRef.current && (diff < 0 || isFromLeftEdge)) {
        e.preventDefault()
      }
      
      // Nếu swipe bắt đầu từ cạnh trái hoặc phải -> luôn chặn browser gesture
      if (isFromLeftEdge || isFromRightEdge) {
        e.preventDefault()
      }
    }
    
    touchEndRef.current = e.targetTouches[0].clientX
  }, [])

  const onTouchEnd = useCallback(() => {
    const touchStart = touchStartRef.current
    const touchEnd = touchEndRef.current
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Nếu đang ở ProjectDetail - vuốt từ trái sang phải để back
    if (selectedProjectRef.current && isRightSwipe) {
      setSelectedProject(null)
    }
    // Nếu không ở ProjectDetail - vuốt từ trái sang phải -> mở nav
    else if (!selectedProjectRef.current && isRightSwipe && !mobileNavOpenRef.current) {
      setMobileNavOpen(true)
    }
    // Vuốt từ phải sang trái -> đóng nav
    else if (isLeftSwipe && mobileNavOpenRef.current) {
      setMobileNavOpen(false)
    }
    
    // Reset touch states
    touchStartRef.current = null
    touchEndRef.current = null
  }, [])

  useEffect(() => {
    // Passive: false để cho phép preventDefault
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)

    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [onTouchStart, onTouchMove, onTouchEnd])

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