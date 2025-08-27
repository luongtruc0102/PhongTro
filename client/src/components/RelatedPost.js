import React, { useEffect } from 'react'
import { SItem } from './Index'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../store/actions'

const RelatedPost = () => {

    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(action.getNewPosts())
    }, [dispatch])

    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map(item => {
                    return (
                        <SItem
                        key={item.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            craetedAt={item.craetedAt}
                            image={JSON.parse(item.images.image)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedPost