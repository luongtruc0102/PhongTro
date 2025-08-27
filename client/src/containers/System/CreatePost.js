import React, { useEffect, useState } from 'react'
import { Address, Overview, Loading, Button } from '../../components/Index'
import { apiUpdatePost, apiUploadImages } from '../../services';
import icons from '../../ultils/icons';
import { getCodesPrice, getCodesArea } from '../../ultils/common/getCodes';
import { useSelector, useDispatch } from 'react-redux';
import { apiCreatePost } from '../../services';
import Swal from 'sweetalert2'
import validate from '../../ultils/common/validateFields';
import { resetDataEdit } from '../../store/actions';

const CreatePost = ({ isEdit }) => {

  const { AiOutlineClose, FcOldTimeCamera } = icons
  const dispatch = useDispatch()
  const { dataEdit } = useSelector(state => state.post)
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      priceNumber: dataEdit?.priceNumber * 1000000 || '',
      areaNumber: dataEdit?.areaNumber || '',
      images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
      address: dataEdit?.address || '',
      priceCode: dataEdit?.priceCode || '',
      areaCode: dataEdit?.areaCode || '',
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
      target: dataEdit?.overviews?.target || '',
      province: dataEdit?.province || '',
    }

    return initData
  })

  const [imagesPriview, setImagesPriview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { prices, areas, categories } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const [invalidFields, setInvalidFields] = useState([])

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image)
      images && setImagesPriview(images)
    }
  }, [dataEdit])

  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    const files = e.target.files
    const formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)

      const response = await apiUploadImages(formData)
      if (response.status === 200) images = [...images, response.data?.secure_url]
    }
    setIsLoading(false)
    setImagesPriview(prev => [...prev, ...images])
    setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
  }

  const handleDeleteImage = (image) => {
    setImagesPriview(prev => prev?.filter(item => item !== image))
    setPayload(prev => ({
      ...prev,
      images: prev.images?.filter(item => item !== image)
    }))
  }

  const handleSubmit = async () => {
    let priceCodeArr = getCodesPrice(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
    let priceCode = priceCodeArr[0]?.code
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90)
    let areaCode = areaCodeArr[0]?.code

    let finalPayload = {
      ...payload,
      priceCode,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      areaNumber: Number(payload.areaNumber),
      areaCode,
      userId: currentData.id,
      target: payload.target || 'Tất cả',
      label: `${categories?.find(item => item.code === payload?.categoryCode)?.value} ${payload?.address?.split(',')[0]} `,
    }

    const result = validate(finalPayload, setInvalidFields)
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id
        finalPayload.attributesId = dataEdit?.attributesId
        finalPayload.imagesId = dataEdit?.imagesId
        finalPayload.overviewId = dataEdit?.overviewId

        const response = await apiUpdatePost(finalPayload)
        if (response?.data.err === 0) {
          Swal.fire('Update thành công', 'Đã update bài đăng', 'success').then(() => {
            resetPayload()
            dispatch(resetDataEdit())
          })
        }
        else {
          Swal.fire('Không thành công', 'Có lỗi gì rồi đấy', 'error')
        }
      } else {

        const response = await apiCreatePost(finalPayload)
        if (response?.data.err === 0) {
          Swal.fire('Thành công', 'Đã thêm bài đăng mới', 'success').then(() => {
           resetPayload()
          })
        }
        else {
          Swal.fire('Không thành công', 'Có lỗi gì rồi đấy', 'error')
        }
      }
    }
  }

  const resetPayload = () => { 
    setPayload({
      categoryCode: '',
      title: '',
      priceNumber: '',
      areaNumber: '',
      images: '',
      address: '',
      priceCode: '',
      areaCode: '',
      description: '',
      target: '',
      province: '',
    })
   }

  return (
    <div className='px-6'>
      <h1 className='text-3xl font-semibold py-4 border-b border-gray-300'>{isEdit ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}</h1>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} />
          <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} />
          <div className='w-full mb-6'>
            <h2 className='font-semibold text-xl py-4'> Hình ảnh</h2>
            <p>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
            <div>
              <label
                className='w-full my-4 h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-secondary3 rounded-md'
                htmlFor='file'
              >
                {isLoading
                  ? <Loading />
                  : <div className='flex flex-col items-center justify-center'>
                    <FcOldTimeCamera size={100} />
                    Thêm ảnh
                  </div>}
              </label>
              <input onChange={handleFiles} hidden type='file' id='file' multiple />
              <small className='text-red-500 block w-full'>
                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
              </small>
              <div className='w-full'>
                <h3 className='font-medium py4'>Ảnh đã thêm</h3>
                <div className='flex gap-3 items-center'>
                  {imagesPriview?.map(item => {
                    return (
                      <div key={item} className='relative w-1/4 h-1/4'>
                        <img src={item} alt='priview' className='w-full object-cover rounded-md' />
                        <span
                          title='Xoá'
                          onClick={() => handleDeleteImage(item)}
                          className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 opacity-50 rounded-md'>
                          <AiOutlineClose size={20} />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? 'Cập nhật' : 'Tạo mới'}
            bgColor='bg-secondary1'
            textColor='text-white'
          />
        </div>
        <div className='w-[30%] flex-none'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501715.500659255!2d106.35552640622468!3d10.761253727966677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefdb25d923%3A0x4bcf54ddca2b7214!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1756289054580!5m2!1svi!2s" 
            width="600" 
            height="450" 
            style={{border: 0}}
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
      <div className='h-[100px]'></div>
    </div>
  )
}

export default CreatePost