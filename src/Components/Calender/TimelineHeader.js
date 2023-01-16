import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_STATE, CHANGE_DATE, createAction } from "../../redux/actions";
import { month } from "../../Utils/Constants";
import "../../styles/TimelineHeader.scss";
import Months from "./Months";
import Days from "./Days";
import AddEventsButton from "../AddEventsButton";

const TimelineHeader = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const selectedDate = useSelector((state) => state.datereducer.date);
  const [eventDate, setEventDate] = useState(new Date());
  const prevDate = useSelector((state) => state.datereducer.date);
  const [date, setCurrentDate] = useState(new Date());
  const changeToday = () => {
    if (selectedDate !== new Date().toDateString())
      dispatch(createAction(CHANGE_DATE, new Date().toDateString()));
    setCurrentDate(new Date());
    setEventDate(new Date());
  };
  const decreaseMonth = () => {
    let previousMonth = date.getMonth() - 1;
    if (previousMonth < 0) {
      previousMonth = 11;
      const prevYear = date.getFullYear() - 1;
      new Date(date.setFullYear(prevYear));
      setCurrentDate(new Date(date.setMonth(previousMonth)));
    }
    setCurrentDate(new Date(date.setMonth(previousMonth)));
  };
  const increaseMonth = () => {
    let nextMonth = date.getMonth() + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      const nextYear = date.getFullYear() + 1;
      new Date(date.setFullYear(nextYear));
      setCurrentDate(new Date(date.setMonth(nextMonth)));
    }
    setCurrentDate(new Date(date.setMonth(nextMonth)));
  };
  const changeDate = (context) => {
    if (new Date(prevDate).getDate() !== parseInt(context)) {
      setCurrentDate(new Date(date.setDate(context)));
      setEventDate(date);
      dispatch(createAction(CHANGE_DATE, date.toDateString()));
    }
  };
  const changeEventMonth = (newMonth) => {
    const selectedMonth = month.indexOf(newMonth);
    setCurrentDate(new Date(date.setMonth(selectedMonth)));
  };
  return (
    <>
      <div className="timeline-top-container">
        <div className="timeline-top-column-flex">
          <div className="create-event-row">
            <div className="current-date-today">
              <div className="current-date">{selectedDate}</div>
              <button className="today-button" onClick={changeToday}>
                Today
              </button>
            </div>
            <div className="title">Schedule Your Events</div>
            <div></div>
            <AddEventsButton eventDate={eventDate} />
          </div>
          <div className="icon-flex">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => {
                setCurrentDate(
                  new Date(date.setFullYear(date.getFullYear() - 1))
                );
              }}
            />
            <div>{date.getFullYear()}</div>
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => {
                setCurrentDate(
                  new Date(date.setFullYear(date.getFullYear() + 1))
                );
              }}
            />
          </div>
          <div className="icon-flex month-view">
            <FontAwesomeIcon icon={faChevronLeft} onClick={decreaseMonth} />
            {month.map((month, index) => (
              <Months
                month={month}
                date={date}
                indexOfMonth={index}
                changeEventMonth={changeEventMonth}
              />
            ))}
            <FontAwesomeIcon icon={faChevronRight} onClick={increaseMonth} />
          </div>

          <div className="icon-flex date-view">
            <Days date={date} changeDate={changeDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineHeader;
