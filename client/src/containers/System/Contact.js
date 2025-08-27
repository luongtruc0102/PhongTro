import React, { useState } from 'react'
import { InputForm, Button } from '../../components/Index'
import Swal from 'sweetalert2'

const Contact = () => {

    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    })

    const handleSubmit = () => {
        Swal.fire(`Cảm ơn ${payload.name ? payload.name : ''}`, 'Phản hồi của bạn đã được chúng tôi ghi nhận', 'success').then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }

    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold py-4 border-b border-gray-300'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-5 mx-20 my-10'>
                <div className='flex-1 flex flex-col gap-4 p-4 h-fit rounded-3xl text-white bg-gradient-to-br from-secondary4 to-secondary3'>
                    <h4 className='font-medium text-lg'>Thông tin liên hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro.com</span>
                    <span>Số điện thoại: 0346262543</span>
                    <span>Email: luogtruc@gmail.com</span>
                    <span>Zalo: 0346262543</span>
                    <span>Địa chỉ: 806 QL22, ấp Mỹ Hoà 3, Hóc Môn, Hồ Chí Minh, Việt Nam</span>
                </div>
                <div className='flex-1 p-4 border border-gray-300 rounded-lg shadow-md'>
                    <h4 className='font-medium text-lg mb-4'>Liên hệ trực tiếp</h4>
                    <div className='flex flex-col gap-4'>
                        <InputForm
                            label='HỌ VÀ TÊN CỦA BẠN'
                            value={payload?.name}
                            setValue={setPayload}
                            keyPayload='name'
                        />
                        <InputForm
                            label='SỐ ĐIỆN THOẠI'
                            value={payload?.phone}
                            setValue={setPayload}
                            keyPayload='phone'
                        />
                        <div>
                            <label htmlFor='desc'>NỘI DUNG</label>
                            <textarea
                                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                                id='desc'
                                cols='30'
                                rows='3'
                                value={payload?.content}
                                onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                                name='content'
                            ></textarea>
                        </div>
                        <Button
                            text='Gửi liên hệ'
                            bgColor='bg-secondary1'
                            textColor='text-white'
                            fullWidth
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact