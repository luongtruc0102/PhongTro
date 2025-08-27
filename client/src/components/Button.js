import React, { memo } from 'react'

const Button = ({text, textColor, bgColor, IcBefor, IcAfter, onClick, fullWidth, px }) => {
  return (
    <button
    type='button'
    className={`py-2 ${px ? px : 'px-4'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    onClick={onClick}
    >
        <span className='text-xl'>{IcBefor && <IcBefor/>}</span>
        <span>{text}</span>
        <span className='text-xl'>{IcAfter && <IcAfter/>}</span>
    </button>
  )
}

export default memo(Button)