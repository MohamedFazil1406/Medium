import { Circle } from "./BlogCard";

export default function BlogSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className=" p-4 border-b border-slate-400 pb-4 min-w-lg cursor-pointer">
        <div className="flex">
          <div className="h-2.5 bg-gray-200 rounded-full   w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

          <div className="font-extrabold pl-2 text-sm flex justify-center flex-col ">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="flex justify-center flex-col pl-2 ">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2 ">
          {<div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>}
        </div>
        <div className="text-base font-thin">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full   w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
