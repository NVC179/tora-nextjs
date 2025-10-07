/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://torastudio.vn', // Thay bằng domain thật
  generateRobotsTxt: true,           // Tạo file robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*'],             // Đường dẫn bạn muốn loại trừ
};
