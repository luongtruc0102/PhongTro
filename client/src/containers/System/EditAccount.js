import React, { useState } from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components/Index'
import avatar from '../../assets/avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { apiUpdateUser } from '../../services'
import { fileToBase64, blobToBase64 } from '../../ultils/common/tobase64'
import { getCurrent } from '../../store/actions'
import Swal from 'sweetalert2'

const EditAccount = () => {

    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: blobToBase64(currentData?.avatar),
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })

    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        if(response?.data.err === 0){
            Swal.fire('Thành công', 'Chỉnh sửa thông tin thành công', 'success').then(() => {
                dispatch(getCurrent())
            })
        } else {
            Swal.fire('Không thành công', 'Lỗi ở đâu rồi đấy', 'error')
        }   
    }

    const handleUpLoadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64
        }))
    }


return (
    <div className='flex flex-col h-full items-center'>
        <h1 className='text-3xl w-full text-start font-semibold py-4 border-b border-gray-300'>Chỉnh sửa thông tin cá nhân</h1>
        <div className='w-3/5 flex items-center justify-center flex-auto'>
            <div className='py-6 flex flex-col gap-4 w-full'>
                <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} direction='flex-row' label='Mã thành viên' />
                <InputReadOnly value={currentData?.phone} editPhone direction='flex-row' label='Số điện thoại' />
                <InputFormV2
                    name='name'
                    setValue={setPayload}
                    value={payload.name}
                    direction='flex-row'
                    label='Tên hiển thị'
                />
                <InputFormV2
                    name='zalo'
                    setValue={setPayload}
                    value={payload.zalo}
                    direction='flex-row'
                    label='Zalo'
                />
                <InputFormV2
                    name='fbUrl'
                    setValue={setPayload}
                    value={payload.fbUrl}
                    direction='flex-row'
                    label='Facebook'
                />
                <div className='flex'>
                    <label className='w-48 flex-none font-medium' htmlFor='password'>Mật khẩu</label>
                    <span className='flex-auto text-secondary4 h-12 cursor-pointer'>Đổi mật khẩu</span>
                </div>
                <div className='flex mb-6'>
                    <label className='w-48 flex-none font-medium' htmlFor='avatar'>Ảnh đại diện</label>
                    <div>
                        <img src={payload.avatar || avatar} alt='avatar' className='w-28 h-28 rounded-full object-cover' />
                        <input onChange={handleUpLoadFile} type='file' id='avatar' className='appearance-none my-4' />
                    </div>
                </div>
                <Button
                    text='Cập nhật'
                    bgColor='bg-secondary1'
                    textColor='text-white'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    </div>
)
}

export default EditAccount