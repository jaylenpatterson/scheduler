import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from './helpers/selectors';
import useVisualMode from 'hooks/useVisualMode';

export default function Application(props) {
	const [ state, setState ] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});

	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
	const setDay = (day) => {
		return setState({ ...state, day });
	};
	const interviewers = getInterviewersForDay(state, state.day);
	const appointments = getAppointmentsForDay(state, state.day);
	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};
		const appointments = {
			...state.appointments,
			[id]: appointment
		};
		setState({
			...state,
			appointments
		});

		return axios.put(`/api/appointments/${id}`, { interview }).then((res) => transition(SHOW));
	}

	function cancelInterview(id) {

		return axios.delete(`/api/appointments/${id}`)
	}

	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers')
		]).then((all) => {
			const [ first, second, third ] = all;
			setState((all) => ({
				...all,
				days: first.data,
				appointments: second.data,
				interviewers: third.data
			}));
		});
	}, []);

	return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
			</section>
			<section className="schedule">{schedule}</section>
		</main>
	);
}
