"use client"
import styles from "./loginPage.module.css";
import { SessionProvider } from "next-auth/react";
import LoginForm from "../../../components/auth/LoginForm";
export default function LoginPage() {
    return (
        <SessionProvider>
            <main className={styles.container}>
                <LoginForm />
            </main>
        </SessionProvider>
    );
}


