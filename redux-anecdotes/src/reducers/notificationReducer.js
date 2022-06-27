import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
let timeoutID


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            state = action.payload
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    },
})

export const { createNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch(createNotification(message))
        timeoutID = setTimeout(() => dispatch(hideNotification()), seconds)
    }
}

export default notificationSlice.reducer