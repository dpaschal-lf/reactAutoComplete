import React from 'react';

const AutoCompleteOption = (props) =>{
	const remaining = props.word.slice(props.fragment.length);
	return ( <div onClick= {()=> { props.selectCallback(props.word) }}><span>{props.fragment}</span>{remaining}</div>)
}

export default AutoCompleteOption;