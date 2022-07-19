import axios from 'axios'
import jwt from 'jwt-decode'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getUserInfo = () => {
    return token ? jwt(token) : false
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}
const comment = (comment) => {
    const { id, text } = comment
    const response = axios.post(`${baseUrl}/${id}`, { text })
    return response.data
}

const create = async(newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async(id, newObject) => {
    const user = getUserInfo()
    const request = axios.put(`${baseUrl}/${id}`, {...newObject, user: user.id })
    return request.then((response) => response.data)
}

const deleteBlog = async(id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.then((response) => response.data)
}

const blogService = { setToken, getUserInfo, getAll, create, update, deleteBlog, comment }

export default blogService