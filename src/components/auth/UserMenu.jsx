// "use client";
// import { useEffect, useState } from "react";
// import { getCurrentUser, logout } from "../../lib/auth";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import styles from "./auth.module.css";
// export default function UserMenu() {
//     const [user, setUser] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         setUser(getCurrentUser());
//     }, []);

//     const handleLogout = () => {
//         logout();
//         router.push("/login");
//     };

//     if (!user) {
//         return <Link href="/signin">Đăng nhập</Link>;
//     }

//     return (
//         <div className={styles.usermenu}>
//             <span>Xin chào, {user.name}</span>
//             <button onClick={handleLogout}>Đăng xuất</button>
//         </div>
//     );
// }
