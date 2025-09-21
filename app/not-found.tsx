// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Trang không tìm thấy
        </h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
