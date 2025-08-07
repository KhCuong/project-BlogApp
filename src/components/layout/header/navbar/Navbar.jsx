
import Link from "next/link";
import styles from "./navbar.module.css";
import ThemeToggle from "../../../ui/themeToggle/ThemeToggle";
import LoginForm from "../../../auth/LoginForm";
const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.branding}>
                <div className={styles.logo}>
                    <img src="/globe.svg" alt="Logo" />
                </div>
                <div className={styles.title}>Blog App</div>
            </div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/login">Đăng Nhập</Link>
            </div>
        </div>
    );
};

export default Navbar;
