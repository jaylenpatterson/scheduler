import React from 'react';
import '../Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

export default function Appointment(props) {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
	return (
		<article className="appointment">
			<Header time={props.time} />

			{mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
			{mode === SHOW && <Show interviewer={props.interview['interviewer'].name} student={props.interview['student']}/>}
			{mode === CREATE && <Form interviewers={props.interviewers} onCancel={back}  />}


		</article>
	);
}
