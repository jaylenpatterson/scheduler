import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props)
  const dayListItems = props.days.map(day => <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      /> );

console.log("cool",dayListItems)



  return(
    <>
    {dayListItems}
    </>
  )
}