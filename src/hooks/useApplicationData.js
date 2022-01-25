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

		return axios
			.put(`api/appointments/${id}`, appointment)
			.then((res) => {
				if (res) {
					setState({
						...state,
						appointments
					});
					updateSpotsRemaining();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`);
	}

	function updateSpotsRemaining() {
		let spotsRemaining = 0;
		const spots = {
			...state.days[0].spots
		};
		getAppointmentsForDay(state, state.day).map((x) => {
			console.log(state.days[0].spots);

			if (x.interview === null) {
				spotsRemaining++;
			}
		});

		setState({
			...state
		});


		// // const spots =  state.days[1].spots
		// // console.log(state.days[1].spots  )
		// setState({
		//   ...state,

		// })
	}

	return {
		cancelInterview,
		bookInterview,
		setDay,
		state
	};
}

export { useApplicationData };
