import React, { useCallback, useEffect, useState } from 'react'
import { SearchItems, Modal } from '../../components/Index'
import icons from '../../ultils/icons'
import { useSelector } from 'react-redux'
import { useNavigate, createSearchParams, useLocation, } from 'react-router-dom'
import { path } from '../../ultils/constant'

const { BsChevronRight, SlLocationPin, GiPriceTag, SlCrop, FiDelete, PiHouseLine, FiSearch } = icons

const Search = () => {

  const navigate = useNavigate('')
  const location = useLocation()
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, areas, prices, categories } = useSelector(state => state.app)
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({})
      setQueries({})
    }
  }, [location])

  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setIsShowModal(true)
    setDefaultText(defaultText)
  }

  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation()
    setQueries(prev => ({ ...prev, ...query }))
    setIsShowModal(false)
    arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
  }, [])

  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObj = {}
    queryText.forEach(item => { queryTextObj[item[0]] = item[1] });
    let titleSearch = `${queryTextObj.category
      ? queryTextObj.category
      : 'Cho thuê tất cả'} ${queryTextObj.province
        ? `${queryTextObj.province}`
        : ''} ${queryTextObj.price
          ? `giá ${queryTextObj.price}`
          : ''} ${queryTextObj.area
            ? `diện tích ${queryTextObj.area}`
            : ''}`
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryCodesObj).toString(), 
    }, { state: { titleSearch } })
  }

  return (
    <>
      <div className=' p-[10px] bg-secondary6 rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2 '>
        <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
          <SearchItems IconBefore={<PiHouseLine />}
            fontWeight text={queries.category}
            defaultText={'Tìm tất cả'}
            IconAfter={<FiDelete color='black' />}
          />
        </span>
        <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
          <SearchItems IconBefore={<SlLocationPin />}
            text={queries.province}
            defaultText={'Toàn quốc'}
            IconAfter={<BsChevronRight />}
          />
        </span>
        <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
          <SearchItems IconBefore={<GiPriceTag />}
            text={queries.price}
            defaultText={'Chọn giá'}
            IconAfter={<BsChevronRight />}
          />
        </span>
        <span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1'>
          <SearchItems IconBefore={<SlCrop />}
            text={queries.area}
            defaultText={'Chọn diện tích'}
            IconAfter={<BsChevronRight />}
          />
        </span>
        <button
          onClick={handleSearch}
          type='button'
          className='outline-none py-1.5 px-4 bg-secondary1 rounded-lg text-white font-medium 
        lg:flex-row flex flex-1 items-center justify-center gap-2 whitespace-nowrap' >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && <Modal
        handleSubmit={handleSubmit}
        queries={queries}
        arrMinMax={arrMinMax}
        content={content}
        name={name}
        setIsShowModal={setIsShowModal}
        defaultText={defaultText}
      />}
    </>
  )
}

export default Search