import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto, Rubik } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Add or remove weights as needed
    variable: '--font-roboto',
});
const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
});
export const metadata: Metadata = {
    title: 'HIHUB GLOBAL TECHNOLOGIES',
    description: 'your business partner',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="/logo.png"
                    type="image/x-icon"
                />
            </head>
            <body
                className={`${inter.variable} ${rubik.variable} ${roboto.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
