const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}


const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'ANECDOTE':
            const anecdote = action.data
            return state.concat(anecdote)
        case 'VOTE':
            const id = action.data.id
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)
            const voteAnecdotes = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(anecdote => anecdote.id !== id ? anecdote : voteAnecdotes).sort((a, b) => b.votes - a.votes)

        case 'UNVOTE':
            const unvoteId = action.data.id
            const toUnvote = state.find(anecdote => anecdote.id === unvoteId)
            const unvoteAnecdotes = {
                ...toUnvote,
                votes: toUnvote.votes - 1

            }
            return state.map(anecdote => anecdote.id !== unvoteId ? anecdote : unvoteAnecdotes).sort((a, b) => b.votes - a.votes)

        default:
            return state
    }
}

export const addNewAnecdote = (anecdote) => {
    return {
        type: 'ANECDOTE',
        data: asObject(anecdote)
    }
}

export const increaseVotes = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const decreaseVotes = (id) => {
    return {
        type: 'UNVOTE',
        data: { id }
    }
}

export default reducer