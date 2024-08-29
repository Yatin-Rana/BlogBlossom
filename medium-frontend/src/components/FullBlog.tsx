import { AppBar } from "./AppBar";
import { Blog } from "../hooks";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const FullBlog = ({ blog }: { blog: Blog }) => {
const navigate = useNavigate()
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`${BACKEND_URL}/api/v1/blogs/${blog.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                alert('Blog deleted successfully');
                navigate('/blogs')
                // Optionally, redirect or update the UI here
                // Example: window.location.href = '/'; // Redirect to homepage
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Error deleting blog');
            }
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-24 w-full max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold">{blog.title}</div>
                        <div className="text-gray-400">Posted on August 24, 2023</div>
                        <div className="pt-2">{blog.content}</div>
                    </div>
                    <div className="col-span-4">
                        <button 
                            onClick={handleDelete} 
                            className="mt-4 text-white bg-red-500 rounded-md w-24"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="col-span-4 mt-4">
                        <div className="text-xl">Author</div>
                        <div className="font-bold">{blog.author.name || "Anonymous"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
