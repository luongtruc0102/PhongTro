import axiosConfig from '../axiosConfig'

export const apiGetCategories = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
