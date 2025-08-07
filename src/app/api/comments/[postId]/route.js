import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    const { postId } = params;

    const comments = await prisma.comment.findMany({ where: { postId } });

    const withAuthor = await Promise.all(comments.map(async (c) => {
        const author = await prisma.user.findUnique({ where: { id: c.authorId } });
        return { ...c, author };
    }));

    return NextResponse.json(withAuthor);
}
