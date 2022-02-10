import React from 'react';
import '../Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';
	const DELETING = 'DELETING';
	const CONFIRM = 'CONFIRM';
	const EDIT = 'EDIT';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';
	const ERROR_EMPTY = 'ERROR_EMPTY';
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		if (interview.student === "" || interviewer === null ) {
			return transition(CREATE)
		};
		transition(SAVING);
		props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(() => {
			return transition(ERROR_SAVE, true);
		});
	}

	function deleteApp() {
		props
			.cancelInterview(props.id)
			.then((res) => {
				transition(EMPTY, true);
			})
			.catch((err) => {
				return transition(ERROR_DELETE, true);
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
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
			{mode === SAVING && <Status saving={true} />}
			{mode === DELETING && <Status deleting={true} />}
			{mode === EDIT && (
				<Form
					interviewers={props.interviewers}
					onCancel={back}
					onSave={save}
					interviewer={props.interview.interviewer.id}
					student={props.interview.student}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error message={"Sorry we're unable to SAVE at this time!"} onClose={() => transition(SHOW)} />
			)}
			{mode === ERROR_DELETE && (
				<Error message={"Sorry we're unable DELETE at this time!"} onClose={() => transition(SHOW)} />
			)}
			{mode === CONFIRM && (
				<Confirm
					onConfirm={() => {
						transition(DELETING);
						deleteApp();
					}}
					onCancel={back}
					message={'Are you sure?'}
				/>
			)}
			{mode === ERROR_EMPTY && (
				<Error message={"student name cannot be blank"} onClose={() => transition(EMPTY)} />
			) }
		</article>
	);
}
