import path from 'path';
// Đã loại bỏ database, chỉ dùng users.json
import fs from 'fs';


export async function POST(req) {
    try {
        const body = await req.json();
        const submitted = body.signupData;
        const usersPath = path.join(process.cwd(), 'users.json');
        let users = [];
        if (fs.existsSync(usersPath)) {
            users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        }
        // Check if email đã tồn tại
        if (users.find(u => u.email === submitted.email)) {
            return Response.json({ message: 'This user Already Exists' }, { status: 400 });
        }
        // Tạo username đơn giản
        let username = submitted.username && submitted.username.trim()
            ? submitted.username.trim()
            : submitted.name
                ? submitted.name.toLowerCase().replace(/[^a-z0-9]/g, "")
                : submitted.email.split("@")[0];
        if (users.find(u => u.username === username)) {
            username = username + Math.floor(Math.random() * 10000);
        }
        const newUser = {
            name: submitted.name,
            email: submitted.email.toLowerCase(),
            username,
            password: submitted.password, // Lưu plain text (chỉ dùng cho demo, không bảo mật)
        };
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return Response.json({ message: 'Đăng ký thành công', user: newUser }, { status: 200 });
    } catch (err) {
        return Response.json({ status: 'error', message: err.message }, { status: 500 });
    }
}