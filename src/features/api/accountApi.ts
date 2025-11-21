import {createAsyncThunk} from "@reduxjs/toolkit";
import {base_url, createToken} from "../../utils/constants.ts";
import type {UserData, UserProfile, UserRegister} from "../../utils/type";
import type {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 409) {
            throw new Error(`User ${user.login} allready exists`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        //const token =btoa(`${user.login}:${user.password}`);
        return {
            user: data,
            token
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/account/login`, {
            method: 'POST',
            headers: {
                Authorization: token
            }
        })
        if (response.status === 401) {
            throw new Error(`login or password is wrong`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        const data = await response.json();
        return {
            user: data,
            token
        }
    }
)

export   type UserUpdate = Omit<UserData, 'login'>;


export const updateUser = createAsyncThunk<UserProfile, UserUpdate, { state: RootState }>(
    'user/updateUser',
    async (user, {getState}) => {
        const response = await fetch(`${base_url}/account/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token
            },
            body: JSON.stringify(user)

        })
        if (response.status === 401) {
            throw new Error(`login or password is wrong`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        return  await response.json();
    }
)

export const changePassword = createAsyncThunk<string, string, { state: RootState }>(
    'user/Password',
    async (newPassword: string,{getState}) => {
        const response = await fetch(`${base_url}/account/password`, {
            method: 'PATCH',
            headers: {
                Authorization: getState().token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: newPassword})
        })
        if (response.status === 401) {
            throw new Error(`login or password incorrect`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        return createToken(getState().user.login, newPassword)

    }
)