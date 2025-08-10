import BlogList from "../../components/blog/BlogList";


async function getBlogs() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(baseUrl + "/api/blog", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs || [];
}

export default async function BlogPage() {
    const blogs = await getBlogs();
    return (
        <div>
            <h1>Danh sách bài viết</h1>
            <BlogList blogs={blogs} />
        </div>
    );
}
