"use client";
import { useState } from "react";
import { signup } from "../../lib/auth";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function SignupForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, email, password);
        setMessage("Đăng ký thành công! Chuyển đến trang đăng nhập...");
        setTimeout(() => router.push("/login"), 1500);
    };

    return (
        <div className={styles.container}>
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Đăng ký</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}
