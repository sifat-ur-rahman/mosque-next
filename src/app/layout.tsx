import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto, Rubik, Tiro_Bangla } from 'next/font/google';
import { Toaster } from 'sonner';

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
    description:
        'আমাদের এই ওয়েবসাইটের মাধ্যমে আপনি প্রতি মাসের নির্ধারিত চাঁদার পরিমাণ জানতে পারবেন, কোরবানিতে অংশগ্রহণকারীদের তালিকা দেখতে পারবেন এবং রমজান মাসে প্রতিদিনের ইফতার আয়োজনের সময়সূচি জানতে পারবেন। মসজিদের কার্যক্রমে স্বচ্ছতা ও একতার পথে এটি একটি ছোট উদ্যোগ।',
    icons: {
        icon: '/logo01.png',
    },
};

export const viewport = {
    themeColor: '#d4af37', // ✅ correct export
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bn">
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
                <Toaster position="top-right" theme="dark" richColors />
            </body>
        </html>
    );
}
