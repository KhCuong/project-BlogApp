import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [err, setErr] = useState("");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        setErr("");
        const token = localStorage.getItem("token");
        if (!token) {
            setErr("Bạn cần đăng nhập!");
            return;
        }
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ title, content })
        });
        if (res.ok) {
            router.push("/blog");
        } else {
            const data = await res.json();
            setErr(data.message || "Lỗi đăng bài");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề" required />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung" required />
            <button type="submit">Đăng bài</button>
        </form>
    );
}
