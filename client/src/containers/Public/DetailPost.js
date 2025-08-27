import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { RelatedPost, SliderCustom } from '../../components/Index'
import icons from '../../ultils/icons'

const DetailPost = () => {

  const { FaLocationDot, RiMoneyDollarCircleLine, SlCrop, AiOutlineClockCircle, MdOutlineNumbers } = icons
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }))
  }, [postId])

  return (
    <div className='w-full flex gap-4'>
      <div className='w-[70%] bg-white rounded-bl-md rounded-br-md shadow-md'>
        <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
        <div className=' p-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold text-secondary2 capitalize'>{posts[0]?.title}</h2>
            <div className='flex gap-2'>
              <span>Chuyên mục:</span>
              <span className='text-secondary1 hover:text-secondary6 underline font-medium cursor-pointer'>{posts[0]?.overviews?.area}</span>
            </div>
            <div className='flex gap-2 items-center'>
              <FaLocationDot color='#196EC0' />
              <span>{posts[0]?.address}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='flex gap-1 items-center'>
                <RiMoneyDollarCircleLine size={20}/>
                <span className='font-semibold text-xl text-secondary6'>{posts[0]?.attributes?.price}</span>
              </span>
              <span className='flex gap-1 items-center'>
                <SlCrop />
                <span>{posts[0]?.attributes?.acreage}</span>
              </span>
              <span className='flex gap-1 items-center'>
                <AiOutlineClockCircle />
                <span>{posts[0]?.attributes?.published}</span>
              </span>
              <span className='flex gap-1 items-center'>
                <MdOutlineNumbers />
                <span>{posts[0]?.attributes?.hashtag}</span>
              </span>
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-lg my-4'>Thông tin mô tả</h3>
            <div className='flex flex-col gap-3'>
              {posts[0]?.description && Array.isArray(JSON.parse(posts[0]?.description)) && JSON.parse(posts[0]?.description)?.map((item, index) => {
                return (
                  <span key={index}>{item}</span>
                )
              })}
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-lg my-4'>Đặc điểm tin đăng</h3>
            <table className='w-full'>
              <tbody className='w-full'>
                <tr className='w-full'>
                  <td className='p-2'>Mã tin:</td>
                  <td className='p-2'>{posts[0]?.overviews?.code}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Khu vực:</td>
                  <td className='p-2'>{posts[0]?.overviews?.area}</td>
                </tr>
                <tr className='w-full'>
                  <td className='p-2'>Loại tin rao:</td>
                  <td className='p-2'>{posts[0]?.overviews?.type}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Đối tượng:</td>
                  <td className='p-2'>{posts[0]?.overviews?.target}</td>
                </tr>
                <tr className='w-full'>
                  <td className='p-2'>Gói tin:</td>
                  <td className='p-2'>{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Ngày đăng:</td>
                  <td className='p-2'>{posts[0]?.overviews?.created}</td>
                </tr>
                <tr className='w-full'>
                  <td className='p-2'>Ngày hết hạn:</td>
                  <td className='p-2'>{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mt-8 '>
            <h3 className='font-semibold text-lg my-4'>Thông tin liên hệ</h3>
            <table className='w-full '>
              <tbody>
                <tr className='w-full'>
                  <td className='p-2'>Liên hệ:</td>
                  <td className='p-2'>{posts[0]?.user?.name}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className='p-2'>Điện thoại:</td>
                  <td className='p-2'>{posts[0]?.user?.phone}</td>
                </tr>
                <tr className='w-full'>
                  <td className='p-2'>Zalo:</td>
                  <td className='p-2'>{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mt-8'>
          <h3 className='font-semibold text-lg my-4'>Bản đồ</h3>

          </div>
        </div>
      </div>
      <div className='w-[30%]'>
        <RelatedPost/>
      </div>
    </div>
  )
}

export default DetailPost