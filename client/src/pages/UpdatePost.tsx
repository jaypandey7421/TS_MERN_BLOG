import { Button, FileInput, Select, TextInput, Label, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Editor from "../components/Editor";
import { storage, ID } from "../appwriteConfig";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

interface Post {
    _id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    slug: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function CreatePost() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Post>({
        _id: '',
        title: '',
        content: '',
        image: '',
        category: '',
        slug: '',
        userId: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
    });
    const [publishError, setPublishError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            };

            fetchPost();
        } catch (err: any) {
            console.log(err.message);
        }
    }, [postId]);

    const handleUploadImage = async () => {
        if (!imageFile) return;

        setImageUploading(true);
        setImageUploadError(null);
        try {
            const response = await storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(), // Generate a unique file ID
                imageFile, // The file object
            );
            // console.log('File uploaded successfully:', response);
            const fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);
            setFormData({ ...formData, image: fileUrl });
            setImageUploading(false);
            alert('File uploaded successfully!');
        } catch (error) {
            setImageUploadError('Error uploading file');
            console.error('Error uploading file:', error);
        } finally {
            setImageFile(null);
            setImageUploading(false);
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        defaultValue={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {/* <input type="text" name="input" id="input" value={formData.title} /> */}
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        value={formData.category}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <div>
                        <Label className="mb-2 hidden" htmlFor="default-file-upload">
                            Default size file input
                        </Label>
                        <FileInput
                            id="default-file-upload"
                            accept='image/*'
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    {/* <FileInput type='file' accept='image/*' /> */}
                    <Button
                        type='button'
                        color='purple'
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploading}
                    >
                        {imageUploading ? (
                            'Loading'
                        ) : (
                            'Upload Image'
                        )

                        }
                    </Button>
                </div>
                {imageUploadError &&
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Info alert!</span>
                        {imageUploadError}
                    </Alert>
                }

                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full  object-cover'
                    />
                )
                }

                <Editor
                    onContentChange={(newContent: string) => setFormData({ ...formData, content: newContent })}
                    preValue={formData.content}
                />
                <Button
                    type='submit'
                    color="purple"
                    className="cursor-pointer"
                >
                    Update
                </Button>
                {publishError && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Info alert!</span>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    )
}