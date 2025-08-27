import React from 'react'
import { Search, List, Pagination } from './Index'
import { ItemSideBar, RelatedPost } from '../../components/Index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const SearchDetail = () => {
  const { prices, areas } = useSelector(state => state.app)
  const location = useLocation()

  return (
    <div className='w-full flex flex-col gap-3'>
      <Search />
      <div>
        <h1 className='text-[25px] font-bold'>{location.state?.titleSearch || 'Kết quả tìm kiếm'}</h1>
        <p className='text-base text-gray-700'>{`${location.state?.titleSearch || ''}phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-[70%]'>
          <List/>
          <Pagination />
        </div>

        <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
          <ItemSideBar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
          <ItemSideBar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default SearchDetail