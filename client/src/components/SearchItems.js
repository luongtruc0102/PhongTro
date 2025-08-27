import React, { memo } from 'react'

const SearchItems = ({ IconBefore, IconAfter, text, fontWeight, defaultText }) => {
  return (
    <div className='w-full bg-white py-2 px-4 rounded-lg text-gray-400 text-sm flex items-center justify-between'>
      <div className='flex items-center gap-1 w-full'>
        {IconBefore}
        <span className={`${fontWeight && 'font-medium text-black'} w-full ${text ? 'font-medium text-black' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}>{text || defaultText}</span>
      </div>
      {IconAfter}
    </div>
  )
}

export default memo(SearchItems)