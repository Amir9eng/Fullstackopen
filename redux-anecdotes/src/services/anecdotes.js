import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)

    return response.data
}

const create = async(anecdote) => {
    const getId = () => (100000 * Math.random()).toFixed(0)
    const object = { content: anecdote, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async(anecdote) => {
    const { id } = anecdote
    // console.log(id)
    const votes = { votes: anecdote.votes + 1 }
    const response = await axios.patch(`${baseUrl}/${id}`, votes)
    return response.data
}

const degrade = async(anecdote) => {
    const { id } = anecdote
    // console.log(id)
    const votes = { votes: anecdote.votes - 1 }
    const response = await axios.patch(`${baseUrl}/${id}`, votes)
    return response.data
}



export { getAll, create, update, degrade }