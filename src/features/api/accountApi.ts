import {base_url} from "../../utils/constants.ts";
import type {UserData, UserProfile, UserRegister} from "../../utils/type";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../../app/store.ts";

const authEndpoints=['updateUser'];

export const accountApi = createApi({
    reducerPath: "accountApi",
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, {getState,endpoint}) => {
            if (authEndpoints.includes(endpoint) ) {
                const token=(getState() as RootState).token
                headers.set("Authorization", token);

            }
            return headers;
        }


    }),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: user => ({
                url: '/account/register',
                method: 'POST',
                body: user
            }),
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/account/login',
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['profile']
        }),

        updateUser: builder.mutation<UserProfile, { login: string, userData: Omit<UserData, 'login'> }>({
            query: ({userData, login}) => ({
                url: `/account/user/${login}`,
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['profile']
        }),

        changePassword: builder.mutation<void, { newPassword: string, token: string }>({
            query: ({newPassword, token}) => ({
                url: `/account/password`,
                method: 'PATCH',
                headers: {
                    Authorization: token,
                },
                body: {password: newPassword}

            })

        })

    })


})

export const {
    useLazyFetchUserQuery,
    useRegisterUserMutation,
    useFetchUserQuery,
    useChangePasswordMutation,
    useUpdateUserMutation
} = accountApi;


// export const registerUser = createAsyncThunk(
//     'user/register',
//     async (user: UserRegister) => {
//         const response = await fetch(`${base_url}/account/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         });
//         if (response.status === 409) {
//             throw new Error(`User ${user.login} allready exists`)
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong: ${response.status}`)
//         }
//         const data = await response.json();
//         const token = createToken(user.login, user.password);
//         //const token =btoa(`${user.login}:${user.password}`);
//         return {
//             user: data,
//             token
//         }
//     }
// )
//
// export const fetchUser = createAsyncThunk(
//     'user/fetch',
//     async (token: string) => {
//         const response = await fetch(`${base_url}/account/login`, {
//             method: 'POST',
//             headers: {
//                 Authorization: token
//             }
//         })
//         if (response.status === 401) {
//             throw new Error(`login or password is wrong`)
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong: ${response.status}`)
//         }
//         const data = await response.json();
//         return {
//             user: data,
//             token
//         }
//     }
// )
//
// export   type UserUpdate = Omit<UserData, 'login'>;
//
//
// export const updateUser = createAsyncThunk<UserProfile, UserUpdate, { state: RootState }>(
//     'user/update',
//     async (user, {getState}) => {
//         const response = await fetch(`${base_url}/account/user/${getState().user.login}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: getState().token
//             },
//             body: JSON.stringify(user)
//
//         })
//         if (response.status === 401) {
//             throw new Error(`login or password is wrong`)
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong: ${response.status}`)
//         }
//         return  await response.json();
//     }
// )
//
// export const changePassword = createAsyncThunk<string, { newPassword:string, oldPassword:string }, { state: RootState }>(
//     'user/Password',
//     async ({newPassword,oldPassword},{getState}) => {
//         const response = await fetch(`${base_url}/account/password`, {
//             method: 'PATCH',
//             headers: {
//                 Authorization: createToken(getState().user.login, oldPassword),
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({password: newPassword})
//         })
//         if (response.status === 401) {
//             throw new Error(`login or password incorrect`)
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong: ${response.status}`)
//         }
//         return createToken(getState().user.login, newPassword)
//
//     }
// )