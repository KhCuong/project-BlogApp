"use client";
import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./auth.module.css"; // Assuming you have a CSS module for styling

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (user) {
            setMessage("Đăng nhập thành công!");
            router.push("/profile");
        } else {
            setMessage(user.error);
        }
    };

    return (
        <div className={styles.container}>
            <span className={styles.close} onClick={() => router.back()}>
                <div>
                    &times;
                </div>
            </span>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Đăng nhập</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <p className={styles.links}>
                <Link href="/register">Đăng ký</Link>
                <Link href="/forgot-password">Quên mật khẩu?</Link>
            </p>
        </div>
    );
}
