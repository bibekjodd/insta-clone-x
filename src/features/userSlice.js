import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userModal: false,
    },
    reducers: {
        changeUserModal: (state) => {
            state.userModal = !state.userModal
        }
    }
});


export const selectUserModal = (state) => state.user.userModal
export const { changeUserModal } = userSlice.actions
export default userSlice.reducer;
