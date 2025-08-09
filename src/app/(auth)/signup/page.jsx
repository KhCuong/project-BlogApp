
"use client"

import styles from "./registerPage.module.css";
import SignupForm from "../../../components/auth/SignupForm";
import { SessionProvider } from "next-auth/react";
export default function SignupPage() {
    return (
        <SessionProvider>
            <main className={styles.container}>
                <SignupForm />
            </main>
        </SessionProvider>
    );
}
