import { useState, useEffect } from 'react'
import useAxios from '../hooks/useAxios'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Services from '../components/Services'
import Contact from '../components/Contact'
import { createLocaleDateString } from '../functions/convertDate'

const Home = () => {
  const { response, loading } = useAxios({
    method: 'get',
    url: '/works'
  })
  const [data, setData] = useState('')

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  return (
    <main>
      <Header />

      {/* My Work */}
      <section className='container py-20 mx-auto mywork'>
        <h2 className='pb-6 text-lg text-center underline md:text-3xl'>My Work</h2>

        {/* Psuedo Element (Placeholder) before loading works */}
        {loading ? (
          <div className='grid w-4/5 mx-auto bg-blue-300 rounded-lg shadow-xl h-fit dark:bg-white sm:grid-cols-2 opacity-30 dark:opacity-40'>
            <div className='w-40 h-40 mx-auto mt-4 bg-gray-200 rounded-tl-lg rounded-bl-lg animate-pulse sm:mt-0 sm:mx-0'></div>
            <div className='p-5 mr-0 xl:-ml-80 lg:-ml-40 md:-ml-20 xl:mr-20'>
              <div className='h-6 mb-4 bg-gray-200 rounded-sm animate-pulse'></div>

              <div className='grid grid-cols-4 gap-1'>
                <div className='h-4 col-span-3 bg-gray-200 rounded-sm animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded-sm animate-pulse'></div>

                <div className='h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse'></div>
                <div className='h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse'></div>

                <div className='h-4 bg-gray-200 rounded-sm animate-pulse'></div>
                <div className='h-4 col-span-3 bg-gray-200 rounded-sm animate-pulse'></div>
                <div className='h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded-sm animate-pulse'></div>
              </div>
            </div>
          </div>
        ) : (
          data &&
          data.map((work, idx) => (
            <div
              className='flex flex-col items-center justify-center md:flex-row'
              key={idx}
              dir='auto'
            >
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={work?.workOnlineLink}
                className='relative space-y-6 rounded-3xl'
              >
                <img
                  src={work?.workImgDisplayPath}
                  alt={work?.workName}
                  className='w-52 h-52 shadow-lg object-cover aspect-square rounded-[inherit]'
                  width='208'
                  height='208'
                />
              </a>
              <div className='flex-1 min-w-[45%] p-10 leading-[3rem] text-justify space-y-5'>
                <h3 className='text-xl font-bold'>{work?.workName}</h3>
                <span className='text-lg'>
                  تم إنجازه في: {createLocaleDateString(work?.workDate)}
                </span>
                <p>{work?.workDesc}</p>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={work?.workOnlineLink}
                  className='inline-block px-6 py-1 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Services */}
      <Services />

      {/* Contact Me */}
      <Contact />

      <Footer />
    </main>
  )
}

export default Home
