import path from 'path';
import fs from 'fs';
import { verifyToken } from '../../../lib/jwt';

const blogsPath = path.join(process.cwd(), 'blogs.json');

export async function GET() {
    let blogs = [];
    if (fs.existsSync(blogsPath)) {
        blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
    }
    return Response.json({ blogs });
}

export async function POST(req) {
    try {
        const auth = req.headers.get('authorization');
        if (!auth || !auth.startsWith('Bearer ')) {
            return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const token = auth.split(' ')[1];
        const user = verifyToken(token);
        if (!user) {
            return Response.json({ message: 'Invalid token' }, { status: 401 });
        }
        const body = await req.json();
        let blogs = [];
        if (fs.existsSync(blogsPath)) {
            blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
        }
        const newBlog = {
            id: Date.now().toString(),
            title: body.title,
            content: body.content,
            author: user.username,
            createdAt: new Date().toISOString(),
        };
        blogs.unshift(newBlog);
        fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));
        return Response.json({ blog: newBlog }, { status: 201 });
    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 });
    }
}
