import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Formik, Form, Field } from 'formik';

import BudgetCell from './BudgetCell';

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

const DataCell = ({
  month,
  entry,
}) => {

  const { value: entryValue } = entry || {};

  const [value, setValue] = useState(entryValue);
  const handleChange = e => {
    const { value: inputValue } = e.target || {};
    setValue(inputValue)
  }
  const handleBlur = () => {
  }
  return (
    <td style={{ width: '100px', textAlign: 'right' }}>
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          border: 'none',
          width: '100px',
          height: '25px',
          textAlign: 'right',
          paddingRight: '5px'
        }}
      />
    </td>
  )
  return (
    <td style={{ width: '100px', textAlign: 'right' }}>{value}</td>
  )
}

const MonthHeader = ({
  monthString
}) => {
  return <th style={{ borderBottom: '1px solid #ccc' }}>{monthString}</th>
}

const ItemRow = ({
  months,
  item,
  i,
  secondaryColor,
  entries = []
}) => {

  const {
    description,
    // entries = [],
    budgetTotal,
    _id: itemId
  } = item || {};

  const style = i % 2 === 1 ? { backgroundColor: secondaryColor } : {};

  return (
    <tr style={{ fontSize: '1rem'}}>
      <td>{description}</td>
      {months.map(month => {
        const entry = entries.find(({ month: m, year: y }) => m === month.month && y === month.year)
        return <BudgetCell style={style} month={month.month} year={month.year} entry={entry} itemId={itemId} />
      })}
      <td>{budgetTotal}</td>
    </tr>
  )

}


const highlightStyle = {
  backgroundColor: '#0080001a'
}

const PlannerHeader = ({
  budget
}) => {
  const months = getMonths(budget);
  const { length: numMonths } = months || {};
  // const width = 

  const {
    items,
    categories,
    types,
    entries,
    totals
  } = budget || {};

  const getCategoryItems = n => {
    const c = (categories || []).find(o => o._id === n);
    if (!c) return []
    return c.items;
  }

  console.dir(months);
  return (

    <table style={{ width: '100%', borderSpacing: '0' }}>
      <thead>
        <tr>
          <th></th>
          {months.map(month => <MonthHeader {...month} />)}
          <th></th>
        </tr>
      </thead>
      {(types || []).map(({
        type,
        _id: typeId,
        displayName,
        primaryColor,
        secondaryColor
      }) => {

        const typeItems = (items || []).filter(({ type: t }) => t === type)

        return (
          <tbody>
            <tr style={{ backgroundColor: secondaryColor, height: '30px' }}>
              <td
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backgroundColor: primaryColor
                }}
              
              >{displayName}</td>
              <td colSpan="12"></td>
            </tr>
            {typeItems.map((item, i) => {
              const itemEntries = (entries || []).filter(({ itemId }) => itemId === item._id)
              return (
                <ItemRow item={item} entries={itemEntries} months={months} i={i} secondaryColor={secondaryColor} />
              )
            })}
            <tr style={{ height: '40px' }}></tr>
          </tbody>
        )
      })}
      <tbody>
        <tr>
          <td></td>
          {(months || []).map(m => {
            const t = (totals || []).find(t => t.year === m.year && t.month === m.month) || {};
            return <td>{t.value || 0}</td>
          })}
        </tr>
      </tbody>
      {/* <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#00800082',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Income</td>
        </tr>
        {getCategoryItems('income').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#ff00009e',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Debts</td>
        </tr>
        {getCategoryItems('debt').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#ff00009e',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Recurring Bills And Services</td>
        </tr>
        {getCategoryItems('recurring').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#efc700',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Savings</td>
        </tr>
        {getCategoryItems('savings').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#efc700',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Entertainment</td>
        </tr>
        {getCategoryItems('entertainment').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#efc700',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          
          >Household</td>
        </tr>
        {getCategoryItems('household').map((item, i) => <ItemRow item={item} months={months} i={i} />)}
      </tbody> */}
    </table>
  )
}

export default PlannerHeader;