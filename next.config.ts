import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 빌드 워커를 1개로 제한: 워커가 여러 개면 각자 독립 프로세스라
  // 모듈 레벨 레이트 리미터가 공유되지 않아 Notion API 429가 발생함
  experimental: {
    cpus: 1,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.notion.so',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
}

export default nextConfig

