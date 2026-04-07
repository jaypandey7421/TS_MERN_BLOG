import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from "flowbite-react";

interface Comment {
    _id: string;
    content: string;
    userId: string;
    postId: string;
    likes: string[];
    numberOfLikes: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CommentProps {
    comment: Comment;
    onLike: (commentId: string) => void;
    onEdit: (comment: Comment, editedContent: string) => void;
    onDelete: (commentId: string) => void;
}

interface User {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Comment({ comment, onLike, onEdit, onDelete }: CommentProps) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState<string | undefined>(undefined);
    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                // fetch user details like profile picture and username
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comment/editComment/${comment._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editedContent
                })
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent || '');
            }
        } catch (err: any) {
            console.log(err.message);
        }
    }


    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200'
                    src={user?.profilePicture}
                    alt={user?.username}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                            <Button
                                type='button'
                                size='sm'
                                className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                color='purple'
                                outline
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${currentUser &&
                                    comment.likes.includes(currentUser._id) &&
                                    'text-blue-500!'
                                    }`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes +
                                    ' ' +
                                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                            {currentUser &&
                                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={handleEdit}
                                            className='text-gray-400 hover:text-blue-500'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => onDelete(comment._id)}
                                            className='text-gray-400 hover:text-red-500'
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}