import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import 'components/InterviewerListItem.scss';
// import classNames from 'classnames';

export default function DayListItem(props) {
   const InterviewerListItems = props.interviewers.map(interviewer => <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar}
      /> );

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list" />
      {InterviewerListItems}
		</section>
	);
}

