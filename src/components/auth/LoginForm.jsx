
"use client"
import { LOGIN_INITIAL } from "../../constants/forms/formData";
import { emailReg } from "../../constants/forms/regexp";
import Link from "next/link";
import { useState, useEffect } from "react";


import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import styles from "./AuthForm.module.css";

export default function SignInForm() {
    const [data, setData] = useState(LOGIN_INITIAL);
    const [options, setOptions] = useState({ err: '', success: '', loaded: false, togglePass: false })
    const router = useRouter();
    const { status } = useSession();
    const [callbackUrl, setCallbackUrl] = useState("/");

    // Lấy callbackUrl an toàn từ router.query
    useEffect(() => {
        if (router && router.query && typeof router.query === 'object' && typeof router.query.callbackUrl === 'string') {
            setCallbackUrl(router.query.callbackUrl);
        }
    }, [router]);

    // Điều hướng khi đã đăng nhập
    useEffect(() => {
        if (status === 'authenticated') {
            router.push(callbackUrl);
        }
    }, [status, callbackUrl, router]);
    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!data.email || !emailReg.test(data.email)) setOptions({ ...options, err: 'The Email is Invalid' })
            else if (!data.pass) setOptions({ ...options, err: 'Password is required' })
            else {
                setOptions({ ...options, loaded: true, err: '' });
                const res = await signIn('credentials', {
                    redirect: false,
                    email: data.email,
                    password: data.pass,
                    callbackUrl
                });
                setOptions({ ...options, loaded: false });
                if (!res?.error) {
                    router.push(callbackUrl);
                    setOptions({ ...options, success: 'Login Successful' });
                    setData(LOGIN_INITIAL);
                } else setOptions({ ...options, err: res.error })
            }
        } catch (err) {
            setOptions({ ...options, loaded: false, err: err.message, success: '' });
        }
    };
    if (status === 'authenticated') router.push(callbackUrl)
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                {options.err && <p className={styles.error}><MdError />{options.err}</p>}
                {options.success && <p className={styles.success}><FaCheckCircle />{options.success}</p>}
                <div className={styles.frmGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' name="email" placeholder="e.g. name@example.com" value={data.email} onChange={handleChange} />
                </div>
                <div className={styles.frmGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="pass" value={data.pass} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.frmBtn}>{options.loaded ? "Loading..." : "Sign In"}</button>
                <Link href='/auth/reset-password' className={styles.txt}>Forgot Your Password?</Link>
                <div style={{ height: 2, background: '#eee', margin: '10px 0' }} />
                <h2 style={{ textAlign: 'center', fontWeight: 400, fontSize: 21 }}>Or Continue With</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '10px 0' }}>
                    <button type="button" className="frmBtn-icon" onClick={() => signIn('google')} title="Continue With Google"></button>

                </div>
                <p className={styles.txt}>Don&apos;t have an Account? <Link href='/signup'>Sign Up</Link></p>
            </form>
        </div>
    );
}