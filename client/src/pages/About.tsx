import aboutImg from '../assets/about.jpg';

export default function AboutPage() {
    return (
        <div className="min-h-[80vh] bg-gray-50 text-gray-900">
            {/* Header */}
            <section className="bg-white shadow-sm min-h-screen flex items-center justify-center">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center rotate-5">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About This Blog</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A place where I share my journey, experiences, and knowledge about
                        web development, programming, and technology.
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            I'm a passionate developer who enjoys building modern web
                            applications and sharing what I learn along the way. This blog is
                            my personal space to write about React, JavaScript, backend
                            development, and best practices I discover while working on real
                            projects.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Whether you're a beginner or an experienced developer, my goal is
                            to provide clear, practical, and easy-to-follow content that helps
                            you grow your skills.
                        </p>
                    </div>

                    <div className="w-full h-72 rounded-2xl rotate-5 bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-medium shadow-lg">
                        <img src={aboutImg} alt="about" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                </div>
            </section>

            {/* What This Blog Covers */}
            <section className="bg-white">
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center">
                        What You'll Find Here
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {["React & Frontend", "JavaScript Deep Dives", "Backend & APIs", "Career & Learning"].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="p-6 rounded-2xl bg-gray-50 -rotate-3 border border-gray-200 hover:shadow-md transition"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{item}</h3>
                                    <p className="text-gray-600 text-sm">
                                        Practical tutorials, explanations, and insights related to
                                        {" "}{item.toLowerCase()}.
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
