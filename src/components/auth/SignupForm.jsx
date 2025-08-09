
"use client"

import { REQ_CONFIG } from "../../constants/forms/formData";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import styles from "./AuthForm.module.css";


export default function SignUpForm() {
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    });
    const [err, setErr] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    const updateField = fields => setSignupData({ ...signupData, ...fields });

    const handleSubmit = async e => {
        e.preventDefault();
        setErr('');
        if (!signupData.name || signupData.name.length < 3) {
            setErr('Name must be at least 3 characters');
            return;
        }
        if (!signupData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupData.email)) {
            setErr('Invalid email address');
            return;
        }
        if (!signupData.password || signupData.password.length < 6) {
            setErr('Password must be at least 6 characters');
            return;
        }
        if (signupData.password !== signupData.confirmPass) {
            setErr("Passwords don't match");
            return;
        }
        setLoaded(true);
        try {
            const res = await axios.post('/api/auth/signup', { signupData }, REQ_CONFIG);
            if (res?.status === 200) {
                setLoaded(false);
                await signIn(undefined, { callbackUrl: '/' });
                setSignupData({ name: '', email: '', password: '', confirmPass: '' });
            }
        } catch (err) {
            setErr(err.response ? err.response.data.message : err.message);
            setLoaded(false);
        }
    };

    if (status === 'authenticated') router.push('/');

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
                {err && <p className={styles.error}>{err}</p>}
                <div className={styles.frmGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="fsadasgassad"
                        value={signupData.name}
                        onChange={e => updateField({ name: e.target.value })}
                    />
                </div>
                <div className={styles.frmGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={signupData.email}
                        onChange={e => updateField({ email: e.target.value })}
                    />
                </div>
                <div className={styles.frmGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={signupData.password}
                        onChange={e => updateField({ password: e.target.value })}
                    />
                </div>
                <div className={styles.frmGroup}>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        value={signupData.confirmPass}
                        onChange={e => updateField({ confirmPass: e.target.value })}
                    />
                </div>
                <button type="submit" className={styles.frmBtn}>{loaded ? 'Loading...' : 'Sign Up'}</button>
                <p className={styles.txt}>Already have an Account? <Link href='/signin'>Sign In</Link></p>
            </form>
        </div>
    );
}