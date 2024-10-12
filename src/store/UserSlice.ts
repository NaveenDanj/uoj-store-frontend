import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    ID: number,
    username: string,
    email: string,
    registration_number: string,
    role: string,
    is_verified: boolean,
    is_active: boolean,
    CreatedAt: Date
    UpdatedAt: Date
    DeletedAt: Date | null,
}


export interface UserState {
    currentUser : User | null
}

const initialState: UserState = {
    currentUser: null
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User | null>) => {
        state.currentUser = action.payload
    }

  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer