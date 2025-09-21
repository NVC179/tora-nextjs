import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '../components/Header';

import { Noto_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';

const notoSans = Noto_Sans({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// app/layout.tsx
export const metadata = {
  title: 'tôra studio - Thiết kế Kiến trúc & Nội thất',
  description: 'Tôra studio tạo ra những không gian sống và kiến trúc mới với những thiết kế mềm mại, tận dụng tối đa chất liệu tự nhiên, truyền thống và kỹ thuật thủ công',
  keywords: 'tôra studio, kiến trúc sư, thiết kế nội thất, Hà Nội, Sài gòn, Hồ Chí Minh, Việt Nam',
  authors: [{ name: 'tôra studio' }],
  canonical: 'https://torastudio.vn',
  openGraph: {
    title: 'tôra studio - Thiết kế Kiến trúc & Nội thất',
    description: 'Đội ngũ kiến trúc sư và thiết kế nội thất chuyên nghiệp tại Hà Nội',
    url: 'https://torastudio.vn',
    siteName: 'tôra studio',
    images: [
      {
        url: 'https://torastudio.vn/logo/8.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tôra studio',
    description: 'Thiết kế Kiến trúc & Nội thất',
    images: ['https://torastudio.vn/logo/8.jpg'],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="bg-white text-gray-900 antialiased font-noto-sans">
        {/* Thêm padding-top để đẩy content xuống dưới header */}
        <main>{children}</main>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <Analytics />

      </body>
    </html>
  );
}

