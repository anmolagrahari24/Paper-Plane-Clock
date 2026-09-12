import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stopAlarm, snoozeAlarm } from '../store/alarmSlice';

const PlayAlarm = () => {
  const ringingAlarm = useSelector(state => state.alarms.ringingAlarm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!ringingAlarm) return null;

  const handleStop = () => {
    dispatch(stopAlarm());
    navigate('/');
  };

  const handleSnooze = () => {
    dispatch(snoozeAlarm());
    navigate('/');
  };

  return (
    <div className="play-alarm-screen" style={{ backgroundColor: 'black', color: 'white', height: '100vh' }}>
      <h1>{new Date().toLocaleTimeString()}</h1>
      <h2>{ringingAlarm.label}</h2>
      
      <div className="actions">
        {ringingAlarm.snooze && (
          <button onClick={handleSnooze} className="btn-snooze">Snooze</button>
        )}
        <button onClick={handleStop} className="btn-stop">Stop</button>
      </div>
    </div>
  );
};

export default PlayAlarm;