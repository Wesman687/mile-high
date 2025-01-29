import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sea-lion-app-r75mq.ondigitalocean.app/"
    }),
    endpoints: (builder) => ({
        getAllFlowers: builder.query({
            query: () => "/apiflower/list"
        })
    })
})
export const { useGetAllFlowersQuery } = productsApi