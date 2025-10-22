import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export default function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center ">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppBar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.username}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd feb 2026"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
