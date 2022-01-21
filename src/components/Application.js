import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from './DayList';
import Appointment from './Appointment';

export default function Application(props) {
	const [ state, setState ] = useState({
		day: 'Monday',
		days: [],
		appointments: {}
	});

	const dailyAppointments = [];

	const setDay = (day) => {
		return setState({ ...state, day });
	};
	const appointmentList = dailyAppointments.map((appointment) => {
		return <Appointment key={appointment.id} {...appointment} />;
	});

	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers')
		]).then((all) => {
			console.log('cool', all[0]); // first
			console.log('nice', all[1].data); // second
			console.log('dang', all[2]); // third
			const [ first, second, third ] = all;
			setState((all) => ({
				...state,
				days: first.data,
				appointments: {
					interviewers: third.data,
					...second,

					
				}
			}));

			console.log(first, second);
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
			<section className="schedule">{appointmentList}</section>
		</main>
	);
}
