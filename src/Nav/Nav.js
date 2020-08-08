import React from 'react';
import './Nav.css'
const Nav=(props)=>
{
	const {onRouteChange, isSignedIn}=props;
	if(isSignedIn)
		return(
			<nav  style={{display:'flex',justifyContent:'flex-end'}}>	
			<p className='signout' onClick={()=>onRouteChange('signin')}>Sign Out</p>
		</nav>
			)
	else
	return (
		<nav  style={{display:'flex',justifyContent:'flex-end'}}>	
			<p className='signout' onClick={()=>onRouteChange('signin')}>Sign In</p>
			<p className='signout' onClick={()=>onRouteChange('register')}>Register</p>
		</nav>
		)
}
export default Nav