import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    const { slug } = params;
    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const author = await prisma.user.findUnique({ where: { id: post.authorId } });

    return NextResponse.json({ ...post, author });
}
