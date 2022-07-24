const Loading = () => (
  <div className='fixed inset-0 flex items-center justify-center w-screen h-screen bg-gray-300 dark:bg-gray-600'>
    <div className='absolute w-6 h-6 bg-blue-700 rounded-full dark:bg-blue-300 animate-fly-in'></div>
    <div className='absolute w-6 h-6 bg-blue-700 rounded-full dark:bg-blue-300 animate-fly-in animate-delay-100'></div>
    <div className='absolute w-6 h-6 bg-blue-700 rounded-full dark:bg-blue-300 animate-fly-in animate-delay-200'></div>
  </div>
)

export default Loading
