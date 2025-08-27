import React from 'react'

const HistoryPayment = () => {
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr className='flex w-full bg-gray-100'>
            <th className='border flex-1 p-2'>Thời gian</th>
            <th className='border flex-1 p-2'>Phí thanh toán</th>
            <th className='border flex-1 p-2'>Số dư đầu</th>
            <th className='border flex-1 p-2'>Số dư cuối</th>
            <th className='border flex-1 p-2'>Loại hoạt động</th>
            <th className='border flex-1 p-2'>Mã tin</th>
            <th className='border flex-1 p-2'>Loại tin</th>
          </tr>
        </thead>
      </table></div>
  )
}

export default HistoryPayment