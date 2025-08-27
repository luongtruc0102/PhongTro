import React, { useState, useEffect } from 'react'
import { Search, List, Pagination } from './Index'
import { ItemSideBar, Province, RelatedPost } from '../../components/Index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/common/formatVNtoString'

const Rental = () => {
  const { prices, areas, categories } = useSelector(state => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({})
  const [categoryCode, setcategoryCode] = useState('none')
  const location = useLocation()

  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(category)
    if (category) {
      setcategoryCode(category.code)
    }
  }, [location])

  return (
    <div className='w-full flex flex-col gap-3'>
      <Search />
      <div>
        <h1 className='text-[25px] font-bold'>{categoryCurrent?.header}</h1>
        <p className='text-base text-gray-700'>{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className='w-full flex gap-3'>
        <div className='w-[70%]'>
          <List categoryCode={categoryCode} />
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

export default Rental