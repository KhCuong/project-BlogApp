
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
import ThemeToggle from "../../../ui/themeToggle/ThemeToggle";
import UserDropdown from "../UserDropdown";
import styles from "./navbar.module.css";

const Navbar = () => {
    const { user } = useUser();

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.branding}>
                <div className={styles.logo}>
                    <img src="/globe.svg" alt="Logo" />
                </div>
                <div className={styles.title}>Blog App</div>
            </Link>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/blog">Blog</Link>
                {user && <Link href="/blog/create">Tạo bài viết</Link>}
                {user ? (
                    <UserDropdown user={user} />
                ) : (
                    <Link href="/signin">Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
