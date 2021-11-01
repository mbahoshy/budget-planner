import React, { useState } from 'react';
import dayjs from 'dayjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import BudgetCell from './BudgetCell';
import ItemCell from './ItemCell';
import { del, post } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/budgetSlice';

const BudgetRow = ({
  months,
  item,
  i,
  secondaryColor,
  entries = [],
  budgetId,
  type,
  clearOnBlur
}) => {

  const {
    description,
    // entries = [],
    budgetTotal,
    _id: itemId,
    displayOrder
  } = item || {};

  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  const style = i % 2 === 1 ? { backgroundColor: secondaryColor } : { backgroundColor: 'rgb(241 241 241)' };

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const handleDragStart = (ev) => {
    ev.dataTransfer.dropEffect = "move";
    const str = JSON.stringify({ itemId })
    ev.dataTransfer.setData('text/plain', str)
  }

  const handleDrop = async (ev) => {
    try {
      const str = ev.dataTransfer.getData('text')
      const json = JSON.parse(str);
      const { itemId } = json || {};
      const data = await post(`/items/${itemId}/displayorder`, {
        itemIndex: i || 0,
        type
      });
      dispatch(actions.setBudget(data));

    } catch (err) {
      console.dir(err);
    }

  }
  const handleDragOver = (ev) => {
    ev.preventDefault();
  }

  const handleDragEnter = (ev) => {
  }

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Delete item?');
      if (!confirmed) return;
      const data = await del(`/items/${itemId}`)
      dispatch(actions.setBudget(data));
    } catch (err) {

    }
  }

  const { length: numMonths } = months || [];

  return (
    <tr
      style={{ fontSize: '1rem'}}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
    >
      <ItemCell
        item={item}
        budgetId={budgetId}
        type={type}
        clearOnBlur={clearOnBlur}
      />
      {months.map(month => {
        const entry = entries.find(({ month: m, year: y }) => m === month.month && y === month.year)
        return <BudgetCell
          style={style}
          month={month.month}
          year={month.year}
          entry={entry}
          itemId={itemId}
          budgetId={budgetId}
          type={type}
          clearOnBlur={clearOnBlur}
        />
      })}
      {itemId && (
        <td
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            onClick={handleDelete}
            style={{ cursor: 'pointer', padding: '2px', visibility: hover ? 'visible' : 'hidden', color: 'red' }}
          >
            <FontAwesomeIcon icon={faTimes} />

          </span>
        </td>
      )}
      <td>{budgetTotal}</td>
      {/* <td colSpan={12 - numMonths}></td> */}
    </tr>
  )

}


export default BudgetRow