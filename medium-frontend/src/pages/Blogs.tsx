import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="min-w-80">
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"20 July 2024"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
