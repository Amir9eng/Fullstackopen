import { createSlice } from "@reduxjs/toolkit"

const initialState = ''


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
    return dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => dispatch(hideNotification()), seconds)
    }
}

export default notificationSlice.reducer