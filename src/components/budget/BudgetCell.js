import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../utils/fetch';
import { actions } from '../../slices/budgetSlice';

const BudgetCell = ({
  month,
  year,
  entry,
  itemId,
  style,
  budgetId,
  type,
  clearOnBlur
}) => {
  const { value: entryValue, _id } = entry || {};

  const dispatch = useDispatch();

  const [value, setValue] = useState(entryValue || '');
  const handleChange = e => {
    const { value: inputValue } = e.target || {};
    setValue(inputValue)
  }
  const handleBlur = async (e) => {
    try {
      const { value } = e.target || {};
      if (!value && !_id) return;
      const item = await post(`/entries/${_id || ''}`, {
        itemId,
        value,
        month,
        year,
        budgetId,
        type
      });
      dispatch(actions.setBudget(item))
      if (clearOnBlur) setValue('')

    } catch (err) {
      console.dir(err);
    }
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
          paddingRight: '5px',
          fontSize: '1rem',
          // backgroundColor: 'transparent',
          ...style
        }}
      />
    </td>
  )
}

export default BudgetCell;