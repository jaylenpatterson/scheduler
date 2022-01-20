import React from 'react';
import '../Appointment/styles.scss';


export default function Appointment(props) {

	return (
		<article className="appointment">
			{!props.time ? "no appointments" : "appointment at" + " " + props.time}
		</article>
	) 
}
