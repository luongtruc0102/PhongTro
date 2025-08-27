import React from 'react'

const HistoryBanking = () => {
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr className='flex w-full bg-gray-100'>
            <th className='border flex-1 p-2'>Trạng thái</th>
            <th className='border flex-1 p-2'>Ngày</th>
            <th className='border flex-1 p-2'>Số tiền nạp</th>
            <th className='border flex-1 p-2'>Khuyến mãi</th>
            <th className='border flex-1 p-2'>Thực nhận</th>
            <th className='border flex-1 p-2'>Mã giao dịch</th>
            <th className='border flex-1 p-2'>Phương thức</th>
            <th className='border flex-1 p-2'>Ghi chú</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default HistoryBanking