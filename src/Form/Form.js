import React from 'react';
import $ from "jquery";
import './Form.css'

const Form=(props)=>
{
	const {onInput,onSubmit}=props;
	return (
		<div>
		<div className='formcontainer'>
		<p className='f3 '>
		This Star will detect faces in your images</p>
		<br/>
		<div className='form'>
		<input type='text' onChange={(e)=>onInput(e)} placeholder='Enter image url' className='input f3 w-70'/>
		<button className='bu grow w-29' onClick={()=>onSubmit()}>Detect</button>
		</div>
		</div></div>
	)
}

export default Form;