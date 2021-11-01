import logo from './logo.svg';
import './App.css';
import Planner from './components/planner/Planner';
import Drawer from './components/drawer/Drawer';
import { useEffect } from 'react';
import { get } from './utils/fetch';
import { useDispatch } from 'react-redux';
import { actions } from './slices/budgetsSlice';
import Budget from './components/budget/Budget';

const AppHeader = () => {

  return (
    <div className="app-header">

    </div>
  )
}

const AppResize = () => {

  const handleDragStart = ev => {
    ev.dataTransfer.dropEffect = 'move';
  }

  const handleDragEnd = ev => {
  }

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            position: 'absolute',
            height: 'calc(100vh - 100px)',
            width: '10px',
            left: '-5px',
            cursor: 'ew-resize',
            // backgroundColor: 'green'
          }}
        >
        </div>
      </div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  useEffect(async () => {
    const data = await get('/budgets');
    dispatch(actions.setBudgets(data));
  }, [])
  return (
    <div className="app">
      <AppHeader />
      <div style={{ display: 'flex' }}>
        <Drawer />
        <AppResize />
        {/* <div style={{ height: '600px' }}></div> */}
        <div style={{ overflowX: 'scroll' }}>
          {/* <Planner /> */}
          <Budget />
        </div>
      </div>
    </div>
  );
}

export default App;
