import React from 'react';

export default function Status(props) {
	let body;

	if (props.saving) {
		body = 'saving';
	}

	if (props.deleting) {
		body = 'deleting';
	}

	return (
		<main className="appointment__card appointment__card--status">
			<img className="appointment__status-image" src="images/status.png" alt="Loading" />
			<h1 className="text--semi-bold">{body}</h1>
		</main>
	);
}
