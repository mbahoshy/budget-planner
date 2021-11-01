import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Drawer = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const budgets = useSelector((state) => state.budgets.value);

  const history = useHistory();

  let query = useQuery();

  const setBudget = ({ _id }) => {
    history.push({
      search: `?budget=${_id}`
    })
  }

  if (!open) return (
    <div className="app-drawer">
      <div style={{ width: '50px', borderBottom: '1px solid #ccc'  }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              justifyContent: 'flex-end',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </div>
      </div>
    </div>
  )
  return (
    <div className="app-drawer">
      <div style={{ width: '200px', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              justifyContent: 'flex-end',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
      <div style={{ width: '200px', borderBottom: '1px solid #ccc' }}>
        {(budgets || []).map(({
          _id,
          description
        }) => (
          <div onClick={() => setBudget({ _id })}>
            {description}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drawer;