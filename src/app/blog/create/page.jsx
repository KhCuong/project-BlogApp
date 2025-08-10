"use client";
import { useUser } from "../../../components/context/UserContext";
import BlogForm from "../../../components/blog/BlogForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.replace("/signin");
    }, [user, router]);

    if (!user) return null;
    return (
        <div>
            <h1>Đăng bài viết mới</h1>
            <BlogForm />
        </div>
    );
}
