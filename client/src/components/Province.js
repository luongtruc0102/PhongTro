import React from 'react'
import { ProvinceBtn } from './Index'
import { location } from '../ultils/constant' 

const Province = () => {
  return (
    <div className=' w-full'>
      <p className='font-bold text-lg text-center'>Khu vực nổi bậc</p>
      <div className='flex items-center justify-center gap-5 py-5'>
        {location.map(item => {
          return (
            <ProvinceBtn
              key={item.id}
              image={item.image}
              name={item.name}
            />
          )
        })}
        </div>
      </div>
  )
}

export default Province