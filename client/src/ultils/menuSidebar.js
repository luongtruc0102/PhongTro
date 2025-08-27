import icons from "./icons"

const { CgNotes, FaRegPenToSquare, MdPostAdd, MdAttachMoney, FaRegClipboard, BsCalendar4, AiOutlineClockCircle, TbMessageCircle, IoNewspaperOutline} = icons

const menuSidebar = [
    {
        id: 1,
        text: 'Đăng tin mới',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <MdPostAdd/>
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <CgNotes />
    },
    {
        id: 3,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaRegPenToSquare   />
    },
    {
        id: 4,
        text: 'Nạp tiền vào tài khoản',
        path: '/he-thong/nap-tien-vao-tai-khoan',
        icon: <MdAttachMoney   />
    },
    {
        id: 5,
        text: 'Lịch sử nạp tiền',
        path: '/he-thong/lich-su-nap-tien',
        icon: <AiOutlineClockCircle />
    },
    {
        id: 6,
        text: 'Lịch sử thanh toán',
        path: '/he-thong/lich-su-thanh-toan',
        icon: <BsCalendar4 />
    },
    {
        id: 7,
        text: 'Liên hệ',
        path: '/he-thong/lien-he',
        icon: <TbMessageCircle  />
    },
    {
        id: 8,
        text: 'Bảng giá dịch vụ',
        path: '/bang-gia-dich-vu',
        icon: <FaRegClipboard  />
    },
    {
        id: 9,
        text: 'Tin tức',
        path: '/tin-tuc',
        icon: <IoNewspaperOutline  />
    },
]

export default menuSidebar