import Link from 'next/link'

const DashboardWork = () => {
  return (
    <section className='h-screen rtl'>
      <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>الأعمال</h3>

      <div className='flex flex-wrap gap-4 justify-evenly'>
        <Link
          href='add'
          className='px-10 py-5 text-2xl font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg hover:bg-blue-300'
        >
          إضافة عمل جديد
        </Link>
        <Link
          href='list'
          className='px-10 py-5 text-2xl font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg hover:bg-blue-300'
        >
          تصفح الأعمال الخاصة بك
        </Link>
      </div>
      <Outlet />
    </section>
  )
}

export default DashboardWork
