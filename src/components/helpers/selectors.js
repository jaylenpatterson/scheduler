export function getAppointmentsForDay(state, day) {
	let appointments = [];

  if (!state.days[0]) {
    return appointments
   
  }

	const getAppointmentIds = () => {
		for (let x of state.days) {
			if (x.name === day) {
				return x.appointments;
			}
		}
    return appointments
	};

	getAppointmentIds().map((x) => {
    if (state.appointments[`${x}`]) {
      appointments.push(state.appointments[`${x}`])
    } 
	});

  return appointments
}
