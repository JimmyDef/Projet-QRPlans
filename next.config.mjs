import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.platform-lookaside.fbsbx.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.media-exp1.licdn.com',
        pathname: '**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
