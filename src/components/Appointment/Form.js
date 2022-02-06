import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
	const [ student, setStudent ] = useState(props.student || '');
	const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
	const [ error, setError ] = useState('');
	const reset = () => {
		setStudent('');
		setInterviewer('');
	};

	const cancel = () => {
		reset();
		return props.onCancel();
	};

	const validInput = () => {

		if (props.student === "" ) {
		  setError("student name cannot be blank")
			return
		}
		
		setError("");
		props.onSave(student, interviewer);
	};


	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form onSubmit={(event) => event.preventDefault()} autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						name={props.name}
						type="text"
						placeholder="Enter Student Name"
						value={student || props.name}
						onChange={(event) => setStudent(event.target.value)}
						data-testid="student-name-input"
					/>
				</form>
				<section className="error_handling">{error}</section>
				<InterviewerList value={interviewer} onChange={setInterviewer} interviewers={props.interviewers} />
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validInput} >
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
