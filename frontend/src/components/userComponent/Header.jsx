import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa6";


const Header = () => {
  return (
    <>
    

<nav className="bg-[#32012F] border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://i.pinimg.com/originals/c9/4a/60/c94a60f3c149d0d229602dc8078b4488.png" className="h-12 shadow-md" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Nisha</span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/cart" className="text-3xl  text-white dark:text-white hover:underline"><FaCartPlus /></Link>
            <Link to="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
            <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign in</button>
            </Link>
        </div>
    </div>
</nav>
<nav className="bg-[#BFF6C3] dark:bg-gray-700 shadow-md">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                </li>
                <li>
                    <Link to="/product" className="text-gray-900 dark:text-white hover:underline">Product</Link>
                </li>
                <li>
                    <Link to="#" className="text-gray-900 dark:text-white hover:underline">Team</Link>
                </li>
                <li>
                    <Link to="#" className="text-gray-900 dark:text-white hover:underline">Features</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>

    </>
  )
}

export default Header
   