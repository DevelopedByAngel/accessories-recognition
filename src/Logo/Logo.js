import React from 'react';
import './Logo.css'
// import './Nav.css'
import $ from "jquery";
import star from './star.svg'
function tilt(event)
{
	const t=0;
	const width=$('.tilt').width()/2-$('.tilt').position().left;
	const height=$('.tilt').height()/2-$('.tilt').position().top;
	const x=event.pageX;
	const y=event.pageY;
	var rx,ry;
	if(x-$('.tilt').position().left<width)
		rx=70*x;
	else
		rx=-70*x;
	if(y-$('.tilt').position().top<height)
		ry=-70*y;
	else
		ry=-100*y;
	$('tilt').css('transform','')
	$('.tilt').css('transform','rotate3d('+rx+','+ry+',0,40deg) scale(1.1)');
}
function tiltoff()
{
	$('.tilt').css('transform','rotate3d(0,0,0,0deg');
}
const Logo=()=>
{
	return (
		<div className='tilt shadow-3 ' onMouseMove={(e)=>tilt(e)} onMouseLeave={tiltoff}>
		<img src={star} alt='logo'/>
		</div>
	)
}

export default Logo