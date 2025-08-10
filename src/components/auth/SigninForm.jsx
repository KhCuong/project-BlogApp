
"use client"
import { LOGIN_INITIAL } from "../../constants/forms/formData";
import { emailReg } from "../../constants/forms/regexp";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";


import { useRouter } from "next/navigation";
import axios from "axios";


import styles from "./AuthForm.module.css";

export default function SignInForm() {
    const [data, setData] = useState(LOGIN_INITIAL);
    const [options, setOptions] = useState({ err: '', success: '', loaded: false })
    const router = useRouter();
    const { login } = useUser();
    // Không dùng useSession nữa
    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })
    const handleSubmit = async e => {
        e.preventDefault();
        setOptions({ ...options, err: '', loaded: true });
        try {
            if (!data.email || !emailReg.test(data.email)) {
                setOptions({ ...options, err: 'The Email is Invalid', loaded: false });
                return;
            }
            if (!data.pass) {
                setOptions({ ...options, err: 'Password is required', loaded: false });
                return;
            }
            const res = await axios.post('/api/auth/signin', {
                email: data.email,
                password: data.pass
            });
            setOptions({ ...options, loaded: false });
            if (res.status === 200 && res.data.user) {
                setOptions({ ...options, success: 'Login Successful', err: '' });
                setData(LOGIN_INITIAL);
                // Đăng nhập qua context để cập nhật user toàn cục
                login(res.data.user);
                router.push('/');
            } else {
                setOptions({ ...options, err: res.data.message || 'Login failed', success: '' });
            }
        } catch (err) {
            setOptions({ ...options, loaded: false, err: err.response?.data?.message || err.message, success: '' });
        }
    };
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                {options.err && <p className={styles.error}>{options.err}</p>}
                {options.success && <p className={styles.success}>{options.success}</p>}
                <div className={styles.frmGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' name="email" placeholder="name@example.com" value={data.email} onChange={handleChange} />
                </div>
                <div className={styles.frmGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="pass" value={data.pass} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.frmBtn}>{options.loaded ? "Loading..." : "Sign In"}</button>
                <Link href='/auth/reset-password' className={styles.txt}>Forgot Your Password?</Link>
                <div style={{ height: 2, background: '#eee', margin: '10px 0' }} />
                <h2 style={{ textAlign: 'center', fontWeight: 400, fontSize: 21 }}>Or Continue With</h2>
                <p className={styles.txt}>Don&apos;t have an Account? <Link href='/signup'>Sign Up</Link></p>
            </form>
        </div>
    );
}