import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto, Rubik, Tiro_Bangla } from 'next/font/google';

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
const tiroBangla = Tiro_Bangla({
    subsets: ['bengali'],
    weight: ['400'], // Add other weights if needed
    variable: '--font-tiro-bangla',
});
export const metadata: Metadata = {
    title: 'মনোহরপুর বায়তুন - নূর কেন্দ্রীয় জামে মসজিদ',
    description: 'Manoharpur Baytun-Noor Central Jame Mosque',
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
                    href="/logo01.png"
                    type="image/x-icon"
                />
            </head>
            <body
                className={`${inter.variable} ${rubik.variable} ${roboto.variable} ${tiroBangla.variable} font-bangla antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
