import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import { FaBell } from 'react-icons/fa'
import logo from '../../assets/images/logo.png'

function Header() {
  return (
    <header className='bg-[#1a1a1a] flex justify-between items-center py-4 px-8'>
        {/* LOGO */}
        <div className='flex items-center gap-2'>
            <img src={logo} alt="Restaurant Logo" className='h-8 w-8' />
            <h1 className='text-lg font-semibold text-[#f5f5f5]'>Restro</h1>
        </div>

        {/* SEARCH */}
        <div className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-125'>
            <FaSearch className='text-[#f5f5f5]'/>
            <input type="text" placeholder='Search' className='bg-[#1f1f1f] outline-none text-[#f5f5f5]'/>
        </div>

        {/* LOGGED USER DETAILS */}
        <div className='flex items-center gap-4'>
            <div className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
                <FaBell className='text-[#f5f5f5] text-2xl'/>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaUserCircle className='text-[#f5f5f5] text-4xl'/>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <h1 className='text-lg text-[#f5f5f5] font-semibold'>Tian</h1>
                    <p className='text-xs text-[#ababab] font-medium'>Admin</p>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header