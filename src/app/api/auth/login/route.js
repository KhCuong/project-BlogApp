import { prisma } from '../../../../lib/prisma';
import { compare } from 'bcryptjs';
import { signToken } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const isValid = await compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: 'Wrong password' }, { status: 401 });

    const token = signToken({ id: user.id, role: user.role, email: user.email });

    const res = NextResponse.json({ message: 'Login success' });
    res.cookies.set('token', token, { httpOnly: true });

    return res;
}
