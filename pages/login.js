import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import Loading from '../components/Loading'

const Login = () => {
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const [data, setData] = useState('')
  const [loggedInStatus, setLoggedInStatus] = useState(0)
  const [loading, setloading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  //get user data using token if the user is logged-in and token is saved in localStorage then I'll get the current user data from the database
  useEffect(() => {
    const USER = JSON.parse(localStorage.getItem('user'))
    if (USER) {
      setloading(true)

      Axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${USER.token}`
        }
      })
        .then(res => {
          setData(res.data)

          if (USER?._id === data.id) {
            router.push('/dashboard')
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setloading(false)
        })
    }

    return () => {
      setData('')
    }
  }, [BASE_URL, data.id])

  const sendLoginForm = e => {
    e.preventDefault()

    Axios.post(`${BASE_URL}/users/login`, {
      userEmail,
      userPassword
    })
      .then(({ data }) => {
        setLoggedInStatus(data.LoggedIn)

        if (data.LoggedIn === 1) {
          localStorage.setItem('user', JSON.stringify(data))
          router.push('/dashboard')
        }
        setErrMsg(data?.message)
      })
      .catch(err => {
        console.log(err)
        setErrMsg(
          data.message === 'Request failed with status code 400'
            ? 'Email or Password is Wrong'
            : data.message || 'Request failed with status code 400'
        )
      })
  }

  // if done loading (NOT Loading) then show the login form
  return !loading ? (
    <>
      <main className='container h-screen mx-auto'>
        <Nav />
        <section className='pt-40'>
          <Notification sendStatus={loggedInStatus} sendStatusMsg={errMsg} />
          <h2 className='text-4xl text-center underline'>Login</h2>
          <form className='mt-32' onSubmit={sendLoginForm}>
            <label htmlFor='email' className='form-group'>
              <input
                type='email'
                id='email'
                name='email'
                title='Please type your Email'
                className='form-input'
                maxLength='100'
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              <span className='form-label'>your email</span>
            </label>
            <label htmlFor='password' className='form-group'>
              <input
                type='password'
                id='password'
                name='password'
                title='Enter your password'
                className='form-input'
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className='form-label'>Password</span>
            </label>
            <div className='mb-20 border-none form-group'>
              <button
                className='w-full px-12 py-3 text-white uppercase transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
                type='submit'
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}
export default Login
