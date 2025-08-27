import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png'
import { Button, User } from '../../components/Index'
import icons from '../../ultils/icons';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/actions'
import menuManage from '../../ultils/menuManage';

const { AiOutlinePlusCircle } = icons
const { PiUserPlusLight } = icons
const { CiLogin } = icons
const { FcUndo } = icons
const { FiChevronDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [navigate])

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams, searchParams.get('page')])

    return (
        <div ref={headerRef} className='w-3/4'>
            <div className='w-full flex items-center justify-between'>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        <small className='text-[16px]'>Hello Pro !!!</small>
                        <Button
                            text={'Đăng nhập'}
                            textColor='text-white'
                            bgColor='bg-secondary1'
                            IcBefor={PiUserPlusLight}
                            onClick={() => goLogin(false)}
                        />
                        <Button
                            text={'Đăng ký'}
                            textColor='text-white'
                            bgColor='bg-secondary1'
                            IcBefor={CiLogin}
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className='flex items-center gap-3 relative'>
                        <User/>
                        <Button
                            text={'Quản lý tài khoản'}
                            textColor='text-white'
                            bgColor='bg-secondary1'
                            IcAfter={FiChevronDown}
                            onClick={() => setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu && <div className='absolute min-w-200 border top-full right-0 bg-white rounded-md shadow-md p-4 flex flex-col gap-2'>
                            {menuManage.map(item => {
                                return (
                                    <Link
                                        className='hover:text-secondary6 flex items-center gap-1 text-secondary1 border-b border-gray-300'
                                        key={item?.id}
                                        to={item?.path}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                )
                            })}
                            <span 
                            className='cursor-pointer hover:text-secondary6 text-secondary1 border-b border-gray-300 flex items-center gap-1' 
                            onClick={() => {
                                setIsShowMenu(false)
                                dispatch(action.logout())
                            }}
                            >
                                <FcUndo />
                                Đăng xuất
                            </span>
                        </div>}
                    </div>}
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => {
                            if (!isLoggedIn) {
                                goLogin(false)
                            } else {
                                navigate(`/he-thong/${path.CREATE_POST}`)
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;