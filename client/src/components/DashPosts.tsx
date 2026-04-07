import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

interface Post {
    _id: string;
    title: string;
    content: string;
    category: string;
    slug: string;
    userId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function DashPosts() {
    const { currentUser } = useSelector((state: any) => state.user);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [showMore, setShowMore] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
                {
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md '>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date updated</TableHeadCell>
                                <TableHeadCell>Post image</TableHeadCell>
                                <TableHeadCell>Post title</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                                <TableHeadCell>Delete</TableHeadCell>
                                <TableHeadCell>
                                    <span>Edit</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='divide-y'>
                            {userPosts.map((post) => (

                                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post.slug}>
                                    <TableCell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover rounded-md bg-gray-500'
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>
                                        <span
                                            className='font-medium text-red-500 hover:underline cursor-pointer'
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className='text-teal-500 hover:underline'
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='w-full text-teal-500 self-center text-sm py-7 cursor-pointer'
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : (
                <p>You have no posts yet!</p>
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
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' onClick={handleDeletePost}>
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
    )
}