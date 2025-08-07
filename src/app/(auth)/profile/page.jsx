"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../lib/auth";
import UserMenu from "../../../components/auth/UserMenu";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    if (!user) {
        return <p>Bạn chưa đăng nhập. <a href="/login">Đăng nhập ngay</a></p>;
    }

    return (
        <main className="profile">
            <h1>Hồ sơ người dùng</h1>
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            <UserMenu />
        </main>
    );
}