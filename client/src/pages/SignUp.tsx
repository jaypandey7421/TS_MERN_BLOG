import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiInformationCircle } from "react-icons/hi";
import OAuth from "../components/OAuth";

interface FormData {
    username: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        });
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
                return;
            }

            setLoading(false);
            if (res.ok) {
                navigate('/signin');
            }
        } catch (err: any) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
                {/* Left Side */}
                <div className="flex-1">
                    <Link to='/' className='font-bold text-4xl'>
                        DEV.Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign up with your email and password
                        or with Google.
                    </p>
                </div>
                {/* Right  */}
                <div className="flex-1">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" className="dark:text-black">Username</Label>
                            </div>
                            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" className="dark:text-black">Email</Label>
                            </div>
                            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" className="dark:text-black">Password</Label>
                            </div>
                            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                        </div>
                        <Button
                            color="purple"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner aria-label="Default status example" />
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/signin' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert color="failure" icon={HiInformationCircle}>
                            <span className="font-medium">Info alert!</span>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>

        </div>
    )
}