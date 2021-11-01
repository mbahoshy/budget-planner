import { createSlice } from '@reduxjs/toolkit'
import { budget } from '../constants/budget';

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    value: {},
  },
  reducers: {
    setBudget: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    clearBudget: (state) => {
      state.value = null
    },
    setItem: (state, action) => {
      const { value } = state || {};
      const { items } = value || {};
      const { payload: item } = action || {};
      const x = (items || []).filter(i => i._id !== item._id);
      state.value = {...value, items: [...x, item] }
    }
  },
})

// Action creators are generated for each case reducer function
export const { actions, reducer } = budgetSlice

export default budgetSlice