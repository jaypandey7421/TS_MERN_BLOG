import { Alert, Button, Textarea, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from './Comment'

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

export default function CommentSection({ postId }: { postId: string | undefined }) {
    const { currentUser } = useSelector((state: any) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (err: any) {
            setCommentError(err.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId: string) => {
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/likeComment/${commentId}`, {
                method: 'PUT',
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleDelete = async (commentId: string) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (res.ok) {
                await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleEdit = async (comment: Comment, editedContent: string) => {
        setComments(comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
        ))
    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={currentUser.profilePicture}
                        alt='profile'
                    />
                    <Link
                        to={'/dashboard?tab=profile'}
                        className='text-xs text-cyan-600 hover:underline'
                    >
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/signin'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form
                    onSubmit={handleSubmit}
                    className='border border-teal-500 rounded-md p-3'
                >
                    <Textarea
                        placeholder='Add a comment...'
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>
                            {200 - comment.length} characters remaining
                        </p>
                        <Button outline color='purple' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )
            }
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId: string) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => handleDelete(commentToDelete || '')}>
                                Yes, I'm sure
                            </Button>
                            <Button color="alternative" onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )

}
