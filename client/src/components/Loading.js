import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <RotatingLines
        visible={true}
        height="80"
        width="80"
        color="gray"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export default Loading