import { createSlice, current } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    users: [], totalPages: 0, currentPage: 0
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        }
    },
})

export const { setUsers, setUser,setPage,setTotalPages } = userSlice.actions

export default userSlice.reducer