import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserProfile} from "../../utils/type";
import {fetchUser, registerUser, updateUser} from "../api/accountApi.ts";

const initialState = {} as UserProfile;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserProfile>) => action.payload,
        clearUser: () => {
        },
        changeFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        changeLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        }},
        extraReducers: builder => {
            builder
                .addCase(registerUser.fulfilled, (_state, action) => action.payload.user)
                .addCase(fetchUser.fulfilled, (_state, action) => action.payload.user)
                .addCase(updateUser.fulfilled, (_state, action) => action.payload)
        }

})
export default userSlice.reducer;
export const {setUser, clearUser, changeFirstName, changeLastName} = userSlice.actions;