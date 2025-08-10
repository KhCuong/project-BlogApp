import BlogDetail from "../../../components/blog/BlogDetail";


async function getBlog(id) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(baseUrl + `/api/blog/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog || null;
}

export default async function BlogDetailPage({ params }) {
    const blog = await getBlog(params.id);
    return <BlogDetail blog={blog} />;
}
