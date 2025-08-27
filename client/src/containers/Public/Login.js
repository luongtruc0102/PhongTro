import React, { useState, useEffect } from 'react'
import { InputForm, Button } from '../../components/Index'
import { useLocation, useNavigate } from 'react-router-dom'
import * as action from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/common/validateFields'

const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, msg, update } = useSelector(state => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '' // Added confirmPassword
  })

  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn])

  useEffect(() => {
    msg && Swal.fire('Lỗi !', msg, 'error')
  }, [msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password: payload.password
    }
    let invalids = validate(finalPayload, setInvalidFields)
    if (invalids === 0)
      isRegister ? dispatch(action.register(payload)) : dispatch(action.login(payload));
  }


  return (
      <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
        <h3 className='font-semibold text-2xl mb-3'>
          {isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}
        </h3>
        <div className='w-full flex flex-col gap-5'>
          {isRegister && <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'Họ tên'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
          />}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'Số điện thoại'}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={'phone'}
            type='number'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'Mật khẩu'}
            value={payload.password}
            setValue={setPayload}
            keyPayload={'password'}
            type='password'
          />
          {isRegister && <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'Xác nhận mật khẩu'} // New Confirm Password input
            value={payload.confirmPassword}
            setValue={setPayload}
            keyPayload={'confirmPassword'}
            type='password'
          />}
          <Button
            text={isRegister ? 'Đăng kí' : 'Đăng Nhập'}
            bgColor='bg-secondary1'
            textColor='text-white'
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className='mt-5 flex items-center justify-between'>
          {isRegister
            ? <small className='text-sm'>Bạn đã có tài khoản? <span
              onClick={() => {
                setIsRegister(false)
                setPayload({
                  name: '',
                  phone: '',
                  password: ''
                })
              }}
              className='text-secondary1 hover:underline cursor-pointer'
            >
              Đăng nhập ngay
            </span></small>
            : <>
              <small className='text-secondary1 hover:text-secondary6 text-sm cursor-pointer'>Bạn đã quên mật khẩu?</small>
              <small onClick={() => {
                setIsRegister(true)
                setPayload({
                  name: '',
                  phone: '',
                  password: ''
                })
              }}
                className='text-secondary1 hover:text-secondary6 text-sm cursor-pointer'
              >
                Tạo tài khoảng mới
              </small>
            </>}
        </div>
      </div>
  )
}

export default Login