import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import imgnull from '../assets/img-null.png'

const SItem = ({ title, price, image, craetedAt }) => {

  const formatTime = () => {
    moment.locale('vi')
    return moment(craetedAt).fromNow()
  }
  return (
    <div className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
      <img
        src={image?.[0] || imgnull}
        alt='anh'
        className='w-[65px] h-[65px] object-cover flex-none rounded-sm cursor-pointer'
      />
      <div className='w-full flex-auto flex flex-col justify-between gap-1'>
        <h4 className='text-secondary4 text-[14px] cursor-pointer hover:underline'>{`${title?.slice(0, 50)}...`}</h4>
        <div className='flex items-center justify-between w-full '>
          <span className='text-sm font-medium text-secondary6'>{price}</span>
          <span className='text-sm text-gray-300'>{formatTime(craetedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default SItem