import React, { useState } from 'react';
import BudgetRow from './BudgetRow';

const BudgetTypeRows = ({
  typeItems,
  type,
  entries,
  months,
  budgetId,
  totals
}) => {

  const {
    secondaryColor,
    primaryColor,
    displayName,
    type: typeId
  } = type || {}

  const { length: numItems } = typeItems || [];

  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen(!open);

  return (
    <tbody>
      <tr
        style={{
          backgroundColor: secondaryColor,
          height: '30px'
        }}
      >
        <td
          onClick={toggleOpen}
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: primaryColor
          }}
        
        >{displayName}</td>
        {(months || []).map(m => {
          const t = totals.find(t => t.month === m.month && t.year === m.year) || {};
          return (
            <td
              style={{
                textAlign: 'right',
                fontWeight: 'bold',
                paddingRight: '5px',
                fontSize: '1rem',
              }}
            >
              {t.value || ''}
            </td>
          )
        })}
        {/* <td colSpan="12"></td> */}
      </tr>
      {open && typeItems.map((item, i) => {
        const itemEntries = (entries || []).filter(({ itemId }) => itemId === item._id)
        return (
          <BudgetRow
            key={item._id}
            type={typeId}
            budgetId={budgetId}
            item={item}
            entries={itemEntries}
            months={months}
            i={i}
            secondaryColor={secondaryColor}
          />
        )
      })}
      {open && (
        <BudgetRow
          months={months}
          i={numItems}
          type={typeId}
          budgetId={budgetId}
          secondaryColor={secondaryColor}
          clearOnBlur
        />
      )}
      <tr style={{ height: '30px' }}></tr>
    </tbody>
  )
}

export default BudgetTypeRows;