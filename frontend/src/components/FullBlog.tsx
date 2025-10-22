import type { Blogs } from "../hooks/useBlogs";
import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <div>
      <AppBar />
      <div className="grid grid-cols-12 px-10 pt-4 max-w-screen-lg mx-auto">
        <div className="col-span-8">
          <div className="text-3xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500">Post on 2nd December 2036</div>
          <div className="pt-4">{blog.content}</div>
        </div>
        <div className="col-span-4 ">
          <div className="text-slate-600 text-lg"> Author</div>

          <div className="flex">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.username} />
            </div>

            <div>
              <div className="text-xl font-bold">{blog.author.username}</div>
              <div>
                Random catch phrase about the author ability to grab the user
                attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
