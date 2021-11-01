import React from 'react';

const MonthCell = ({
  monthString
}) => {
  return <th style={{ borderBottom: '1px solid #ccc' }}>{monthString}</th>
}

const MonthHeader = ({
  months
}) => {

  return (
    <thead>
    <tr>
      <th></th>
      {months.map(month => <MonthCell {...month} />)}
      <th></th>
    </tr>
  </thead>
  )
}

export default MonthHeader;