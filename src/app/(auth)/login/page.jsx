import styles from "./loginPage.module.css";

import LoginForm from "../../../components/auth/LoginForm";
export default function LoginPage() {
    return (
        <main className={styles.container}>
            <LoginForm />
            {/* <div className={styles.socialLogin}>
                <div className={styles.socialButton}>Đăng nhập với Google</div>
                <div className={styles.socialButton}>Đăng nhập với Facebook</div>
                <div className={styles.socialButton}>Đăng nhập với Github</div>
            </div> */}
        </main>
    );
}


