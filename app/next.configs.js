/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 生成静态文件，适合部署到任何平台
  distDir: 'dist',   // 输出文件夹名
  images: {
    unoptimized: true, // 静态导出必须禁用图片优化
  },
}

module.exports = nextConfig