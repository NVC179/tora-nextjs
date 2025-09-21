import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '../components/Header';

import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'tôra studio',
  description: 'Tôra Studio - Thiết kế & Thi công kiến trúc, nội thất',
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
      </body>
    </html>
  );
}

