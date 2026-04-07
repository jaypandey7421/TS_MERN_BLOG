import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

interface Post {
    _id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/getPosts`, {
                    credentials: 'include',
                });
                const data = await res.json();
                setPosts(data.posts);
            };
            fetchPosts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Hero />

                {/* Featured Posts */}
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center">Featured Posts</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </section>

                {/* Categories */}
                <section className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <h2 className="text-2xl font-semibold mb-8">Categories</h2>
                        <div className="flex flex-wrap gap-4">
                            {["React", "JavaScript", "CSS", "Backend", "Career"].map(
                                (category) => (
                                    <span
                                        key={category}
                                        className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition"
                                    >
                                        {category}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-gray-600 mb-8">
                        Subscribe to the newsletter to get the latest posts directly in your
                        inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </section>

            </div>


        </>
    )
}