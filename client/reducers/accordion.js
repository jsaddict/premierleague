import { cloneObj } from '../util';
export function accordion(state = {}, action) {
	let newState;
	switch (action.type) {
		case 'FETCHING_LEAGUE_DATA':
			newState = cloneObj(state)
			newState.dataStatus = 'fetching';
			return newState;
		case 'LEAGUE_DATA_ERROR':
			newState = cloneObj(state)
			newState.dataStatus = 'error';
			return newState;
		case 'UPDATE_LEAGUE_DATA':
			const stateList = [];
			const listLength = action.data.length;
			for(let i=0; i<listLength; i++){
				stateList.push(0);
			}
			return {
				dataStatus : 'success',
				data : action.data,
				stateList
			}
		case 'TOGGLE_ACCORDION':
			const index = action.index;
			const list = state.stateList;
			const aState = [];
			for(var i=0; i<list.length; i++){
				if(index != i){
					aState[i] = 0;
				}else{
					if(list[i] == 0){
						aState[i] = 1;
					}else{
						aState[i] = 0;
					}
				}
			}
			newState = cloneObj(state);
			newState.stateList = aState;
			return newState;
		default:
			return state;
	}
}