import React from 'react';
const Rank=(props)=>
{
	const {entries,name}=props
	const namecase=name.charAt(0).toUpperCase()+name.slice(1)
	return (
		<div>
		<div className='white f3'>
		{namecase}, your current entry count is ...
		</div>
		<div className='white f1'>
		{entries}
		</div>
		</div>
	)
}

export default Rank