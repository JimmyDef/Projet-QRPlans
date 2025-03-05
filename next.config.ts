import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https' as const,
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https' as const,
        hostname: '*.platform-lookaside.fbsbx.com',
        pathname: '**',
      },
      {
        protocol: 'https' as const,
        hostname: '*.media-exp1.licdn.com',
        pathname: '**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
