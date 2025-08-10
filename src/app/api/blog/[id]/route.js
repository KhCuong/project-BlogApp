import path from 'path';
import fs from 'fs';

const blogsPath = path.join(process.cwd(), 'blogs.json');

export async function GET(req, { params }) {
    const { id } = params;
    let blogs = [];
    if (fs.existsSync(blogsPath)) {
        blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
    }
    const blog = blogs.find(b => b.id === id);
    if (!blog) {
        return Response.json({ message: 'Not found' }, { status: 404 });
    }
    return Response.json({ blog });
}
