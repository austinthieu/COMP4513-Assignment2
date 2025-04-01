"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import db from './utils/supabase/client';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const router = useRouter();

  // TODO: Rest of Data from API

  // Fetch Artists from supabase
  async function fetchArtists() {
    console.log('Fetching...');
    const { data, error } = await db.from('artists')
      .select('*');
    if (error) {
      console.error('Error fetching artists:', error);
      return;
    }
    setArtists(data);
  }

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/galleries');
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center">
      <Head>
        <title>Welcome | COMP4513 Art Gallery</title>
        <meta name="description" content="Welcome to COMP4513 Art Gallery" />
      </Head>

      {/* Image from https://unsplash.com/@deuxdoom }
      {/* Background image */}
      <Image
        alt="Gallery"
        src="/hero-image.jpg"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />

      <div className="relative w-full max-w-md px-6 py-12 mx-auto">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-white mb-8 drop-shadow-lg">
          Welcome to the Art Gallery
        </h1>

        {/* Login Card */}
        <div className="backdrop-blur-sm bg-black/60 rounded-xl shadow-2xl p-8 border border-gray-700">
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-100">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Or{' '}
              <Link href="/" className="font-medium text-indigo-400 hover:text-indigo-300">
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800/80 placeholder-gray-400 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800/80 placeholder-gray-400 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
