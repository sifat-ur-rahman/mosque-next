'use client';

import { useEffect, useState } from 'react';

const NotFound = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="animate-blob absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
                <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#04101E] opacity-70 mix-blend-multiply blur-xl filter"></div>
                <div className="animate-blob animation-delay-4000 absolute left-40 top-40 h-80 w-80 rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`animate-float absolute h-2 w-2 rounded-full bg-white opacity-60`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center">
                {/* Main 404 Text */}
                <div
                    className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <h1 className="mb-4 animate-pulse bg-gradient-to-r from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
                        404
                    </h1>
                </div>

                {/* Animated subtitle */}
                <div
                    className={`transition-all delay-300 duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <div className="relative mb-6">
                        <h2 className="mb-2 animate-bounce text-2xl font-semibold text-gray-800 md:text-3xl">
                            Oops! Page Not Found
                        </h2>
                        <div className="mx-auto h-1 w-24 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>
                </div>

                {/* Description */}
                <div
                    className={`transition-all delay-500 duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <p className="mb-8 text-lg leading-relaxed text-gray-600">
                        The page you're looking for seems to have wandered off
                        into the digital void. Don't worry, even the best
                        explorers sometimes take a wrong turn!
                    </p>
                </div>

                {/* Animated buttons */}
                <div
                    className={`transition-all delay-700 duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="group flex transform items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
                        >
                            <svg
                                className="mr-2 h-6 w-6 group-hover:animate-pulse"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            Go Home
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="group flex transform items-center rounded-full border-2 border-purple-300 px-8 py-3 text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-purple-50"
                        >
                            <svg
                                className="mr-2 h-4 w-4 group-hover:animate-pulse"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                            </svg>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default NotFound;
