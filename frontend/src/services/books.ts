import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICreateBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  image: string;
}

// For a book that comes back from DB
export interface IBook extends ICreateBook {
  _id: string; // now always required
}

export interface IBorrow {
  book: {
    _id: string;
    title: string;
    copies:number;
    author?: string;
    isbn?: string;// extra fields
  } | null;
  quantity: number;
  dueDate: string;
}


export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2000/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    addBooks: builder.mutation<void, ICreateBook>({
      query: (addBooks) => ({
        url: "/books",
        method: "POST",
        body: addBooks,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<IBook, Partial<IBook> & { _id: string }>({
      query: ({ _id, ...patch }) => ({
        url: `/books/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Books"], // auto refresh book list
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation<{ message: string }, IBorrow>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrows"],
    }),
  getBorrows: builder.query<IBorrow[], void>({
  query: () => "/borrow",
  providesTags:["Borrows"],
  transformResponse: (response: { success: boolean; data: IBorrow[] }) => {
    return response.data; // শুধু data অংশ ফেরত দিবে
  },
}),


  }),
});

export const {
  useGetBooksQuery,
  useAddBooksMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
  useGetBorrowsQuery
} = booksApi;
