import { Button, TextInput, Alert, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from "react";
import { storage, ID } from "../appwriteConfig";
import { Link } from "react-router";
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutSuccess
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state: any) => state.user);
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [imageFileUrl, setImageFileUrl] = useState<string | undefined>(undefined);
    const [imageFileUploadError, setImageFileUploadError] = useState<string | undefined>(undefined);
    const [imageFileUploading, setImageFileUploading] = useState<boolean>(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState<string | undefined>(undefined);
    const [updateUserError, setUpdateUserError] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        if (!imageFile) return;

        setImageFileUploading(true);
        setImageFileUploadError(undefined);
        try {
            const response = await storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(), // Generate a unique file ID
                imageFile, // The file object
            );
            // console.log('File uploaded successfully:', response);
            const fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);
            setImageFileUrl(fileUrl);
            setFormData({ ...formData, profilePicture: fileUrl });
            setImageFileUploading(false);
            alert('File uploaded successfully!');
        } catch (error) {
            setImageFileUploadError('Error uploading file');
            console.error('Error uploading file:', error);
        } finally {
            setImageFile(undefined);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUpdateUserError(undefined);
        setUpdateUserSuccess(undefined);

        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made.');
            return;
        }

        if (imageFileUploading) {
            setUpdateUserError('Please wait for the image to upload');
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update/${currentUser._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
            }
        } catch (err: any) {
            dispatch(updateFailure(err.message));
            setUpdateUserError(err.message);
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (err: any) {
            dispatch(deleteUserFailure(err.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/signout`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    ref={filePickerRef}
                    onChange={handleImageChange}
                    hidden
                />
                <div
                    className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current?.click()}
                >
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    color='purple'
                    className="cursor-pointer"
                    disabled={loading || imageFileUploading}
                    outline
                >
                    {loading ? 'Loading...' : 'Update'}
                </Button>
                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button
                            type='button'
                            color='purple'
                            className="w-full"
                        >
                            Create a post
                        </Button>
                    </Link>
                )}
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
            </div>
            {updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )}
            {error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <ModalHeader />
                <ModalBody>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='alternative' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}