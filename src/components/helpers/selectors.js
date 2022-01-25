export function getAppointmentsForDay(state, day) {
	let appointments = [];

	if (!state.days[0]) {
		return appointments;
	}

	const getAppointmentIds = () => {
		for (let x of state.days) {
			if (x.name === day) {
				return x.appointments;
			}
		}
		return appointments;
	};

	getAppointmentIds().map((x) => {
		if (state.appointments[`${x}`]) {
			appointments.push(state.appointments[`${x}`]);
		}
	});

	return appointments;
}

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}

	return {
		student: interview.student,
		interviewer: {
			id: interview.interviewer,
			name: state.interviewers[`${interview.interviewer}`].name,
			avatar: state.interviewers[`${interview.interviewer}`].avatar
		}
	};
}


export function getInterviewersForDay(state, day) {
	let interviewers = [];
	if (!state.days[0]) {
		return interviewers;
	}

	const getAppointmentIds = () => {
		for (let x of state.days) {
			if (x.name === day) {
				return x.interviewers;
			}
		}
		return interviewers;
	};

	getAppointmentIds().map((x) => {
		if (state.interviewers[`${x}`]) {
			interviewers.push(state.interviewers[`${x}`]);
		}
	});

	return interviewers;
}
