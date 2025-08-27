import React, { memo } from 'react'
import { text } from '../ultils/dataIntro'
import icons from '../ultils/icons'
import {Button } from '../components/Index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/common/formatVNtoString'
import { path } from '../ultils/constant'

const {GoStarFill} = icons
const star = [1, 2, 3, 4, 5]

const Intro = () => {
    const {categories} = useSelector(state => state.app)
    const {isLoggedIn} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handlePostClick = () => {
        if (!isLoggedIn) {
        navigate(path.LOGIN, { state: { flag: false } }) // chưa login → chuyển login
        } else {
        navigate(`/he-thong/${path.CREATE_POST}`) // đã login → chuyển đăng tin
        }
    }

  return (
    <div className='w-3/4 bg-white rounded-md shadow-md py-5 px-[40px] flex flex-col items-center justify-center mt-3'>
        <h3 className='font-bold text-xl'>{text.title}</h3>
        <p className='text-gray-800 my-4 text-center'>
        {text.description}
        <span className='text-link'>
            {categories?.length > 0 && categories.map(item => {
                return(
                    <Link
                        to={`/${formatVietnameseToString(item.value)}`}
                        key={item.code}
                        className='text-secondary1 font-medium hover:text-secondary6'
                    >
                        {`${item.value.toLowerCase()}, `}
                    </Link>
                )
            })}
        </span>
        {text.description2}
        </p>
        <div className='flex items-center justify-around w-full'>
            {text.stastitic.map((item, index) => {
                return(
                    <div className='flex flex-col justify-center items-center' key={index}>
                        <h4 className='font-bold text-xl'>{item.value}</h4>
                        <p className='text-gray-700'>{item.name}</p>
                    </div>
                )
            })}
        </div>
        <h3 className='font-bold text-lg py-2 '>{text.price}</h3>
        <div className='flex items-center justify-center gap-1 py-3'>
            {star.map(item => {
                return(
                    <span key={item}>
                        <GoStarFill size={24} className='text-secondary6'/>
                    </span>
                )
            })}
        </div>
        <p className='text-gray-600 italic text-center'>{text.comment}</p>
        <p className='text-gray-700 py-3'>{text.author}</p>
        <h3 className='font-bold text-lg py-2 '>{text.question}</h3>
        <p className='pb-5'>{text.answer}</p>
        <Button
            text='Đăng tin ngay'
            bgColor='bg-secondary2'
            textColor='text-white'
            px='px-6'
            onClick={handlePostClick}
        />
        <div className='h-7'></div>
    </div>
  )
}

export default memo(Intro)