const Notification = ({ sendStatus, sendStatusMsg }) => {
  return sendStatusMsg ? (
    <p
      className={`notification__msg relative border border-solid p-3 my-6 rounded-lg text-center font-bold text-2xl transition-all duration-500 rtl ${
        sendStatus === 1
          ? 'bg-green-100 text-green-800 border-green-700'
          : 'bg-red-100 text-red-800 border-red-700'
      }`}
    >
      <button
        type='button'
        aria-label='Close noification'
        className='absolute font-normal cursor-pointer right-4 opacity-60 hover:opacity-100'
        title='close noification'
        onClick={e => {
          const noification = e.target.parentElement.classList
          noification.add('opacity-0', 'pointer-events-none')
        }}
      >
        &#10005;
      </button>
      {sendStatusMsg}
    </p>
  ) : null
}

export default Notification
