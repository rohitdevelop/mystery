"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth';

const Navbar = () => {
const { data: session} = useSession();
   
const user: User =  session?.user as User;


return (
  <nav className="w-full bg-white shadow-md py-4 px-6">
  <div className="max-w-6xl mx-auto flex items-center justify-between">

    {/* Logo */}
    <a
      href="#"
      className="text-xl font-bold text-black hover:text-gray-700 transition"
    >
      Mystery Messages
    </a>

    {/* Right side content */}
    {session ? (
      <div className="flex items-center gap-4">

        {/* Username */}
        <span className="text-gray-700 font-medium">
          Welcome, {user?.username || user?.email}
        </span>

        {/* Logout button */}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    ) : (
      <Link href="/sign-in">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition">
          Login
        </button>
      </Link>
    )}
  </div>
</nav>

  )
}

export default Navbar
