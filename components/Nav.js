import { useState, useEffect } from 'react'
import useAxios from '../hooks/useAxios'

import Link from 'next/link'
import scrollTo from '../functions/ScrollToSection'
import DarkmodeToggle from './DarkmodeToggle'

const Nav = () => {
  const { response, loading } = useAxios({
    method: 'get',
    url: '/settings'
  })
  const [logoPath, setLogoPath] = useState('')

  useEffect(() => {
    setLogoPath(response?.websiteLogoDisplayPath)
  }, [response])

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between px-5 py-4 text-lg bg-gray-400 shadow-xl md:px-10 lg:px-20 bg-opacity-50 backdrop-blur-sm saturate-[180%]'>
      <Link href='/'>
        <img
          src={loading ? 'assets/imgs/logo.svg' : logoPath}
          alt='Mohammed Hayder Logo'
          className='w-24 h-10 logo'
          width='96'
          height='40'
        />
      </Link>

      <DarkmodeToggle />

      {/* Nav toggler */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-10 h-10 md:hidden'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
      <input
        className='absolute w-10 h-10 opacity-0 cursor-pointer right-5 top-4 peer'
        type='checkbox'
        title='Navigation Menu'
      />

      {/* Navigation Menu */}
      <div
        className='w-full transition-all duration-200 opacity-0 pointer-events-none -translate-y-96 peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto md:pointer-events-auto md:translate-y-0 md:flex md:items-center md:w-auto md:opacity-100'
        id='menu'
      >
        <ul
          className='absolute flex flex-col items-center w-full py-8 mx-auto mt-8 space-y-10 text-xl text-black border border-blue-300 rounded-lg shadow-lg bg-gradient-to-r from-cyan-300 to-blue-400 md:static md:justify-between md:flex-row md:space-x-11 md:space-y-0 md:bg-none md:py-0 md:text-inherit md:mt-0 md:text-lg md:border-none md:shadow-none'
          id='menu'
        >
          <li>
            <Link href='/#' className='underline-hover' data-scroll='mywork'>
              <span onClick={e => scrollTo(e)}>My Work</span>
            </Link>
          </li>
          <li>
            <Link href='/#' className='underline-hover' data-scroll='services'>
              <span onClick={e => scrollTo(e)}>Services</span>
            </Link>
          </li>
          <li>
            <Link
              href='/#'
              className='px-4 py-1.5 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
              data-scroll='contact'
            >
              <span onClick={e => scrollTo(e)}>Contact Me!</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
