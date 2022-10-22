import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userModal: false,
        postModal: false,
    },
    reducers: {
        changeUserModal: (state) => {
            state.userModal = !state.userModal
        },
        changePostModal: (state) => {
            state.postModal = !state.postModal
        },
    }
});


export const selectUserModal = (state) => state.user.userModal
export const selectPostModal = (state) => state.user.postModal
export const { changeUserModal, changePostModal } = userSlice.actions
export default userSlice.reducer;
