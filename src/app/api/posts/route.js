import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const posts = await prisma.post.findMany({ where: { published: true } });
    return NextResponse.json(posts);
}

export async function POST(req) {
    const token = req.cookies.get('token')?.value;
    const user = token && verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, content, slug } = await req.json();

    const post = await prisma.post.create({
        data: {
            title,
            content,
            slug,
            published: true,
            authorId: user.id,
        },
    });

    return NextResponse.json(post);
}
