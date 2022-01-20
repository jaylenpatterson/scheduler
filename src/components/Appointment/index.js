import React from 'react';
import '../Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';

export default function Appointment(props) {
	return (
		<article className="appointment">
			<Header time={props.time} />
			{props.interview ? <Show interviewer={props.interview['interviewer'].name} student={props.interview['student']} /> : <Empty />}
		</article>
	);
}
