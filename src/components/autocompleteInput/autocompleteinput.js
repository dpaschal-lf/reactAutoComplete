import React, { Component } from 'react';
import './autocompleteinput.css';
import AutoCompleteOption from './autocompleteoption/autocompleteoption';
import spinner from './waitspinner.gif';

class AutoCompleteInput extends Component{
	constructor( props){
		super(props);
		this.state = {
			text: '',
			suggestions: [],
			showSpinner: false
		}
		this.suggestionWaitTime = 250;
		this.typingTimer = null;
		this.handleTyping = this.handleTyping.bind(this);
		this.findSuggestions = this.findSuggestions.bind(this);
		this.useSuggestion = this.useSuggestion.bind(this);
	}
	useSuggestion(word){
		console.log('got suggestion: '+word);
		this.setState({
			text: word, 
			suggestions: []
		})
	}
	makeSuggestions(list){
		if(this.state.text!==''){
			return list.map( (listObject, index) => <AutoCompleteOption selectCallback={this.useSuggestion} key={index} word={listObject.word} fragment={this.state.text}/>)
		} else {
			return <div>type a word to get suggestions</div>
		}
	}
	findSuggestions(){
		this.setState({
			showSpinner: true,
			suggestions: []
		})
		fetch('http://danielpaschal.com/wordproxy.php?word='+this.state.text)
			.then( response => {
				console.log('got response')
				return response.json();
			})
			.then( data => {
				this.setState( { suggestions: data, showSpinner: false });
			})
			.catch( err => {
				console.error(err);
				this.setState( { suggestions: [], showSpinner: false });
			})
	}
	handleTyping(event){
		debugger;
		if(this.typingTimer){
			this.clearTimer();
		}
		this.startTimer();
		debugger;
		this.setState({
			text: event.currentTarget.value
		})
		return true;
	}
	startTimer(){
		this.typingTimer = setTimeout( this.findSuggestions, this.suggestionWaitTime);
	}
	clearTimer(){
		clearTimeout(this.typingTimer);
		this.typingTimer = null;
	}
	render(){
		return (
			<div className='autoCompleteInput'>
				<input onChange={(e)=>this.handleTyping(e)} type="text" placeholder="type a word" value={this.state.text}/>
				{ this.state.showSpinner ? <img src={spinner}/> : ''}
				<div className="suggestions">
					{this.makeSuggestions(this.state.suggestions)}
				</div>
			</div>
		)
	}
}

export default AutoCompleteInput;