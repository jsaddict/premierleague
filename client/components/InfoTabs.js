import React from 'react';
import axios from 'axios';
import TeamsContent from './tabs/Teams'
import FixturesContent from './tabs/Fixtures'
import LeagueTableContent from './tabs/LeagueTable'
import { cloneObj } from '../util';
import { API_CONFIG } from '../apiConfig';

export default class InfoTabs extends React.Component{
	constructor(){
		super();
		// dynamically select and change the order of tabs
		this.tabList = ['teams', 'fixtures', 'leagueTable'];
		this.tabConfig = {
			teams : {
				component : TeamsContent,
				name : 'Teams',
				dataUrl : 'teams'
			},
			fixtures : {
				component : FixturesContent,
				name : 'Fixtures',
				dataUrl : 'fixtures'
			},
			leagueTable : {
				component : LeagueTableContent,
				name : 'League Table',
				dataUrl : 'leagueTable'
			}
		}
		this.state = {
			// avoiding nested states for better performance
			TAB_teams : {
				// dataStatus : 'init/loading/error/success'
				dataStatus : 'init',
				selected : false
			},
			TAB_fixtures : {
				dataStatus : 'init',
				selected : false
			},
			TAB_leagueTable : {
				dataStatus : 'init',
				selected : false
			}
		}
		this.data = {};
		this.fetchData = this.fetchData.bind(this);
		this.showContent = this.showContent.bind(this);
		this.getTabHeadingClasses = this.getTabHeadingClasses.bind(this);
		this.getTabTypeClasses = this.getTabTypeClasses.bind(this);
	}
	fetchData(tab, url){
		let newState = cloneObj(this.state);
		newState['TAB_'+tab].dataStatus = 'fetching';
		this.setState(newState);
		axios.get(url, API_CONFIG)
			.then((res) => {
				let newState = cloneObj(this.state);
				console.log(res, 'res success')
				let data = res;
				if(res.error){
					newState['TAB_'+tab].dataStatus = 'error';
				}else{
					newState['TAB_'+tab].dataStatus = 'success';
				}
				this.data[tab] = res.data;
				this.setState(newState);
			})
			.catch((err) => {
				let newState = cloneObj(this.state);
				console.log(err, 'res error')
				newState['TAB_'+tab].dataStatus = 'error';
				this.data[tab] = err;
				this.setState(newState);
			})
	}
	getTabHeadingClasses(tab){
		if(this.state['TAB_'+tab].selected == true){
			return 'tab-info-heading active';
		}else{
			return 'tab-info-heading';
		}
	}
	getTabTypeClasses(tab){
		if(this.state['TAB_'+tab].selected == true){
			return 'tab-info-type active';
		}else{
			return 'tab-info-type';
		}
	}
	componentWillReceiveProps(nextProps){
		// Resetting closed accordion state
		if(nextProps.resetSelection == true){
			let newState = cloneObj(this.state);
			newState.TAB_teams.selected = false;
			newState.TAB_fixtures.selected = false;
			newState.TAB_leagueTable.selected = false;
			this.setState(newState);
		}
	}
	resetTabSelection(state){
		const tabList = this.tabList;
		for(let i=0; i<tabList.length; i++){
			state['TAB_'+tabList[i]].selected = false;
		}
	}
	showContent(tab, url){
		if(this.state['TAB_'+tab].selected == true){
			return
		}
		let newState = cloneObj(this.state);
		this.resetTabSelection(newState);
		newState['TAB_'+tab].selected = true;
		if(this.state['TAB_'+tab].dataStatus == 'init'){
			this.fetchData(tab,url);
		}
		this.setState(newState);
	}
	render(){
		return(
			<div className = "tab-container">
				<div className = "tab-headings-container">
					{this.tabList.map( (tabItem, index) => {
						return(
							<div key = {index} className = {this.getTabHeadingClasses(tabItem)} onClick = { () => this.showContent(tabItem, this.props.links[this.tabConfig[tabItem].dataUrl].href) }>
								{this.tabConfig[tabItem].name}
							</div>
						)
					})}
				</div>
				<div className = "tab-info-container">
					{this.tabList.map( (tabItem, index) => {
						let TagComponent =  this.tabConfig[tabItem].component;
						return(
							<div key = {index} className = {this.getTabTypeClasses(tabItem)}>
								<TagComponent data = { this.data }/>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}