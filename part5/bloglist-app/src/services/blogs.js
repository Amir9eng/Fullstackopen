import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
let config

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

const update = async blogToUpdate => {
    const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
    return response.data
}
const remove = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const services = { getAll, setToken, create, update, remove }

export default services