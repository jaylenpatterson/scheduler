import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
	const formatSpots = () => {
		if (props.spots === 0) {
			return 'no spots remaining';
		}
		if (props.spots === 1) {
			return '1 spot remaining';
		}

		return props.spots + ' spots remaining';
	};

	const spotsRemaining = formatSpots();
	const dayClass = classNames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': props.spots === 0
	});

	return (
		<li className={dayClass} onClick={() => props.setDay(props.name)}>
			<h2  className="text--regular">
				{props.name}
			</h2>
			<h3 className="text--light">{spotsRemaining} </h3>
		</li>
	);
}
