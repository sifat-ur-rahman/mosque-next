import { IUser } from '@/server/model/users/userType';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export type TokenPayload = { user: IUser } & JwtPayload;

export default async function gettoken() {
    const token = (await cookies()).get('mosque_token');

    if (!token || !token.value) {
        return null;
    } else {
        const data = jwt.verify(
            token?.value,
            process.env.TOKEN_SECRET as string,
        ) as TokenPayload;
        if (!data?.user?._id) {
            return null;
        } else {
            return data;
        }
    }
}
