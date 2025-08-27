import icons from "./icons"

const { FcAddDatabase, FcKindle, FcManager, FcComments } = icons

const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <FcAddDatabase/>
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <FcKindle />
    },
    {
        id: 3,
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FcManager  />
    },
    {
        id: 4,
        text: 'Liên hệ',
        path: '/he-thong/lien-he',
        icon: <FcComments  />
    }
]

export default menuManage