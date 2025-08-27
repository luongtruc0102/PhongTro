import React, { useState, useEffect, memo } from 'react'
import icons from '../ultils/icons'
import { getNumbersPrice, getNumbersArea } from '../ultils/common/getNumbers'
import { getCodesPrice, getCodesArea } from '../ultils/common/getCodes'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {

  const getInitialPersentLeft = () => {
    if (name === 'price' && arrMinMax?.priceArr?.[0] !== undefined) return arrMinMax.priceArr[0];
    if (name === 'area' && arrMinMax?.areaArr?.[0] !== undefined) return arrMinMax.areaArr[0];
    return 0;
  };

  const getInitialPersentRight = () => {
    if (name === 'price' && arrMinMax?.priceArr?.[1] !== undefined) return arrMinMax.priceArr[1];
    if (name === 'area' && arrMinMax?.areaArr?.[1] !== undefined) return arrMinMax.areaArr[1];
    return 100;
  };

  const [persentLeft, setPersentLeft] = useState(getInitialPersentLeft)
  const [persentRight, setPersentRight] = useState(getInitialPersentRight)

  // const [persentLeft, setPersentLeft] = useState(name === 'price' && arrMinMax?.priceArr 
  //   ? arrMinMax?.priceArr[0]
  //   : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0)
  // const [persentRight, setPersentRight] = useState(name === 'price' && arrMinMax?.priceArr
  //   ? arrMinMax?.priceArr[1] 
  //   : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[1] : 100)
  const [activedEl, setActivedEl] = useState('')

  useEffect(() => {
    const activeTrackEl = document.getElementById('track-active')
    if (activeTrackEl) {
      if (persentRight <= persentLeft) {
        activeTrackEl.style.left = `${persentRight}%`
        activeTrackEl.style.right = `${100 - persentLeft}%`
      } else {
        activeTrackEl.style.left = `${persentLeft}%`
        activeTrackEl.style.right = `${100 - persentRight}%`
      }
    }
  }, [persentLeft, persentRight])

  const handleClickTrack = (e, value) => {
    e.stopPropagation()
    const stackkEl = document.getElementById('track')
    const stackRect = stackkEl.getBoundingClientRect()
    let percent = value ? value : Math.round((e.clientX - stackRect.left) * 100 / stackRect.width, 0)
    if ((Math.abs(percent - persentLeft)) <= (Math.abs(percent - persentRight))) {
      setPersentLeft(percent)
    } else {
      setPersentRight(percent)
    }
  }

  const convert100toTarget = percent => {
    return name === 'price'
      ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
      : name === 'area'
        ? (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
        : 0
  }
  const convertTo100 = percent => {
    let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
    return Math.floor((percent / target) * 100)
  }

  const handleActive = (code, value) => {
    setActivedEl(code)
    let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPersentLeft(0)
        setPersentRight(convertTo100(1))
      }
      if (arrMaxMin[0] === 20) {
        setPersentLeft(0)
        setPersentRight(convertTo100(20))
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPersentLeft(100)
        setPersentRight(100)
      }
    }
    if (arrMaxMin.length === 2) {
      setPersentLeft(convertTo100(arrMaxMin[0]))
      setPersentRight(convertTo100(arrMaxMin[1]))
    }
  }

  const handleBeforeSubmit = (e) => {
    let min = persentLeft <= persentRight ? persentLeft : persentRight
    let max = persentLeft <= persentRight ? persentRight : persentLeft
    let arrMinMax = [convert100toTarget(min), convert100toTarget(max)]
    // const gaps = name === 'price'
    //   ? getCodesPrice(arrMinMax, content)
    //   : name === 'area' ? getCodesArea(arrMinMax, content) : []
    handleSubmit(e, {
      [`${name}Number`]: arrMinMax,
      [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === 'price' ? 'triệu' : 'm2'}`
    }, {
      [`${name}Arr`]: [min, max]
    })
  }

  return (
    <div onClick={() => { setIsShowModal(false) }}
      className='fixed top-0 left-0 bottom-0 right-0 bg-overlay-70 z-20 flex justify-center items-center'
    >
      <div onClick={(e) => {
        e.stopPropagation()
        setIsShowModal(true)
      }}
        className='w-[45%] h-[500px] bg-white rounded-md relative overflow-y-auto'
      >
        <div className='h-[45px] flex items-center justify-between p-4 border-b border-gray-300 '>
          <span
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setIsShowModal(false)
            }}>
            <GrLinkPrevious size={24} />
          </span>
          <h1 className='uppercase font-semibold'>
            {name === 'category' ? 'chọn loại bất động sản'
              : name === 'province' ? 'chọn tỉnh thành'
                : name === 'price' ? 'chọn giá'
                  : 'chọn diện tích'}
          </h1>
          <span className='w-[24px]'></span>
        </div>
        {(name === 'category' || name === 'province') && <div className='p-4 flex flex-col'>
          <span className='py-2 flex gap-2 items-center border-b border-gray-100'>
                <input
                  type='radio'
                  name={name}
                  id='default'
                  value={defaultText || ''}
                  checked={!queries[`${name}Code`] ? true : false}
                  onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                />
                <label htmlFor='default'>{defaultText}</label>
              </span>
          {content?.map(item => {
            return (
              <span key={item.code} className='py-2 flex gap-2 items-center border-b border-gray-100'>
                <input
                  type='radio'
                  name={name}
                  id={item.code}
                  value={item.code}
                  checked={item.code === queries[`${name}Code`] ? true : false}
                  onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            )
          })}
        </div>}
        {(name === 'price' || name === 'area') && <div className='py-20 px-6'>
          <div className='flex flex-col items-center justify-center relative'>
            <div className='absolute z-30 -top-12 font-bold text-xl text-secondary6'>
              {(persentLeft === 100 && persentRight === 100)
                ? `Trên ${convert100toTarget(persentLeft)} ${name === 'price' ? 'triệu' : 'm2'} +`
                : `Từ ${persentLeft <= persentRight
                  ? convert100toTarget(persentLeft)
                  : convert100toTarget(persentRight)} - ${persentRight >= persentLeft
                    ? convert100toTarget(persentRight)
                    : convert100toTarget(persentLeft)} ${name === 'price'
                      ? 'triệu'
                      : 'm2'}`}
              { }
            </div>
            <div onClick={handleClickTrack} id='track' className='slider-stack h-[5px] cursor-pointer w-full absolute top-0 bottom-0 bg-gray-300 rounded-full'></div>
            <div onClick={handleClickTrack} id='track-active' className='slider-stack-active h-[5px] cursor-pointer absolute right-0 top-0 bottom-0 bg-secondary6 rounded-full'></div>
            <input
              max='100'
              min='0'
              step='1'
              type='range'
              value={persentLeft}
              className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
              onChange={(e) => {
                setPersentLeft(+e.target.value)
                activedEl && setActivedEl('')
              }}
            />
            <input
              max='100'
              min='0'
              step='1'
              type='range'
              value={persentRight}
              className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
              onChange={(e) => {
                setPersentRight(+e.target.value)
                activedEl && setActivedEl('')
              }}
            />
            <div className='absolute z-30 top-5 right-0 left-0 flex justify-between items-center px-2'>
              <span
                className='ml-1 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickTrack(e, -0.00000001)
                }}>
                0
              </span>
              <span
                className='-mr-5 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickTrack(e, 100)
                }}>
                {name === 'price' ? '15 triệu+' : name === 'area' ? 'Trên 90m2' : ''}
              </span>
            </div>
          </div>
          <div className='mt-20'>
            <h4 className='font-medium mb-4'>Chọn nhanh</h4>
            <div className='flex gap-2 items-center flex-wrap w-full'>
              {content?.map(item => {
                return (
                  <button
                    key={item.code}
                    onClick={() => handleActive(item.code, item.value)}
                    className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activedEl ? 'text-white bg-secondary1' : ' '}`}
                  >
                    {item.value}
                  </button>
                )
              })}
            </div>
          </div>
        </div>}
        {(name === 'price' || name === 'area') && <button
          type='button'
          className='w-full absolute bottom-0 bg-secondary6 py-2 font-medium rounded-bl-md rounded-br-md uppercase'
          onClick={handleBeforeSubmit}
        >
          Xác nhận
        </button>}
      </div>
    </div>
  )
}

export default memo(Modal)