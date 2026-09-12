import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { triggerAlarm } from "./store/alarmSlice";
import { padZero } from "./utils/helpers";

import DigitalClock from "./components/DigitalClock";
import AlarmList from "./components/AlarmList";
import PlayAlarm from "./components/PlayAlarm";
import AlarmEdit from "./components/AlarmEdit";

const AppContent = () => {
  const alarms = useSelector((state) => state.alarms.alarms);
  const ringingAlarm = useSelector((state) => state.alarms.ringingAlarm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Background Alarm Checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHHMM = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;
      const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

      alarms.forEach((alarm) => {
        // Check if alarm is active, time matches, and it is the right day (or empty for today)
        const isRightDay =
          alarm.days.length === 0 || alarm.days.includes(currentDay);

        if (
          alarm.isActive &&
          alarm.time === currentHHMM &&
          isRightDay &&
          !ringingAlarm
        ) {
          // Trigger the alarm and force navigate to play screen
          dispatch(triggerAlarm(alarm));
          navigate("/play-alarm");
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, ringingAlarm, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<DigitalClock />} />
      <Route path="/alarms" element={<AlarmList />} />
      <Route path="/play-alarm" element={<PlayAlarm />} />
      <Route path="/add-alarm" element={<AlarmEdit />} />
      <Route path="/edit-alarm/:id" element={<AlarmEdit />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
