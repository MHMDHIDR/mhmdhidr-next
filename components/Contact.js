import { useState } from 'react'
import Axios from 'axios'
import Notification from './Notification'
import Spinner from '../icons/Spinner'

const Contact = () => {
  const [theName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')

  //Msg returned from server
  const [loading, setloading] = useState()
  const [sendStatus, setSendStatus] = useState()
  const [sendStatusMsg, setSendStatusMsg] = useState()

  const EMAIL_FORM_URL = 'https://formsubmit.co/ajax/mr.hamood277@gmail.com'

  const sendContactForm = async e => {
    e.preventDefault()
    e.target[4].setAttribute('disabled', 'disabled')

    //getting msg var like this because if the user didn't change the default msg from service buy button
    const msg = document.getElementById('msg').value

    setloading(true)

    try {
      Axios.defaults.headers.post['Content-Type'] = 'application/json'
      const sendMail = await Axios.post(EMAIL_FORM_URL, {
        theName,
        email,
        subject,
        msg
      })
      //getting response from backend
      const { data } = sendMail

      setSendStatus(data.success === 'true' ? 1 : 0)
      setSendStatusMsg(
        data?.message === 'The form was submitted successfully.'
          ? 'شكراً على تواصلك معنا، سيتم الرد عليك في أقرب وقت ممكن 😄'
          : data?.message
      )
    } catch ({ response }) {
      setSendStatusMsg(
        response.status === 400 ? 'رجاء تعبئة جميع الحقول أدناه' : response.statusText
      )
    } finally {
      setloading(false)
    }
  }

  return (
    <section className='container py-20 mx-auto contact' id='contact'>
      {/* Contact Form */}
      <h2 className='pb-6 text-lg text-center underline md:text-3xl'>Contact ME</h2>
      <form className='mx-2 mt-7 max-w-7xl sm:mx-auto' onSubmit={sendContactForm}>
        {/* Send email notification */}
        <Notification sendStatus={sendStatus} sendStatusMsg={sendStatusMsg} />

        <label htmlFor='name' className='form-group'>
          <input
            type='text'
            id='name'
            name='name'
            title='Please type your name'
            max='250'
            className='form-input'
            onChange={e => setName(e.target.value)}
            dir='auto'
            required
          />
          <span className='form-label'>your name</span>
        </label>

        <label htmlFor='email' className='form-group'>
          <input
            type='email'
            id='email'
            name='email'
            title='Please type your email'
            className='form-input'
            maxLength='150'
            onChange={e => setEmail(e.target.value)}
            required
          />
          <span className='form-label'>your email</span>
        </label>

        <label htmlFor='subject' className='form-group'>
          <input
            type='text'
            id='subject'
            name='subject'
            title='The subject of the message'
            className='form-input'
            onChange={e => setSubject(e.target.value)}
            dir='auto'
            required
          />
          <span className='form-label'>Subject</span>
        </label>

        <label htmlFor='msg' className='form-group'>
          <textarea
            name='msg'
            id='msg'
            title='Please type your message'
            className='h-40 resize-none form-input'
            maxLength='600'
            dir='auto'
            required
          ></textarea>
          <span className='form-label'>your message</span>
        </label>

        <div className='mb-20 border-none form-group'>
          <button
            className={`w-full px-12 py-3 text-white uppercase bg-blue-600 rounded-lg hover:bg-blue-700 scale-100 transition-all flex justify-center items-center gap-3${
              loading && loading ? ' scale-105 cursor-progress' : ''
            } ${
              loading || !loading ? ' disabled:opacity-30 disabled:hover:bg-blue-600' : ''
            }`}
            type='submit'
            id='submitBtn'
          >
            {loading && loading ? (
              <>
                <Spinner />
                Sending...
              </>
            ) : (
              'send'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Contact
