
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import styles from "./userDropdown.module.css";


import { useRouter } from "next/navigation";

export default function UserDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const pfpRef = useRef(null);
    const router = useRouter();

    const { logout } = useUser();
    const handleLogout = () => {
        logout();
        router.push('/');
    };

    useEffect(() => {
        const handleClick = e => {
            if (!pfpRef.current?.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return (
        <div>
            {/* <Link className={styles.linkIcon} title="Create a Post" href="/create">
                <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>＋</span>
            </Link> */}
            <div className={styles.userAvatar} onClick={() => setIsOpen(!isOpen)} ref={pfpRef}>
                <img
                    src={user?.image || "/images/default-avatar.png"}
                    alt="profilePic"
                />
                {isOpen && (
                    <div className={styles.menu}>
                        <span className={styles.fullName}>{user?.name}</span>
                        <span className={styles.username}>@{user?.username}</span>
                        <ul>
                            <li>
                                <span role="img" aria-label="user">👤</span>
                                <Link href={`/profile/${user?.username}`}>Profile</Link>
                            </li>


                            <li>
                                <span role="img" aria-label="dashboard">📊</span>
                                <Link href='/dashboard'>Dashboard</Link>
                            </li>
                            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <span role="img" aria-label="logout">🚪</span>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}