import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

// Assuming you have a function to handle logout


export const AppBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        
        // Clear authentication tokens or perform other logout actions
        // For example:
        localStorage.removeItem('authToken'); // Adjust as needed
    
        // Redirect to the login page or another page
        navigate('/signin') // Adjust the redirect path as needed
    };

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="font-semibold">BlogBloom</Link>

            <div className="flex items-center">
                <Link to={'/publish'}>
                    <button 
                        type="button" 
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        New
                    </button>
                </Link>

                <Avatar authorName="Anonymous" />

                <button 
                    onClick={handleLogout} 
                    type="button" 
                    className="ml-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
