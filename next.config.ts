import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '15mb',
        },
        scrollRestoration: true,
    },
    images: {
        // domains: []
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'cdn.sspai.com',
        //     port: ''
        //   },
        // ]
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
