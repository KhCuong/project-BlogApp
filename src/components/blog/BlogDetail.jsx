export default function BlogDetail({ blog }) {
    if (!blog) return <p>Không tìm thấy bài viết.</p>;
    return (
        <div>
            <h1>{blog.title}</h1>
            <p><b>Tác giả:</b> {blog.author}</p>
            <p><b>Ngày đăng:</b> {new Date(blog.createdAt).toLocaleString()}</p>
            <div style={{ whiteSpace: 'pre-line', marginTop: 20 }}>{blog.content}</div>
        </div>
    );
}
