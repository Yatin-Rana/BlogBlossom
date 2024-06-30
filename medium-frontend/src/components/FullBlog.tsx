import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
export const FullBlog = ({ blog }: {blog: Blog }) => {
    return <div>
        <AppBar />
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-24 w-full max-w-screen-xl pt-12">
            <div className="col-span-8 ">
                <div className=" text-4xl font-extrabold">{blog.title}</div>
                <div className="text-gray-400">Posted on August 24,2023</div>
                <div className="pt-2">{blog.content}</div>
            </div>
            <div className="col-span-4 ">
                Author
               <div className="text-xl font-bold"> {blog.author.name || "Anonymous"}</div>
               <div className="pt-2 text-slate-500">Random catch phrase about the author's ability to grab the users attention</div>
               </div>
        </div>
    </div>
    </div>
}