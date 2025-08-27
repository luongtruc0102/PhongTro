import React from "react"
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'
import { path } from '../../ultils/constant'
import icons from "../../ultils/icons"

const Footer = () => { 
  const {FaFacebook, FaYoutube, FaPhoneAlt, FaEnvelope} = icons
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-10">
      <div className="w-3/4 mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-[180px] h-auto object-contain"
          />
          <p className="text-gray-700 text-sm text-justify">
            Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép
            nhanh chóng, hiệu quả với hàng ngàn tin đăng mới mỗi ngày.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={22} className="text-blue-600 hover:opacity-80" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube size={22} className="text-red-500 hover:opacity-80" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Liên kết nhanh</h4>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>
              <Link to={path.HOME} className="hover:text-secondary6">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to={`/he-thong/${path.CREATE_POST}`} className="hover:text-secondary6">
                Đăng tin mới
              </Link>
            </li>
            <li>
              <Link to={path.BANG_GIA_DICH_VU} className="hover:text-secondary6">
                Bảng giá dịch vụ
              </Link>
            </li>
            <li>
              <Link to={`/he-thong/${path.CONTACT}`} className="hover:text-secondary6">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Thông tin liên hệ</h4>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>0346262543</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>luogtruc@gmail.com</span>
            </li>
            <li>
              <span className="font-medium">Địa chỉ:</span> 806 QL22, ấp Mỹ Hoà 3, Hóc Môn, Hồ Chí Minh, Việt Nam
            </li>
          </ul>
        </div>
      </div>

      {/* Dòng cuối */}
      <div className="bg-gray-200 py-3 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} PhongTro - All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
