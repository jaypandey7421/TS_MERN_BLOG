import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";

interface Comment {
    _id: string;
    content: string;
    postId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    numberOfLikes: number;
    likes: string[];
    __v: number;
}


export default function DashComments() {
    const { currentUser } = useSelector((state: any) => state.user);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showMore, setShowMore] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/getcomments`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/comment/getcomments?startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/comment/deleteComment/${commentIdToDelete}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (res.ok) {
                setComments((prev) =>
                    prev.filter((comment) => comment._id !== commentIdToDelete)
                );
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };


    return (
        <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date Updated</TableHeadCell>
                                <TableHeadCell>Comment content</TableHeadCell>
                                <TableHeadCell>Number of Likes</TableHeadCell>
                                <TableHeadCell>PostId</TableHeadCell>
                                <TableHeadCell>UserId</TableHeadCell>
                                <TableHeadCell>Delete</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y" >
                            {comments.map((comment) => (
                                <TableRow key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>
                                        {new Date(comment.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="min-w-3xs">
                                        {comment.content}
                                    </TableCell>
                                    <TableCell>{comment.numberOfLikes}</TableCell>
                                    <TableCell>{comment.postId}</TableCell>
                                    <TableCell>{comment.userId}</TableCell>
                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setCommentIdToDelete(comment._id);
                                            }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'
                                        >
                                            Delete
                                        </span>
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
                <p>You have no commets yet!</p>
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
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' onClick={handleDeleteComment}>
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