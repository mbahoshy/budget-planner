import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { get } from '../../utils/fetch';
import { actions } from '../../slices/budgetSlice';
import { actions as typesActions } from '../../slices/typesSlice';
import BudgetTable from './BudgetTable';

import dayjs from 'dayjs';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getMonths = ({ startDate, endDate }) => {
  const start = dayjs(startDate);
  const numMonths = dayjs(endDate).diff(start, 'months') + 1;
  return new Array(numMonths)
    .fill(null)
    .map((x, i) => {
      const current = start.add(i, 'months');
      const monthString = current.format('MMM')
      return {
        year: current.year(),
        month: current.month(),
        monthString
      }
    })
}

const Budget = () => {
  const budget = useSelector((state) => state.budget.value)
  const types = useSelector((state) => state.types.value)
  const query = useQuery();
  const b = query.get('budget')
  const dispatch = useDispatch();

  useEffect(async () => {
    const data = await get(`/budgets/${b}`);
    dispatch(actions.setBudget(data));
  }, [b])

  useEffect(async() => {
    const data = await get(`/types`);
    dispatch(typesActions.setTypes(data));
  }, [])


  const months = getMonths(budget);


  return (
    <div>
      <BudgetTable budget={budget} types={types} />
    </div>
  )
}

export default Budget;