import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAlarm, updateAlarm, deleteAlarm } from "../store/alarmSlice";
import { padZero } from "../utils/helpers";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const SOUNDS = ["None", "Radar", "Beep"];
const HOURS = Array.from({ length: 12 }, (_, i) => padZero(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => padZero(i));

const AlarmEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingAlarm = useSelector((state) =>
    id ? state.alarms.alarms.find((a) => a.id === id) : null,
  );

  const [hour, setHour] = useState("06");
  const [minute, setMinute] = useState("20");
  const [ampm, setAmpm] = useState("AM");
  const [snooze, setSnooze] = useState(true);
  const [label, setLabel] = useState("New Alarm");
  const [selectedDays, setSelectedDays] = useState([]);
  const [sound, setSound] = useState("Radar");

  useEffect(() => {
    if (existingAlarm) {
      const [timePart, ampmPart] = existingAlarm.displayTime.split(" ");
      const [h, m] = timePart.split(":");
      setHour(h);
      setMinute(m);
      setAmpm(ampmPart);
      setSnooze(existingAlarm.snooze);
      setLabel(existingAlarm.label);
      setSelectedDays(existingAlarm.days);
      setSound(existingAlarm.sound);
    }
  }, [existingAlarm]);

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSave = () => {
    let hour24 = parseInt(hour, 10);
    if (ampm === "PM" && hour24 !== 12) hour24 += 12;
    if (ampm === "AM" && hour24 === 12) hour24 = 0;
    const time24hr = `${padZero(hour24)}:${minute}`;

    const alarmData = {
      id: existingAlarm ? existingAlarm.id : Date.now().toString(),
      time: time24hr,
      displayTime: `${hour}:${minute} ${ampm}`,
      label,
      snooze,
      days: selectedDays,
      sound,
      isActive: true,
    };

    if (existingAlarm) {
      dispatch(updateAlarm(alarmData));
    } else {
      dispatch(addAlarm(alarmData));
    }
    navigate("/alarms");
  };

  const handleDelete = () => {
    if (existingAlarm) {
      dispatch(deleteAlarm(existingAlarm.id));
    }
    navigate("/alarms");
  };

  return (
    <div className="screen-container">
      <header>
        <button onClick={() => navigate("/alarms")}>Cancel</button>
        <span>{existingAlarm ? "Edit Alarm" : "Add Alarm"}</span>
        <button onClick={handleSave}>Save</button>
      </header>

      <div
        className="form-content"
        style={{ overflowY: "auto", flex: 1, paddingBottom: "20px" }}
      >
        <div className="form-section-title">SELECT TIME</div>
        <div className="form-group time-selectors">
          <select value={hour} onChange={(e) => setHour(e.target.value)}>
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <select value={minute} onChange={(e) => setMinute(e.target.value)}>
            {MINUTES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div className="form-group">
          <span>Snooze</span>
          <input
            type="checkbox"
            checked={snooze}
            onChange={(e) => setSnooze(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <span>Label</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Alarm Label"
          />
        </div>

        <div className="form-section-title">REPEAT</div>
        {DAYS_OF_WEEK.map((day) => (
          <div className="form-group" key={day}>
            <span>{day}</span>
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
          </div>
        ))}

        <div className="form-section-title">SOUND</div>
        {SOUNDS.map((s) => (
          <div className="form-group" key={s}>
            <span>{s}</span>
            <input
              type="radio"
              name="sound"
              value={s}
              checked={sound === s}
              onChange={() => setSound(s)}
              style={{ width: "20px", height: "20px", accentColor: "#007aff" }}
            />
          </div>
        ))}

        <div className="action-buttons">
          <button className="btn-save" onClick={handleSave}>
            Save Alarm
          </button>
          {existingAlarm && (
            <button className="btn-delete" onClick={handleDelete}>
              Delete Alarm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmEdit;
