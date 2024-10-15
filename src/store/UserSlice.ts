import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  ID: number,
  username: string,
  email: string,
  role: string,
  is_verified: boolean,
  is_active: boolean,
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date | null,
}


export interface UserState {
  currentUser : User | null,
  loading: boolean
}

const initialState: UserState = {
  currentUser: null,
  loading: true
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },

    setLoading(state, action) {
      state.loading = action.payload;
    }

  },
})

export const { setUser , setLoading } = userSlice.actions

export default userSlice.reducer