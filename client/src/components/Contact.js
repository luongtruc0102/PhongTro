import React from 'react'
import { text } from '../ultils/dataContact'
import { Button } from '../components/Index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'

const Contact = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleContactClick = () => {
        if (!isLoggedIn) {
            navigate(path.LOGIN, { state: { flag: false } }) // chưa login → login
        } else {
            navigate(`/he-thong/${path.CONTACT}`) // đã login → trang liên hệ
        }
    }

    return (
        <div className='bg-white rounded-md shadow-md w-3/4 p-5 flex flex-col items-center justify-center mt-7 gap-6 border-[6px] border-secondary3 border-dashed'>
            <img
                src={text.image}
                alt='Liên hệ'
                className='w-full h-48 object-contain '
            />
            <p >{text.content}</p>
            <div className='flex items-center justify-around w-full'>
                {text.contact.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            <span className='text-secondary6 font-semibold uppercase'>{item.text}</span>
                            <span className='text-[20px] font-semibold'>{item.phone}</span>
                            <span className='text-[20px] font-semibold'>{item.zalo}</span>
                        </div>
                    )
                })}
            </div>
            <Button
                text='Gửi liên hệ'
                bgColor='bg-secondary1'
                textColor='text-white'
                px='px-6'
                onClick={handleContactClick}
            />
            <div></div>
        </div>
        
    )
}

export default Contact