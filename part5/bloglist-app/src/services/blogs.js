import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
    if (newToken) {
        token = `Bearer ${newToken}`
    } else {
        token = null
    }
}

const create = async newBlog => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const services = { getAll, setToken, create }

export default services