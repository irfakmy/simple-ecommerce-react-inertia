import { Head } from '@inertiajs/react';

const About = () => {
    return (
        <>
            <Head title="About Us" />
            <div className="container mx-auto max-w-7xl px-4 py-10">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-lg text-gray-700">
                    Selamat datang di halaman About! Ini adalah halaman tentang kami yang menggunakan Laravel, React, dan Inertia.js.
                </p>
            </div>
        </>
    );
}

export default About;
