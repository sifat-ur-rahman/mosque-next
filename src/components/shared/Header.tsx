import { Suspense } from 'react';
import ResponsiveHeader from '../headerComponent/ResponsiveHeader';

function Header() {
    return (
        <Suspense fallback={<></>}>
            <ResponsiveHeader />
        </Suspense>
    );
}

export default Header;
