import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlannerHeader from './PlannerHeader'
import { get } from '../../utils/fetch';
import { actions } from '../../slices/budgetSlice';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Planner = () => {
  const budget = useSelector((state) => state.budget.value)
  const query = useQuery();
  const b = query.get('budget')
  const dispatch = useDispatch();

  useEffect(async () => {
    const data = await get(`/budgets/${b}`);
    dispatch(actions.setBudget(data));
  }, [b])


  return (
    <div>
      <PlannerHeader budget={budget} />
    </div>
  )
}

export default Planner;