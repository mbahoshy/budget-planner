import { createSlice } from '@reduxjs/toolkit'

export const typesSlice = createSlice({
  name: 'types',
  initialState: {
    value: [],
  },
  reducers: {
    setTypes: (state, action) => {
      state.value = action.payload;
    },
    clearTypes: (state) => {
      state.value = []
    }
  },
})

export const { actions, reducer } = typesSlice

export default typesSlice