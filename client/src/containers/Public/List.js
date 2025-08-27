import React, { useEffect, useState } from 'react'
import { Button, Items } from '../../components/Index';
import { getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)

    const [sortType, setSortType] = useState('default') // 'default' | 'new'

    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })

        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sortType === 'new') searchParamsObject.order = ['createdAt', 'DESC'] 

        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, dispatch, categoryCode, sortType])

    const today = new Date();
    const [day, month, year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    const dayOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][today.getDay()];

    return (
        <div className='w-full bg-white shadow-md rounded-md'>
            <div className='flex items-center justify-between mb-3 pt-2 px-2'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: {dayOfWeek}, {day}-{month}-{year}</span>
            </div>
            <div className='flex items-center gap-2 my-2 px-2'>
                <span>Sắp xếp: </span>
                <Button
                    bgColor='bg-gray-200'
                    text={'Mặc định'}
                    onClick={() => setSortType('default')}
                />
                <Button
                    bgColor='bg-gray-200'
                    text={'Mới nhất'}
                    onClick={() => setSortType('new')}
                />
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Items
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default List
