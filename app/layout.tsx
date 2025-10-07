import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'tôra studio',
  description: 'Tôra studio tạo ra những không gian sống và kiến trúc mới với những thiết kế mềm mại, tận dụng tối đa chất liệu tự nhiên, truyền thống và kỹ thuật thủ công.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
