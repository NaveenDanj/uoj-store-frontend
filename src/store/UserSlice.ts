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
  root_folder: number,
  session_folder: number,
  session_id: string
  session_time: number
  max_upload_size: number
}


export interface UserState {
  currentUser : User | null,
  loading: boolean,
  updater : number
}

const initialState: UserState = {
  currentUser: null,
  loading: true,
  updater: 0
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUpdater: (state , action:PayloadAction<number>) => {
      state.updater = action.payload;
    }

  },
})

export const { setUser , setLoading , setUpdater} = userSlice.actions

export default userSlice.reducer