import axios from 'axios';
import { API_CONFIG, LEAGUE_URL } from '../apiConfig';
export function toggleAccordion(index, stateList){
	return {
		type : 'TOGGLE_ACCORDION',
		index,
		stateList
	}
}
export function updateLeagueData(data){
	return {
		type : 'UPDATE_LEAGUE_DATA',
		data
	}
}
export function fetchingLeagueData(){
	return {
		type : 'FETCHING_LEAGUE_DATA'
	}
}
export function leagueDataError(){
	return {
		type : 'LEAGUE_DATA_ERROR'
	}
}
export function getLeagueList(){
	return (dispatch) => {
		dispatch(fetchingLeagueData())
		axios.get(LEAGUE_URL, API_CONFIG)
			.then(function(res){
				console.log(res.data)
				dispatch(updateLeagueData(res.data));
			})
			.catch(function(err){
				dispatch(leagueDataError())
			})
	}
}