import React from 'react';

const getStyle = value => {
  if (value > 0) return { color: 'green' };
  return { color: 'red' };
}
// const getStyle = value => {
//   if (value > 200) return { color: 'green' };
//   if (value > 0) return { color: 'yellow' };
//   if (value > -200) return { color: 'orange' };
//   return { color: 'red' };
// }

const TotalsFooter = ({
  months,
  totals
}) => {

  return (
    <tbody style={{ textAlign: 'right', fontWeight: 'bold' }}>
      <tr>
        <td></td>
        {(months || []).map(m => {
          const t = (totals || []).find(t => t.year === m.year && t.month === m.month) || {};
          const style = getStyle (t.value || 0);
          return <td style={style}>{t.value ? t.value.toFixed(2) : ''}</td>
        })}
      </tr>
    </tbody>
  )
}

export default TotalsFooter;