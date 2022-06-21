import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        createNotification(state, action) {
            let message = action.payload === "" ? "" : `${action.payload}`
            console.log('state now: ', state)
            console.log('action', action)
            return message
        },
    },
})

export const { createNotifcation } = notificationSlice.actions

export default notificationSlice.reducer