'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//logout action
export default async function LogoutAction() {
    (await cookies()).delete('mosque_token');
    redirect('/login');
}
