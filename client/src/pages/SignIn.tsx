import { useState } from "react"
import { Link, useNavigate } from 'react-router'
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

interface FormData {
    email: string;
    password: string;
}

export default function SingIn() {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const { loading, error: errorMessage } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }

        try {
            dispatch(signInStart());
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (err: any) {
            dispatch(signInFailure(err.message));
        }
    };

    return (
        <div className='min-h-screen mt-20 '>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left */}
                <div className='flex-1'>
                    <Link to='/' className='font-bold text-4xl'>
                        DEV.Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign in with your email and password
                        or with Google.
                    </p>
                </div>
                {/* right */}

                <div className='flex-1'>
                    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block ">
                                <Label htmlFor="email" className="dark:text-black">Email</Label>
                            </div>
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" className="dark:text-black">Password</Label>
                            </div>
                            <TextInput
                                type='password'
                                placeholder='**********'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            color="purple"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Dont Have an account?</span>
                        <Link to='/signup' className='text-blue-500'>
                            Sign Up
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