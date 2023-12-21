/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
        ]
    }
}

module.exports = nextConfig
