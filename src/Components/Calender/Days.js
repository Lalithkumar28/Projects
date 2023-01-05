import moment from "moment";
import React, { useState } from "react";
import "../../styles/Days.scss";
import DaysOfWeek from "./DaysOfWeek";
const Days = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { date } = props;
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  date.setDate(1);
  const firstDayIndex = date.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();
  const lastDayIndex = new Date(year, month + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  const addCurrentDays = [];
  for (let i = 1; i <= lastDay; i++) {
    addCurrentDays.push(i);
  }
  const addPrevDays = [];
  for (let x = firstDayIndex; x > 0; x--) {
    addPrevDays.push(prevLastDay - x + 1);
  }
  const addNextDays = [];
  for (let k = 1; k <= nextDays; k++) {
    addNextDays.push(k);
  }
  const changeNewDate = (changedDay) => {
        props.changeDate(changedDay);
  };
  return (
    <div className="days">
      {addPrevDays.map((day, index) => (
        <DaysOfWeek
          changeDate={changeNewDate}
          currentDate={date}
          otherDays={true}
          display={day}
        />
      ))}
      {addCurrentDays.map((day, index) => (
        <DaysOfWeek
          changeDate={changeNewDate}
          currentDate={date}
          otherDays={false}
          display={day}
        />
      ))}
      {addNextDays.map((day, index) => (
        <DaysOfWeek
          changeDate={changeNewDate}
          currentDate={date}
          otherDays={true}
          display={day}
        />
      ))}
    </div>
  );
};

export default Days;
