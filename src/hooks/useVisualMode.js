import { useState } from 'react';

export default function useVisualMode(initial) {
	const [ mode, setMode ] = useState(initial);
	const [ history, setHistory ] = useState([ initial ]);
	const transition = (mode, replace = false) => {
		if (replace === true) {
      history.pop()
			history.push(mode);
			setMode(mode);
		} else {
			history.push(mode);
			setMode(mode);
		}
	};
	function back() {
		history.length > 1 ? history.pop() && setMode(history[history.length - 1]) : setMode(initial);
	}

	return { mode, transition, back };
}
