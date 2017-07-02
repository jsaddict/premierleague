import React from 'react';
import moment from 'moment';
export default function FixturesContent(props){
	let count = 0;
	if(!props.data.fixtures){
		return <div className='tab-info-status'>Fetching Fixtures..</div>
	}
	if(props.data.fixtures.error){
		return <div className='tab-info-status'>Error Fetching Fixtures</div>
	}
	let prevDate = 0
	if(props.data.fixtures){
		return(
			<div className='tab-info-fixtures'>
				{props.data.fixtures.fixtures.map( (fixture, index) => {
					let dateElement = null;
					if(!moment(prevDate).isSame(fixture.date, 'day')){
						prevDate = fixture.date;
						dateElement = <div className='fixture-date'>{moment(fixture.date).format("dddd, MMMM Do YYYY")}</div>;
					}
					return(
						<div key = {index}>
							{dateElement}
							<div className='fixture-details'>
								<div className='fixture-home-team'>
									<div className='team-name'>{fixture.homeTeamName}</div>
								</div>
								<div className='fixture-vs'>vs</div>
								<div className='fixture-away-team'>
									<div className='team-name'>{fixture.awayTeamName}</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}else{
		return null;
	}
}