import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

const protectedRoutes = [
    '/blog/create',
    '/api/blog',
    '/api/blog/',
    '/api/blog/:id',
];

export function middleware(req) {
    const { pathname } = req.nextUrl;
    // Chặn các route cần xác thực
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        const token = req.cookies.get('token')?.value;
        if (!token || !verifyToken(token)) {
            // Nếu không có token, redirect về trang đăng nhập
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/blog/create', '/api/blog', '/api/blog/:id'],
};
