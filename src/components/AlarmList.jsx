import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAlarm, deleteAlarm } from '../store/alarmSlice';
import { formatDays } from '../utils/helpers';

const AlarmList = () => {
  const alarms = useSelector(state => state.alarms.alarms);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="screen-container">
      <header>
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? 'Done' : 'Edit'}
        </button>
        <span>Alarm</span>
        <Link to="/add-alarm">Add</Link>
      </header>
      
      {alarms.length === 0 ? (
        <h2 className="no-alarms">No Alarms set</h2>
      ) : (
        <ul className="alarm-list">
          {alarms.map(alarm => (
            <li key={alarm.id} className={alarm.isActive && !isEditMode ? 'active' : 'inactive'}>
              
              {/* Delete Icon (Only shows in Edit Mode) */}
              {isEditMode && (
                <div className="delete-icon" onClick={() => dispatch(deleteAlarm(alarm.id))}>
                  X
                </div>
              )}

              <div 
                className="alarm-info" 
                style={{ flex: 1, cursor: isEditMode ? 'pointer' : 'default' }}
                onClick={() => isEditMode && navigate(`/edit-alarm/${alarm.id}`)}
              >
                <h2>
                  {alarm.displayTime ? alarm.displayTime.split(' ')[0] : alarm.time}
                  <span className="am-pm">{alarm.displayTime ? alarm.displayTime.split(' ')[1] : ''}</span>
                </h2>
                <p>{alarm.label}, {formatDays(alarm.days)}</p>
              </div>

              {/* Toggle or Arrow */}
              {isEditMode ? (
                <span style={{ color: '#c8c7cc', fontSize: '1.5rem' }}>›</span>
              ) : (
                <input 
                  type="checkbox" 
                  checked={alarm.isActive} 
                  onChange={() => dispatch(toggleAlarm(alarm.id))} 
                />
              )}

            </li>
          ))}
        </ul>
      )}
      <div className="nav-footer">
        <Link to="/">Clock</Link>
      </div>
    </div>
  );
};

export default AlarmList;