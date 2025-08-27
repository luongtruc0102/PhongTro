import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import { blobToBase64 } from '../ultils/common/tobase64'

const User = () => {
  const { currentData } = useSelector(state => state.user)

  return (
    <div className='flex items-center gap-2'>
      <img
        src={blobToBase64(currentData?.avatar) || avatar}
        alt='avatar'
        className='w-10 h-10 object-cover rounded-full border-2 border-white shadow-md'
      />
      <div className='flex flex-col'>
        <span>Xin chào, <span className='font-semibold'>{currentData?.name}</span></span>
        <span>Mã tài khoản:
          <span className='font-medium'>
            {`${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}`}
          </span>
        </span>
      </div>
    </div>
  )
}

export default User