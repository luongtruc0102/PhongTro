import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components/Index'
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard } from '../services'
import { useSelector } from 'react-redux'

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {

    const { dataEdit } = useSelector(state => state.post)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundWard = wards.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3]?.trim())
            setWard(foundWard ? foundWard.ward_id : '')
        }
    }, [wards, dataEdit])



    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict('')
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response?.data.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setWards([])
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response.status === 200) {
                setWards(response?.data.results)
            }
        }
        district && fetchPublicWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [province, district])

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${ward ? `${wards?.find
                (item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find
                    (item => item.district_id === district)?.district_name}, ` : ''}${province ? `${provinces?.find
                        (item => item.province_id === province)?.province_name}` : ''}`,

            province: province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''
        }))

    }, [province, district, ward, wards, districts, provinces, setPayload])

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} reset={reset} type='ward' value={ward} setValue={setWard} options={wards} label='Phường/Xã' />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${ward ? `${wards?.find
                        (item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find
                            (item => item.district_id === district)?.district_name}, ` : ''}${province ? `${provinces?.find
                                (item => item.province_id === province)?.province_name}` : ''}`}

                />
            </div>
        </div>
    )
}

export default memo(Address)