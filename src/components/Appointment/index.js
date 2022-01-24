import React from 'react';
import '../Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';
	const DELETING = 'DELETING';
	const CONFIRM = 'CONFIRM';
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props.bookInterview(props.id, interview).then(() => transition(SHOW));
	}

	function deleteApp() {
		props.cancelInterview(props.id).then((res) => {
			transition(EMPTY);
		});
	}

	return (
		<article className="appointment">
			<Header time={props.time} />

			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					interviewer={props.interview['interviewer'].name}
					student={props.interview['student']}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
			{mode === SAVING && <Status saving={true} />}
			{mode === DELETING && <Status deleting={true} />}
			{mode === CONFIRM && (
				<Confirm
					onConfirm={() => {
						transition(DELETING);
						deleteApp();
					}}
					onCancel={back}
					message={'are you sure doe?'}
				/>
			)}
		</article>
	);
}
