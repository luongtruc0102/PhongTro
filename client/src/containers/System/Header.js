import React from 'react'
import {Navigation} from '../Public/Index'

const Header = () => {


  return (
    <div className='w-full flex'>
        <div className='flex justify-center items-center w-[250px] font-bold bg-secondary1 text-white'>
            PhongTro.com
        </div>
        <div className='flex-auto'>
            <Navigation isAdmin={true}/>
        </div>
    </div>
  )
}

export default Header