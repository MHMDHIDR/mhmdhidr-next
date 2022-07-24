import Link from 'next/link'
import scrollTo from './functions/ScrollToSection'
import Home from './icons/Home'
import Email from './icons/Email'

const PageNotFound = () => (
  <div className='relative h-screen overflow-hidden bg-indigo-900'>
    <img
      src='https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auhref=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9'
      className='absolute object-cover w-full h-full'
      alt="You're all alone in here, Page Not Found"
    />
    <div className='absolute inset-0 bg-black opacity-25'></div>
    <div className='container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40'>
      <div className='relative z-10 flex flex-col items-center w-full select-none'>
        <h1 className='mt-4 text-5xl leading-tight text-center text-white'>
          You are all lost and alone here
        </h1>

        <p className='font-bold text-white text-8xl my-44 animate-bounce'>404</p>

        <div className='flex gap-14'>
          <Link
            href='/'
            className='flex items-center gap-4 px-8 py-6 text-2xl text-white transition-colors bg-blue-600 border-4 rounded-xl hover:bg-blue-700'
          >
            <Home color='white' />
            Home
          </Link>

          <Link
            href='/contact'
            className='flex items-center gap-4 px-8 py-6 text-2xl text-white transition-colors bg-blue-600 border-4 rounded-xl hover:bg-blue-700'
            data-scroll='contact'
            onClick={e => scrollTo(e)}
          >
            <Email />
            Contact Me!
          </Link>
        </div>
      </div>
    </div>
    <Outlet />
  </div>
)

export default PageNotFound
