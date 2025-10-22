import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className=" p-4 border-b border-slate-400 pb-4 min-w-lg cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />

          <div className="font-extrabold pl-2 text-sm flex justify-center flex-col ">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 ">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2 ">{title}</div>
        <div className="text-base font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )}min`}</div>
      </div>
    </Link>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: String;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center   overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text:lg"
        } text-gray-600 dark:text-gray-300`}
      >
        {name
          .split(" ")
          .map((w: string) => w[0] || "")
          .join("")}
      </span>
    </div>
  );
}
