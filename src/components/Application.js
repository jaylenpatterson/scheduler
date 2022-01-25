import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from './helpers/selectors';
import useVisualMode from 'hooks/useVisualMode';
import useApplicationData from 'hooks/useApplicationData';
export default function Application(props) {


	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
	const { cancelInterview, bookInterview, setDay, state} = useApplicationData()
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
			
			<section className="schedule">{schedule}<Appointment key="last" time="5pm" /></section>
		</main>
	);
}
