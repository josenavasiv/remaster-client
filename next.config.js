/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'app-artworks.sfo3.digitaloceanspaces.com'],
    },
};

module.exports = nextConfig;
