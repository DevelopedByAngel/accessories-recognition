import React from 'react';
import './Rec.css'
import Reclist from './Reclist';
const Rec=(props)=>
{
	const {src,box}=props;
	return (
		<div style={{'display':'flex','justifyContent':'center'}} >
      <div style={{'position':'absolute'}}>
        <img id='img' alt='' src={src} width='500px' height='auto'/>
        <Reclist boxes={box}/>
        </div>
        </div>
	)
}

export default Rec;
