import { baseApi } from "../../api/api";

export interface IUser {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
export interface UserResponse {
  user: IUser;
  token: string;
}
export enum Roles {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}

export interface SignUpRequest {
  username: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: Roles; // Assuming you have Roles enum imported
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}


export interface LoginRequest {
  email: string;
  password: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, SignUpRequest>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data after signing up
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data after signing in
    }),
    // Other auth-related endpoints can be defined similarly
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    validAuthUser: builder.query({
      query: (token) => ({
        url: `/user/validAuth/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useValidAuthUserQuery,
} = authApi;
