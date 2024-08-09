import { create } from '@mui/material/styles/createTransitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://milehighserv.onrender.com/api/"
    }),
    endpoints: (builder) => ({
        getAllFlowers: builder.query({
            query: () => "flower/list"
        })
    })
})
export const { useGetAllFlowersQuery } = productsApi