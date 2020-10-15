//Since if we add clarifai to our front end,anyone can steal our api key so we are adding the api in our backend so that no one can see the api key
const Clarifai=require('clarifai');
const app = new Clarifai.App({
 apiKey: 'b2f1045052294b05b73396f24d5e6fcb'
});
//console.log("click");
   // this.setState({imageUrl:})
    //app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.inp).then(response=>this.calculateFaceLocation(response)).catch(err=>console.log(err));
    //Object.assign(this.state.user,{entries:count}) doesn't changes the entire user object ,it only changes entries
const handleApiCall=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with API'))
}

const handleImage=(req,res,db)=>{
	const {id}=req.body;
	/*let found=false;
	database.users.forEach(user=>{
		if(user.id===id)
		{
			found=true;
			user.entries++;
			return res.json(user.entries);
		}
		
			
	})
	if(!found)
	{
		res.status(404).json("User doesn't exist");
	}*/
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
  	res.json(entries[0]);//entries is also an array 
  })
   .catch(err=>res.status(400).json("unable to get entries"));//it works if I do db('')
}
module.exports={handleImage,handleApiCall};
