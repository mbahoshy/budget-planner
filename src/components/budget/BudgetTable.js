import React from 'react';
import dayjs from 'dayjs';

import MonthHeader from './MonthHeader';
import TotalsFooter from './TotalsFooter';
import BudgetTypeRows from './BudgetTypeRows';

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

const BudgetTable = ({
  budget,
  types
}) => {
  const months = getMonths(budget);

  const {
    items,
    // types,
    entries,
    totals,
    _id: budgetId
  } = budget || {};

  const { monthTotals, categoryTotals } = totals || {};


  return (

    <table style={{ width: '100%', borderSpacing: '0' }}>
      <MonthHeader months={months} />
      {(types || []).map(type => {

        const typeItems = (items || []).filter(({ type: t }) => t === type.type)
        const typeTotals = (categoryTotals || []).filter(({ type: t }) => t === type.type);
        return (
          <BudgetTypeRows
            key={type._id}
            type={type}
            typeItems={typeItems}
            entries={entries}
            months={months}
            budgetId={budgetId}
            totals={typeTotals}
          />
        )
      })}
      <TotalsFooter months={months} totals={monthTotals} />
    </table>
  )
}

export default BudgetTable;