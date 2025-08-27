import React, { memo } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const notActive = 'w-[50px] h-[50px] flex items-center justify-center bg-white hover:bg-gray-300 rounded-md '
const active = 'w-[50px] h-[50px] flex items-center justify-center bg-[#F5676F] hover:opacity-90 text-white rounded-md '

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [paramsSearch] = useSearchParams()
    let  entries = paramsSearch.entries()

    const append = (entries) => {
        let params = []
        paramsSearch.append('page', +text)
        for (let entry of entries){
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if(Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')){
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]] : [i[1]] }
            }
        }) 
        
        return searchParamsObject
    }

    const handleChangePage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
            navigate({
                pathname: location.pathname,
                search: createSearchParams(append(entries)).toString()
            });
        }
    }

    return (
        <div
            className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)