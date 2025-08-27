
const validate = (payload, setInvalidFields) => {
  let invalids = 0
  let fields = Object.entries(payload)

  fields.forEach(item => {
    if (item[1] === '') {
      setInvalidFields(prev => [...prev, {
        name: item[0],
        message: 'Bạn không được bỏ trống thông tin.'
      }])
      invalids++
    }
  })
  fields.forEach(item => {
    switch (item[0]) {
      case 'password':
        if (item[1].length < 8) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Mật khẩu có tối thiểu 8 kí tự.'
          }])
          invalids++
        }
        break;

      case 'confirmPassword':
        if (item[1] !== payload.password) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Mật khẩu và xác nhận mật khẩu không khớp.'
          }])
          invalids++
        }
        break;

      case 'phone':
        if (!+item[1]) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Số điện thoại không hợp lệ.'
          }])
          invalids++
        }
        break;
        
      case 'priceNumber':
      case 'areaNumber':
        if (+item[1] === 0) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Bạn chưa thêm giá trị cho trường này.'
          }])
          invalids++
        }
        if (!+item[1]) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Trường này phải là số.'
          }])
          invalids++
        }
        break;
      default:
        break;
    }
  })
  return invalids
}

export default validate