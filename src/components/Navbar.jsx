import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 bg-[#706D54] text-white'>
      <div className='font-bold text-2xl'>2-Do</div>
      <div cl>
        <ul className='flex gap-7 hover:cursor-pointer'>
            <li className='hover:font-bold'>Home</li>
            <li className='hover:font-bold'>Your Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
