import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const useScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, [pathname]);
};

export default useScrollToTop;
