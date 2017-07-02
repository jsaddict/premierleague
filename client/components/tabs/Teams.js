import React from 'react';
export default function TeamsContent(props){
	let count = 0;
	if(!props.data.teams){
		return <div className='tab-info-status'>Fetching Teams Data..</div>
	}
	if(props.data.teams.error){
		return <div className='tab-info-status'>Error Fetching Teams Data</div>
	}
	return(
		<div className='tab-info-teams'>
			{props.data.teams.teams.map( (team, index) => 
				<a key={index} href={team._links.self.href} target='_blank' className='team-grid-item'>
					<img src={team.crestUrl} className='team-grid-image' alt={team.shortName}></img>
					<span className='team-grid-name' title={team.shortName}>{team.shortName}</span>
				</a>
			)}
		</div>
	);
}