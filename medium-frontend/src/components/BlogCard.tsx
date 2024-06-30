import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4">
            <div className="mb-2 flex  items-center mt-2 space-x-2 max-w-screen-md cursor-pointer">

                <Avatar authorName={authorName} />
                <div>{authorName}</div>
                <div className="text-xs">&#9679;</div>

                <div className="text-slate-500">{publishedDate}</div>

            </div>
            <div className="font-bold text-xl">{title}</div>
            <div className="text-black text-lg mt-2">{content.slice(0, 100) + "..."}</div>
            <div className="mt-2">{`${Math.ceil(content.length / 100)}minute(s) read`}</div>
            <div className="border-b-2"></div>
        </div>
    </Link>
}

export function Avatar({ authorName }: { authorName: string }) {
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
    </div>
}