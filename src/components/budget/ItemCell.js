import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../utils/fetch';
import { actions } from '../../slices/budgetSlice';

const ItemCell = ({
  item,
  type,
  budgetId,
  style = {},
  clearOnBlur
}) => {

  const { description, _id } = item || {}

  // const { value: entryValue, _id } = entry || {};

  const dispatch = useDispatch();

  const [value, setValue] = useState(description || '');
  const handleChange = e => {
    const { value: inputValue } = e.target || {};
    setValue(inputValue)
  }
  const handleBlur = async (e) => {
    try {
      const { value } = e.target || {};
      if (!value && !_id) return;
      const item = await post(`/items/${_id || ''}`, {
        type,
        budgetId,
        description: value
      });
      dispatch(actions.setBudget(item))
      if (clearOnBlur) setValue('')

    } catch (err) {
      console.dir(err);
    }
  }

  return (
    <td style={{ textAlign: 'right' }}>
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          border: 'none',
          // width: '100px',
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

export default ItemCell;