import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদ - ড্যাশবোর্ড',
        short_name: 'মনোহরপুর মসজিদ',
        description:
            'মনোহরপুর বায়তুন-নূর কেন্দ্রীয় জামে মসজিদের প্রশাসনিক ব্যবস্থাপনার জন্য ড্যাশবোর্ড। এখানে মাসিক চাঁদা, কোরবানি ও ইফতার তালিকা সহজে পরিচালনা করা যায়।',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#1C0F2E',
        theme_color: '#29173F',
        orientation: 'portrait-primary',
        lang: 'bn',
        icons: [
            {
                src: '/logo/logo01.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo/logo02.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/logo/logo01.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
