import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/counterSlice';
import { reducer as budgetReducer } from '../slices/budgetSlice';
import { reducer as budgetsReducer } from '../slices/budgetsSlice';
import { reducer as typesReducer } from '../slices/typesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    budget: budgetReducer,
    budgets: budgetsReducer,
    types: typesReducer,
  },
})