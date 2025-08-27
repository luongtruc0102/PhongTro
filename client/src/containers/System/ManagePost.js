import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import 'moment/locale/vi'
import { Button, UpdatePost } from '../../components/Index'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'

const ManagePost = () => {

    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const { postOfCurrent, dataEdit } = useSelector(state => state.post)
    const [updateData, setUpdateData] = useState(false)
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('0')

    useEffect(() => {
        !dataEdit && dispatch(actions.getPostsLimitAdmin())
    }, [dispatch, dataEdit, updateData])

    useEffect(() => { 
        setPosts(postOfCurrent)
    }, [postOfCurrent])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    const checkStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())

    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
        if (response?.data.err === 0) {
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Lỗi rồi !!!', 'Xoá tin đăng thất bại', 'error')
        }

    }

    useEffect(() => { 
        if(status === 1){
            const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(' ')[4]))
            setPosts(activePost)
        } else if(status === 2){
            const expiredPost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(' ')[4]))
            setPosts(expiredPost)
        } else {
            setPosts(postOfCurrent)
        }
     }, [status, postOfCurrent])

    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-semibold '>Quản lý tin đăng</h1>
                <select onChange={e => setStatus(+e.target.value)} value={status} className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value='0'>Lọc theo trạng thái</option>
                    <option value='1'>Đang hoạt động</option>
                    <option value='2'>Đã hết hạn</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className='flex w-full bg-gray-100'>
                        <th className='border flex-1 p-2'>Mã tin</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tiêu đề</th>
                        <th className='border flex-1 p-2'>Giá</th>
                        <th className='border flex-1 p-2'>Ngày bắt đầu</th>
                        <th className='border flex-1 p-2'>Ngày hết hạn</th>
                        <th className='border flex-1 p-2'>Trạng thái</th>
                        <th className='border flex-1 p-2'>Tuỳ chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts
                        ? <tr>
                            <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                <h3>Bạn muốn quản lý lý bài đăng ư? Vui lòng thêm tin mới</h3>
                            </td>
                        </tr>
                        : posts?.map(item => {
                            return (
                                <tr key={item.id} className='flex items-center h-16 '>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.code}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                        <img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar' className='w-10 h-10 object-cover rounded-md' />
                                    </td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>{`${item?.title?.slice(0, 35)}...`}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.attributes?.price}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.created}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.expired}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                                        {checkStatus(item?.overviews?.expired?.split(' ')[4]) ? 'Đang hoạt động' : 'Đã hết hạn'}
                                    </td>
                                    <td className='border p-2 flex-1 h-full flex items-center justify-center gap-2'>
                                        <Button
                                            text='Sửa'
                                            bgColor='bg-secondary1'
                                            textColor='text-white'
                                            onClick={() => {
                                                dispatch(actions.editData(item))
                                                setIsEdit(true)
                                            }}
                                        />
                                        <Button
                                            text='Xoá'
                                            bgColor='bg-secondary2'
                                            textColor='text-white'
                                            onClick={() => handleDeletePost(item.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    )
}

export default ManagePost