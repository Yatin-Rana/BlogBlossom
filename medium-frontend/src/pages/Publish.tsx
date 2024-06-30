import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <AppBar />
            <div className="flex flex-col items-center w-full">
                <div className="max-w-screen-lg w-full pt-8 mb-4">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="helper-text"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />
                </div>
                <div className="max-w-screen-lg w-full pt-8 mb-4">
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="max-w-screen-lg w-full mb-4">
                    <button
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content: description,
                                },
                                {
                                    headers: {
                                        Authorization: localStorage.getItem("token"),
                                    },
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                        }}
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="max-w-screen-lg">
            <form>
                <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-b-lg">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
                            placeholder="Write an article..."
                            required
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}
