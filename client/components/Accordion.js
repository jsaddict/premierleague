import React from 'react';
import { connect } from 'react-redux';
import { toggleAccordion, getLeagueList } from '../actions/accordion';
import InfoTabs from './InfoTabs'

class Accordion extends React.Component {
	constructor(){
		super();
		this.resetSelection = -1;
	}
	componentWillMount(){
		this.props.getLeagueList();
	}
	componentWillUpdate(prevProps){
		// To reset state for closed accordion
		const prevList = this.props.accordion.stateList;
		const nextList = prevProps.accordion.stateList;
		const listLen = prevList.length;
		this.resetSelection = -1;
		for(let i=0; i<listLen; i++){
			if(prevList[i] == 1 && nextList[i] == 0){
				this.resetSelection = i;
			}
		}
	}
	getClasses(index){
		if(this.props.accordion.stateList[index] == 1){
			return 'accordion-content-container active'
		}else{
			return 'accordion-content-container'
		}
	}
	render(){
		return(
			<div className="accordion-container">
				<p className="accordion-status" hidden={this.props.accordion.dataStatus != 'init'}>
				INIT ACCORDION
				</p>
				<p className="accordion-status" hidden={this.props.accordion.dataStatus != 'fetching'}>
				Fetching League data ...
				</p>
				<p className="accordion-status" hidden={this.props.accordion.dataStatus != 'error'}>
				Error occured on fetching League data
				</p>
				<div className="accordion" hidden={this.props.accordion.dataStatus != 'success'}>
					{this.props.accordion.data.map ( (item, index) => 
						<div key={index} className="accordion-row-container">
							<div className="accordion-row" onClick={() => this.props.toggleAccordion(index)}>
								<span className = "accordion-row-item ari-name">{item.league}</span>
								<span className = "accordion-row-item ari-caption">{item.caption}</span>
								<span className = "accordion-row-item ari-matchday">{item.currentMatchday}&nbsp;/&nbsp;{item.numberOfMatchdays}</span>
							</div>
							<div className={this.getClasses(index)}>
								<div className = "accordion-content">
									<InfoTabs links = {item._links} resetSelection={ this.resetSelection == index ? true : false }></InfoTabs>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		accordion : state.accordion
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleAccordion : (index) => dispatch(toggleAccordion(index)),
		getLeagueList : () => dispatch(getLeagueList())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Accordion);