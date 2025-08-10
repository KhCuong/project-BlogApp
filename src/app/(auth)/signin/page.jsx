"use client"

import styles from "./signinPage.module.css";

import LoginForm from "../../../components/auth/SigninForm";
export default function LoginPage() {
    return (

        <main className={styles.container}>
            <LoginForm />
        </main>

    );
}


