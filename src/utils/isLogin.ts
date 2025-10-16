/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';
import gettoken from './gettoken';

export default function isLogin(Component: any) {
    return async function IsAuth(props: any) {
        const token = await gettoken();

        if (!token) {
            redirect('/login');
        } else if (token?.user?.role === 'Admin') {
            return Component(props);
        } else {
            redirect('/');
        }
    };
}
