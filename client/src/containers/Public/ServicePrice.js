import React, { useState } from "react"
import qrbank from '../../assets/qrbank.png'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { path } from "../../ultils/constant"
import { Button } from "../../components/Index"

const packages = [
  {
    id: 1,
    name: "Đăng tin thường",
    price: "Miễn phí",
    features: ["Tin hiển thị theo thứ tự đăng", "Không có ưu tiên nổi bật"],
    color: "border-gray-400",
  },
  {
    id: 2,
    name: "Đăng tin Pro",
    price: "50.000đ / 7 ngày",
    features: [
      "Hiển thị ở vị trí ưu tiên",
      "Được gắn nhãn VIP",
      "Tăng lượng tiếp cận khách hàng",
    ],
    color: "border-yellow-500",
  },
  {
    id: 3,
    name: "Đăng tin Primeum",
    price: "100.000đ / 7 ngày",
    features: [
      "Luôn đứng đầu danh sách",
      "Hiển thị nổi bật với màu sắc",
      "Tiếp cận khách hàng nhanh nhất",
    ],
    color: "border-red-500",
  },
]

const ServicePrice = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)

  const handleRegisterClick = (pkg) => {
    if (!isLoggedIn) {
      navigate(path.LOGIN, { state: { flag: false } })
    } else {
      setSelectedPackage(pkg)
      setIsOpen(true)
    }
  }

  return (
    <div className="w-full mx-auto bg-white rounded-md shadow-md py-10 px-5 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Bảng giá dịch vụ</h2>
      <p className="text-center text-gray-700 mb-8">
        Chọn gói dịch vụ phù hợp để tin đăng của bạn tiếp cận khách hàng nhanh
        chóng và hiệu quả hơn.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`border-2 ${pkg.color} rounded-xl p-6 shadow-sm flex flex-col items-center`}
          >
            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
            <p className="text-2xl font-bold text-secondary6 mb-4">
              {pkg.price}
            </p>
            <ul className="text-gray-700 mb-6 flex-1">
              {pkg.features.map((f, i) => (
                <li key={i} className="mb-2">• {f}</li>
              ))}
            </ul>
            {pkg.price !== "Miễn phí" && (
              <Button
                text="Đăng ký ngay"
                bgColor="bg-secondary2"
                textColor="text-white"
                px="px-6"
                onClick={() => handleRegisterClick(pkg)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">
              Thanh toán gói: {selectedPackage.name}
            </h2>
            <p className="mb-4">Số tiền: {selectedPackage.price}</p>
            <div className="flex flex-col items-center gap-3">
              <img
                src={qrbank} // chỗ này bạn thay bằng ảnh QR ngân hàng
                alt="QR Banking"
                className="w-64 h-64 object-contain"
              />
              <p className="text-gray-600 text-sm">
                Quét mã QR để thanh toán qua ngân hàng
              </p>
              <p className="text-gray-800 font-semibold">
                Chủ tài khoản: LAI THANH LUONG TRUC
              </p>
              <p className="text-gray-800 font-semibold">
                STK: 1903 9592 9690 11 (Techcombank)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicePrice
