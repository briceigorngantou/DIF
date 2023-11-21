/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");

const prod = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["https://firebasestorage.googleapis.com"],
        unoptimized: true
    },
    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        API_URL: process.env.API_URL,
        APP_URL: process.env.APP_URL
    },
    exportPathMap: async function(
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return defaultPathMap;
    }

};


const withPWA = require('next-pwa')({
    dest: 'public',
    disable: !prod,
    register: true,
    skipWaiting: true,
    runtimeCaching,
    sw: '/sw.js'
});

module.exports = withPWA(nextConfig);
