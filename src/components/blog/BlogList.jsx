import Link from "next/link";

export default function BlogList({ blogs }) {
    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id} style={{ border: '1px solid #eee', margin: '10px 0', padding: 10 }}>
                    <h2>
                        <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h2>
                    <p>by {blog.author} - {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}
