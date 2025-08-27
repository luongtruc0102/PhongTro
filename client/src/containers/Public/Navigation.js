import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/common/formatVNtoString'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../store/actions'
import { path } from '../../ultils/constant'

const nav = [
    // {name: "Trang chủ", path: '/home'}, 
    // {name: "Cho thuê phòng trọ", path: '/cho-thue-phong-tro'},
    // {name: "Nhà cho thuê", path: '/nha-cho-thue'},
    // {name: "Cho thuê căn hộ", path: '/cho-thue-can-ho'},
    // {name: "Cho thuê mặt bằng", path: '/cho-thue-mat-bang'},
    // {name: "Tìm ngươi ở ghép", path: '/tim-nguoi-o-ghep'},
    { name: "Tin tức", path: '/tin-tuc' },
    { name: "Bảng giá dịch vụ", path: '/bang-gia-dich-vu' }
]

const notActive = 'hover:bg-secondary2 h-[40px] px-[24px] flex items-center'
const active = 'hover:bg-secondary2 h-[40px] px-[24px] flex items-center bg-secondary2'

const Navigation = ({isAdmin}) => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const location = useLocation()
    useEffect(() => {
        dispatch(action.getGetCategories())
    }, [dispatch])

    return (
        <div className={`w-full h-[40px] flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center bg-secondary1 text-white`}>
            <div className={`w-5/7 h-full flex items-center ${isAdmin ? 'justify-start' : 'justify-center'} text-sm font-medium capitalize`}>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className='h-full flex justify-center items-center'>
                            <NavLink
                                to={`/${formatVietnameseToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}

                {nav.length > 0 && nav.map((item, index) => {
                    if ((!location.pathname.startsWith(path.SYSTEM.replace('/*', '')))){
                        return (
                            <div key={index} className='h-full flex justify-center items-center'>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? active : notActive}
                                >
                                    {item.name}
                                </NavLink>
                            </div>
                        )
                    }                        
                    return null
                })}
            </div>
        </div>
    )
}

export default Navigation