
"use client";

import styles from "./forgotPasswordPage.module.css";
const ForgotPasswordPage = () => {
    const handleClick = () => {
        alert("Đã gửi liên kết đặt lại mật khẩu!");
    }
    return (
        <main className={styles.centerScreen}>
            <p>Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
            <form className={styles.form}>
                <input type="email" placeholder="Email" required />
                <button type="submit" onClick={handleClick}>Đặt lại mật khẩu</button>
            </form>
        </main>
    );
};

export default ForgotPasswordPage;
