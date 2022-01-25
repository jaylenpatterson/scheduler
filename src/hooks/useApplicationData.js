import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAppointmentsForDay, getInterview } from 'components/helpers/selectors';
export default function useApplicationData() {
	const [ state, setState ] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});
	const setDay = (day) => {
		return setState({ ...state, day });
	};

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

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};
		const appointments = {
			...state.appointments,
			[id]: appointment
		};
		const days = createDaysObject(state.days, appointments);
    
		return axios
			.put(`api/appointments/${id}`, appointment)
			.then((res) => {
				if (res) {
					setState({
						...state,
						appointments,
						days
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
			interview: null
		};
		const appointments = {
      ...state.appointments,
			[id]: appointment
		};
    const days = createDaysObject(state.days, appointments);
		return axios.delete(`/api/appointments/${id}`).then(() => {
			setState({
				...state,
				appointments,
        days
			});
		});
	}

	function updateSpotsRemaining(day, appointments) {
		let spotsRemaining = 0;
		for (const appointmentId of day.appointments) {
			if (appointments[appointmentId].interview === null) {
				spotsRemaining++;
			}
		}

		return spotsRemaining;
	}

	function createDaysObject(days, appointments) {
		const daysUpdated = days.map((day) => {
			return {
				...day,
				spots: updateSpotsRemaining(day, appointments)
			};
		});

		return daysUpdated;
	}

	return {
		cancelInterview,
		bookInterview,
		setDay,
		state
	};
}

export { useApplicationData };
