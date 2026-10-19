/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/builder', destination: '/design', permanent: true }];
  },
};

export default nextConfig;
