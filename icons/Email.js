const Email = ({ color = 'white' }) => {
  return (
    <svg
      width='37'
      height='28'
      viewBox='0 0 37 28'
      fill='white'
      className={`fill-${color}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M33.5312 0H3.46877C1.55597 0 0 1.56999 0 3.50002V24.5C0 26.43 1.55597 28 3.46877 28H33.5312C35.444 28 37 26.43 37 24.5V3.50002C37 1.56999 35.444 0 33.5312 0V0ZM33.5312 2.33332C33.6883 2.33332 33.8378 2.36621 33.9744 2.42364L18.5 15.9562L3.02552 2.42364C3.16215 2.36629 3.3116 2.33332 3.4687 2.33332H33.5312ZM33.5312 25.6666H3.46877C2.83081 25.6666 2.31249 25.1437 2.31249 24.4999V4.88882L17.7423 18.3818C17.9603 18.572 18.2301 18.6666 18.5 18.6666C18.7699 18.6666 19.0397 18.5721 19.2577 18.3818L34.6875 4.88882V24.5C34.6874 25.1437 34.1692 25.6666 33.5312 25.6666V25.6666Z' />
    </svg>
  )
}

export default Email
