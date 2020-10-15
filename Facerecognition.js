import React from 'react';
import './Facerecognition.css';
const facerecog=({input,box})=>{
	return(
	<div className="center ma">
	<div className="absolute mt2">
	<img id="inputimage" alt='face' src={input} width="500px" height="auto"/>
	<div className="bounding-box" style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
	</div>
	</div>
	);
}
export default facerecog;