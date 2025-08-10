
import path from 'path';
import fs from 'fs';
import { signToken } from '../../../../lib/jwt';
// Đã loại bỏ database, chỉ dùng users.json

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const usersPath = path.join(process.cwd(), 'users.json');
        let users = [];
        if (fs.existsSync(usersPath)) {
            users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        }
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return Response.json({ message: 'Sai email hoặc mật khẩu' }, { status: 401 });
        }
        // Không trả về password, luôn gán image mặc định
        const { password: _, ...userData } = user;
        userData.image = "/avatar.png"; // Đường dẫn đến ảnh đại diện mặc định
        // Tạo JWT token
        const token = signToken({ email: userData.email, username: userData.username });
        // Set cookie HTTPOnly
        const response = Response.json({ message: 'Đăng nhập thành công', user: userData }, { status: 200 });
        response.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
        return response;
    } catch (err) {
        return Response.json({ status: 'error', message: err.message }, { status: 500 });
    }
}
