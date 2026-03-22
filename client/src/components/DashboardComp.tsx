import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
    HiAnnotation,
    HiArrowNarrowUp,
    HiDocumentText,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Button,
} from "flowbite-react";

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

export default function DashboardComp() {
    const [users, setUsers] = useState<User[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [lastMonthUsers, setLastMonthUsers] = useState<number>(0);
    const [lastMonthPosts, setLastMonthPosts] = useState<number>(0);
    const [lastMonthComments, setLastMonthComments] = useState<number>(0);

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };
        if (currentUser?.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);


    return (
        <div className='p-3 md:mx-auto'>
            <div className='flex-wrap flex gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className='dark:text-white'>
                            <h3 className='text-gray-500 text-md uppercase '>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className='dark:text-white'>
                            <h3 className='text-gray-500 text-md uppercase'>
                                Total Comments
                            </h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className='dark:text-white'>
                            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2 dark:text-white'>Recent users</h1>
                        <Button outline color="purple">
                            <Link to={'/dashboard?tab=users'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>User image</TableHeadCell>
                                <TableHeadCell>Username</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='divide-y'>
                            {users &&
                                users.map((user) => (
                                    <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell>
                                            <img
                                                src={user.profilePicture}
                                                alt='user'
                                                className='w-10 h-10 rounded-full bg-gray-500'
                                            />
                                        </TableCell>
                                        <TableCell>{user.username}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2 dark:text-white'>Recent comments</h1>
                        <Button outline color="purple">
                            <Link to={'/dashboard?tab=comments'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Comment content</TableHeadCell>
                                <TableHeadCell>Likes</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='divide-y'>
                            {comments &&
                                comments.map((comment) => (
                                    <TableRow key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell className='w-96'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </TableCell>
                                        <TableCell>{comment.numberOfLikes}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2 dark:text-white'>Recent posts</h1>
                        <Button outline color="purple">
                            <Link to={'/dashboard?tab=posts'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Post image</TableHeadCell>
                                <TableHeadCell>Post Title</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='divide-y'>
                            {posts &&
                                posts.map((post) => (
                                    <TableRow key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <TableCell>
                                            <img
                                                src={post.image}
                                                alt='user'
                                                className='w-14 h-10 rounded-md bg-gray-500'
                                            />
                                        </TableCell>
                                        <TableCell className='w-96'>{post.title}</TableCell>
                                        <TableCell className='w-5'>{post.category}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
