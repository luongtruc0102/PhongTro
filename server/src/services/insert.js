import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import chothuecanho from '../../data/chothuecanho.json'
import chothuematbang from '../../data/chothuematbang.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import nhachothue from '../../data/nhachothue.json'
import timnguoioghep from '../../data/timnguoioghep.json'
import generateCode from '../ultis/generateCode'
import { dataPrice, dataArea } from '../ultis/data'
import { getNumberFromString, getNumberFromStringV2 } from '../ultis/common'
require('dotenv').config()

const dataCTCH = chothuecanho.body
const dataCTMB = chothuematbang.body
const dataCTPT = chothuephongtro.body
const dataNCT = nhachothue.body
const dataTNOG = timnguoioghep.body

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const determineCategoryCode = (item, dataSource) => {
    switch (dataSource) {
        case 'chothuecanho':
            return 'CTCH'; // Căn hộ cho thuê
        case 'chothuematbang':
            return 'CTMB'; // Mặt bằng cho thuê
        case 'chothuephongtro':
            return 'CTPT'; // Phòng trọ cho thuê
        case 'nhachothue':
            return 'NCT'; // Nhà cho thuê
        case 'timnguoioghep':
            return 'TNOG'; // Tìm người ở ghép
        default:
            return 'OTHER'; // Dự phòng
    }
};
// Kết hợp tất cả dữ liệu vào một mảng
const allData = [
    ...dataCTCH.map(item => ({ ...item, dataSource: 'chothuecanho' })),
    ...dataCTMB.map(item => ({ ...item, dataSource: 'chothuematbang' })),
    ...dataCTPT.map(item => ({ ...item, dataSource: 'chothuephongtro' })),
    ...dataNCT.map(item => ({ ...item, dataSource: 'nhachothue' })),
    ...dataTNOG.map(item => ({ ...item, dataSource: 'timnguoioghep' }))
];


export const insertService = () => new Promise(async (resolve, reject) => {
    try {

        dataPrice.forEach(async(item, index ) => {
            await db.Price.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
        dataArea.forEach(async(item, index) => {
            await db.Area.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })

        for (const item of allData) {
            //dataTNOG.forEach(async(item) => {
            let postId = v4()
            //let labelCode = generateCode(item?.header?.class?.classType)
            // Lấy labelCode từ địa chỉ trong overview
            let labelCode = generateCode(item?.overview?.content.find(i => i.name === 'Chuyên mục:')?.content).trim();
            let provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim()
            let attributesId = v4()
            let userId = v4()
            let overviewId = v4()
            let imagesId = v4()
            let desc = JSON.stringify(item?.mainContent?.content)
            let currentPrice = getNumberFromString(item?.header?.attributes?.price)
            let currentArea = getNumberFromString(item?.header?.attributes?.acreage)

            //Xác định mã danh mục dựa trên DataSource
            let categoryCode = determineCategoryCode(item, item.dataSource);

            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                labelCode,
                address: item?.header?.address,
                attributesId,
                categoryCode,
                description: desc,
                userId,
                overviewId,
                imagesId,
                priceCode: dataPrice.find(price => price.max > currentPrice && price.min <= currentPrice)?.code,
                areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
                provinceCode,
                priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
                areaNumber: getNumberFromStringV2(item?.header?.attributes?.acreage)
            })
            await db.Attribute.create({
                id: attributesId,
                price: item?.header?.attributes?.price,
                acreage: item?.header?.attributes?.acreage,
                published: item?.header?.attributes?.published,
                hashtag: item?.header?.attributes?.hashtag,
            })
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images)
            })
            await db.Overview.create({
                id: overviewId,
                code: item?.overview?.content.find(i => i.name === 'Mã tin:')?.content ,
                area: item?.overview?.content.find(i => i.name === 'Khu vực:')?.content,
                type: item?.overview?.content.find(i => i.name === 'Loại tin rao:')?.content,
                target: item?.overview?.content.find(i => i.name === 'Đối tượng thuê:')?.content,
                bonus: item?.overview?.content.find(i => i.name === 'Gói tin:')?.content,
                created: item?.overview?.content.find(i => i.name === 'Ngày đăng:')?.content,
                expired: item?.overview?.content.find(i => i.name === 'Ngày hết hạn:')?.content,
            })
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === 'Liên hệ:')?.content,
                password: hashPassword('12345678'),
                phone: item?.contact?.content.find(i => i.name === 'Điện thoại:')?.content,
                zalo: item?.contact?.content.find(i => i.name === 'Zalo:')?.content,
                fbUrl: item?.contact?.content.find(i => i.name === 'Facebook:')?.content, // Thêm trường fbUrl nếu cần
                avatar: null
            }) 
            await db.Province.findOrCreate({
                where: {code: provinceCode},
                defaults: {
                    code: provinceCode,
                    value: item?.header?.address?.split(',')?.slice(-1)[0]
                }
            })       
            await db.Label.findOrCreate({
                where: { code: labelCode },
                defaults: {
                    code: labelCode,
                    //value: item?.header?.class?.classType,
                    value: item?.overview?.content.find(i => i.name === 'Chuyên mục:')?.content
                }
            })    
        }


        resolve('Done')
    } catch (error) {
        reject(error)
    }
})

export const createPricesAndAreas = () => new Promise((resolve, reject) => {
    try {
        dataPrice.forEach(async(item) => {
            await db.Price.create({
                id: v4(),
                code: item.code,
                value: item.value
            })
        })
        dataArea.forEach(async(item) => {
            await db.Area.create({
                id: v4(),
                code: item.code,
                value: item.value
            })
        })
        resolve('OK')
    } catch (error) {
        reject(err)
    }
})
