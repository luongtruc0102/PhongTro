import React from 'react'

const InputFormV2 = ({ label, unit, small, value, setValue, name, invalidFields, setInvalidFields, direction }) => {
    return (
        <div className={`flex ${direction ? direction : 'flex-col'}`}>
            <label htmlFor='title' className='font-medium w-48 flex-none'>{label}</label>
            <div className='flex flex-auto flex-col items-center'>
                <div className='flex w-full items-center'>
                    <input
                        value={value}
                        type='text'
                        id='title'
                        className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} flex-auto outline-none border border-gray-300 p-2`}
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                        onFocus={() => setInvalidFields && setInvalidFields([])}
                    />
                    {unit && <span className='p-2 flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-300 outline-none border border-gray-300'>{unit}</span>}
                </div>
                {invalidFields?.some(item => item.name === name) && <small className='text-red-500 block w-full'>
                    {invalidFields?.find(item => item.name === name)?.message}
                </small>}
            </div>
            {small && <small className='opacity-70 whitespace-nowrap'>{small}</small>}

        </div>
    )
}

export default InputFormV2