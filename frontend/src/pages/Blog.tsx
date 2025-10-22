import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks/useBlogs";
import { useParams } from "react-router-dom";

export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">loading...</div>
      </div>
    );
  }
  return <div>{blog && <FullBlog blog={blog} />}</div>;
}
