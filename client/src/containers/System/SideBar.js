import React from 'react'
import avatar from '../../assets/avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import {NavLink} from 'react-router-dom'
import * as actions from '../../store/actions'
import icons from '../../ultils/icons'
import { blobToBase64 } from '../../ultils/common/tobase64'

const activeStyle = ' flex items-center gap-2 py-2 px-4 font-semibold bg-gray-200'
const notActiveStyle = 'hover:bg-gray-200 flex items-center gap-2 py-2 px-4 cursor-pointer'
const {CiLogout} = icons

const SideBar = () => {

  const dispatch = useDispatch()
  const { currentData } = useSelector(state => state.user)

  return (
    <div className='w-[250px] flex-none flex flex-col gap-5'>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-4'>
          <img src={blobToBase64(currentData?.avatar) || avatar} alt='avatar' className='w-12 h-12 object-cover rounded-full border-2 border-white' />
          <div className='flex flex-col justify-center'>
            <span className='font-medium'>{currentData?.name}</span>
            <span>{currentData?.phone}</span>
          </div>
        </div>
        <div className='flex flex-col'>
          <span>Mã thành viên: <span className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span></span>
          <span>TK Chính: <span className='font-medium'>0 đ</span></span>
        </div>
      </div>
      <div>
        {menuSidebar.map(item => {
          return (
            <NavLink
              className={({isActive}) => isActive ? activeStyle : notActiveStyle}
              key={item?.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          )
        })}
        <span onClick={() => dispatch(actions.logout())} className={notActiveStyle}><CiLogout/> Thoát</span>
      </div>
    </div>
  )
}

export default SideBar