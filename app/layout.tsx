import './globals.css';

export const metadata = {
    title: 'Baskar D | Freelance Video Editor, Digital & Affiliate Marketer',
    description: 'I am Baskar D, a freelance video editor, digital marketer, and affiliate marketer. I help brands grow with high-converting videos, SEO, ads, and online marketing.',
    keywords: 'freelance video editor, digital marketer, affiliate marketer, video editing services, social media marketing, SEO expert, online marketing freelancer',
    authors: [{ name: 'Baskar D' }],
    robots: 'index, follow',
    alternates: {
        canonical: 'https://baskarportfolio.com',
    },
    openGraph: {
        title: 'Baskar D | Freelance Video Editor & Digital Marketer',
        description: 'Freelance video editing, digital marketing & affiliate marketing services to grow your brand online.',
        url: 'https://baskarportfolio.com',
        type: 'website',
        images: [
            {
                url: 'https://baskarportfolio.com/og-image.jpg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baskar D | Freelance Video Editor & Digital Marketer',
        description: 'Grow your business with high-quality videos, SEO, ads, and affiliate marketing.',
        images: ['https://baskarportfolio.com/og-image.jpg'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
