import React, { memo } from 'react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className='shadow-md rounded-bl-md rounded-br-md cursor-pointer  text-secondary4 hover:text-secondary2'>
            <img
                src={image}
                alt={name}
                className='w-[220px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
            />
            <div className='font-medium py-2 text-center'>{name}</div>
        </div>
    )
}

export default memo(ProvinceBtn)