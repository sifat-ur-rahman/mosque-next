import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
