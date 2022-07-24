import { useState, useEffect } from 'react'
import useAxios from '../hooks/useAxios'

import Nav from '../components/Nav'
import ScrollTo from '../functions/ScrollToSection'
import Github from '../icons/Github'
import Email from '../icons/Email'

const Header = () => {
  const { response, loading } = useAxios({
    method: 'get',
    url: '/settings'
  })
  const [data, setData] = useState('')

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  return (
    <header className='container relative px-10 py-6 mx-auto'>
      <Nav />
      <main className='flex flex-wrap justify-center gap-8 p-4 mx-auto mt-20 overflow-hidden border border-gray-400 border-dashed max-w-max'>
        <img
          src={
            //if the image is not set, use the default image
            !data.websiteHeroDisplayPath
              ? 'https://mhmdhidr-portfolio-uploads.s3.amazonaws.com/hero-img.webp'
              : data?.websiteHeroDisplayPath
          }
          alt='hero img'
          width='256'
          height='256'
          className='object-cover w-64 h-64 2xl:order-1 aspect-square drop-shadow-lg'
        />
        <div className='flex flex-col items-start justify-center space-y-8'>
          <p className='text-xl font-semibold uppercase lg:text-4xl text-center [word-spacing:1rem]'>
            {loading ? "i'm here to make your website idea a reality!" : data?.siteDesc}
          </p>
          <button
            className='relative px-4 py-1 overflow-hidden text-white transition-colors bg-blue-600 rounded-full shadow-xl pr-9 hover:bg-blue-700 group'
            data-scroll='mywork'
            onClick={e => ScrollTo(e)}
          >
            See My Work
            <span className='absolute pl-2 transition-transform group-hover:translate-x-1'>
              &rarr;
            </span>
          </button>
          <div>
            <p className='text-sm uppercase'>Get In Touch</p>
            <a
              className='inline-flex m-1 mt-2 ml-0 transition-transform hover:-translate-y-1'
              href={loading ? 'https://github.com/mhmdhidr' : data?.githubLink}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Github Profile'
            >
              <Github color='blue-400' />
            </a>
            <a
              className='inline-flex m-1 mt-2 ml-5 transition-transform hover:-translate-y-1'
              href={`mailto:${loading ? 'Mr.hamood277@gmail.com' : data?.contactEmail}`}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Email Address'
            >
              <Email color='blue-400' />
            </a>
          </div>
        </div>
      </main>
    </header>
  )
}

export default Header
