import React from 'react';
import './Rec.css'
const Rec=(props)=>
{
	var {boxes}=props;
	if(boxes.length>8)
		boxes=boxes.slice(0,8);
	if(boxes.length>0){
	return(
		boxes.map((box,i)=>
		{	
			if((box.left_col-box.right_col>5 || box.left_col-box.right_col<-5)  && (box.top_row-box.bottom_row>5 ||box.top_row-box.bottom_row<-5))
			return <div className='bounding-box' style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}><p><span>{box.name}</span></p></div>
			else
			return null
		})
		)
}
else
return null;
}

export default Rec;
