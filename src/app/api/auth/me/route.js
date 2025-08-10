import { verifyToken } from '../../../../lib/jwt';
import path from 'path';
import fs from 'fs';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return Response.json({ user: null }, { status: 200 });
        const payload = verifyToken(token);
        if (!payload) return Response.json({ user: null }, { status: 200 });
        // Lấy user từ file users.json
        const usersPath = path.join(process.cwd(), 'users.json');
        let users = [];
        if (fs.existsSync(usersPath)) {
            users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        }
        const user = users.find(u => u.email === payload.email);
        if (!user) return Response.json({ user: null }, { status: 200 });
        const { password: _, ...userData } = user;
        userData.image = "/avatar.png";
        return Response.json({ user: userData }, { status: 200 });
    } catch (err) {
        return Response.json({ user: null }, { status: 200 });
    }
}
