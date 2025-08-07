import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const token = req.cookies.get('token')?.value;
    const user = token && verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { postId, content } = await req.json();

    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: user.id,
        },
    });

    return NextResponse.json(comment);
}
