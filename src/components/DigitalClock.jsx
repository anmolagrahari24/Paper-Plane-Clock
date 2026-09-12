import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { padZero } from '../utils/helpers';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="screen-container">
      <header>Clock</header>
      <div className="clock-display">
        <h1>
          {padZero(time.getHours())}:{padZero(time.getMinutes())}:{padZero(time.getSeconds())}
        </h1>
        <p>{time.toDateString()}</p>
      </div>
      <div className="nav-footer">
        <span>Clock</span>
        <Link to="/alarms">Alarm</Link>
      </div>
    </div>
  );
};

export default DigitalClock;