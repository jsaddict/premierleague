import React from 'react';
export default function LeagueTableContent(props){
	let count = 0;
	if(!props.data.leagueTable){
		return <div className='tab-info-status'>Fetching League Table..</div>
	}
	if(props.data.leagueTable.error){
		return <div className='tab-info-status'>Error Fetching League Table</div>
	}
	return(
		<div className='tab-info-leagueTable'>
			<div className='leagueTable-row lt-heading'>
				<span className = "leagueTable-position">Position</span>
				<span className = "leagueTable-teamName">Team</span>
				<span className = "leagueTable-points">Points</span>
			</div>
			{props.data.leagueTable.standing.map( (team, index) => 
				<div key={index} className='leagueTable-row'>
					<span className = "leagueTable-position">{team.position}</span>
					<span className = "leagueTable-teamName">{team.teamName}</span>
					<span className = "leagueTable-points">{team.points}</span>
				</div>
			)}
		</div>
	)
}