import Link from 'next/link'
// import DarkmodeToggle from '../DarkmodeToggle'

const DashboardNav = () => {
  const handleLogout = () => {
    'user' in localStorage && localStorage.removeItem('user')
    window.location.location('/')
  }

  return (
    <nav className='flex flex-wrap items-center justify-between text-lg '>
      <Link href='/'>
        <img
          src='/assets/imgs/logo.svg'
          alt='Mohammed Hayder Logo'
          width='96'
          height='40'
          className='w-24 h-10'
        />
      </Link>

      {/* <DarkmodeToggle /> */}

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
        className='absolute w-10 h-10 opacity-0 cursor-pointer right-10 top-5 peer'
        type='checkbox'
        title='Navigation Menu'
      />

      {/* Navigation Menu */}
      <div
        className='w-full transition-all duration-200 opacity-100 pointer-events-none -translate-y-[35rem] peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto md:z-0 md:pointer-events-auto md:translate-y-0 md:flex md:items-center md:w-auto md:opacity-100'
        id='menu'
      >
        <ul
          className='absolute flex flex-col items-center w-full py-10 mx-auto mt-5 space-y-10 text-xl text-black border border-blue-300 rounded-lg shadow-lg bg-gradient-to-r from-cyan-300 to-blue-400 md:static md:justify-between md:flex-row md:space-x-11 md:space-y-0 md:bg-none md:text-inherit md:mt-0 md:text-lg md:border-none md:shadow-none'
          id='menu'
        >
          <li>
            <Link href='work' className='underline-hover'>
              Works
            </Link>
          </li>
          <li>
            <Link href='services' className='underline-hover'>
              Services
            </Link>
          </li>
          <li>
            <Link href='appsettings' className='underline-hover'>
              Settings
            </Link>
          </li>
          <li>
            <Link
              href='/#'
              className='p-2 text-blue-700 bg-blue-200 rounded-lg hover:font-bold'
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default DashboardNav
