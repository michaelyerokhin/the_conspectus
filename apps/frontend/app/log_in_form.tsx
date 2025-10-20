'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Save JWT in localStorage or cookie
      localStorage.setItem('token', data.session.access_token);
      setMessage('Login successful!');

      // Optionally redirect to dashboard or login
      // router.push('/dashboard');
    } else {
      setMessage(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    setMessage('Server error. Try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in</h2>
        <p className="text-gray-500 mb-6">Sign in to access your saved survey data</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition"
            >
              Sign In
            </button>
          </div>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Don\&apos;t have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
          </p>
        </form>

      </div>
    </div>
  );
}
