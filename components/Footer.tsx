export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studio Info */}
          <div>
            <h3 className="text-lg font-light text-gray-900 mb-4">tôra studio</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Tạo ra những không gian sống và kiến trúc mới với những thiết kế mềm mại, 
              tận dụng tối đa chất liệu tự nhiên, truyền thống và kỹ thuật thủ công.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>23C Tông Đản, Hoàn Kiếm</p>
              <p>Hà Nội, Việt Nam</p>
              <p>torastudiovn@gmail.com</p>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">
              Follow
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.instagram.com/torastudio.vn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            © 2025 Tôra Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}