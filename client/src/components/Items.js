import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/common/formatVNtoString'
import avatar from '../assets/avatar.png'
import imgnull from '../assets/img-null.png'
import { path } from '../ultils/constant'
import ZaloQRCodeModal from './ZaloQRCodeModal'

const indexs = [0, 1, 2, 3]
const { GoStarFill, IoMdHeartEmpty, IoMdHeart } = icons

const Items = ({ images, user, title, star, address, description, attributes, id }) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false)
    const [showZaloQR, setShowZaloQR] = useState(false) 

  const handleStar = (star) => {
    let stars = []
    for (let i = 1; i < +star; i++) {
      stars.push(<GoStarFill className='star-item text-secondary6' size={18} />)
    }
    return stars
  }

  return (
    <div className='w-full flex p-4 border-t border-secondary2'>
      <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
        className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
        {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
          return (
            <img key={index} src={i || imgnull} alt='Phòng Trọ' className='w-[47%] h-[135px] object-cover' />
          )
        })}
        <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1'>{`${images?.length} ảnh`}</span>

        <span
          className='text-white absolute right-5 bottom-1'
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? <IoMdHeart size={26} color='#F5676F' /> : <IoMdHeartEmpty size={26} />}
        </span>
      </Link>

      <div className='w-3/5'>
        <div className='flex justify-between gap-4 w-full mt-2'>
          <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
            className='text-secondary2 font-medium hover:underline text-lg capitalize cursor-pointer'
          >
            {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
              return (
                <span key={number}>{star}</span>
              )
            })}
            {title}
          </Link>
        </div>
        <div className='my-2 flex items-center justify-between h-[35px] gap-2'>
          <span className='font-bold flex-3 text-secondary6 text-lg whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
          <span className='flex-1'>{attributes?.acreage}</span>
          <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>
            {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
          </span >
        </div >
        <p className='text-gray-500 w-full h-[75px] text-ellipsis overflow-hidden'>
          {description}
        </p>
        <div className='flex items-center my-5 justify-between'>
          <div className=' flex items-center'>
            <img src={avatar} alt="avatar" width={30} height={30} className='object-cover rounded-full' />
            <p>{user?.name}</p>
          </div>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              className='bg-secondary4 text-white px-1 rounded-md'
            >
              {`Gọi ${user?.phone}`}
            </button>

            <button
              type='button'
              className='text-secondary4 px-1 rounded-md border border-secondary4 hover:text-white hover:bg-secondary4'
              onClick={() => setShowZaloQR(true)} 
            >
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>

      {/* Modal QR Zalo */}
      {showZaloQR && (
        <ZaloQRCodeModal
          phone={user?.phone}
          onClose={() => setShowZaloQR(false)}
        />
      )}
    </div >
  )
}

export default memo(Items)