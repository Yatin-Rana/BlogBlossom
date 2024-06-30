import { ChangeEvent, useState } from "react";
import { SignupInput } from "@ya3/common-medium";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";



export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }
        catch (e) {
            console.log(e)
            alert("error while signing up")
        }
    }

    return (
        <div className="h-full">
            <div className="h-full flex flex-col justify-center items-center">
                <div>
                    <h3 className="font-extrabold text-4xl">{type === "signup" ? "Create an account" : "Sign in"}</h3>
                    <div className="flex justify-center">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <p className="pl-2 underline">
                            <Link to={type === "signin" ? "/Signup" : "/Signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                        </p>
                    </div>
                </div>
                <div className="w-full max-w-md"> {/* Adjust the max-w value as needed */}
                    {type === "signup" && (
                        <LabelledInput
                            label="Name"
                            placeholder="Enter your name"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                });
                            }}
                        />
                    )}
                    <LabelledInput
                        label="Username"
                        placeholder="Enter your username"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            });
                        }}
                    />
                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            });
                        }}
                    />
                </div>
                <div className="w-full max-w-md">
                    <button onClick={sendRequest} type="button" className="mt-4 w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-900 font-semibold">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
            />
        </div>
    );
}
