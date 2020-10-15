const handleProfileGet=(req,res,db)=>{
	const {id}=req.params;
	//let found=false;
	db.select('*').from('users').where({id})//here also response after selecting
	.then(user=>{
		if(user.length)
		{
		res.json(user[0]);
	}
	    else
	    {
	    res.status(400).json('Not found');
	}
	})
	.catch(err=>res.status(400).json('error getting the user'));
	
	/*database.users.forEach(user=>{
		if(user.id===id)
		{
			found=true;
			return res.json(user);
		}
		
			
	})*/
	/*if(!found)
		res.status(404).json("User doesn't exist");*/

}
module.exports={handleProfileGet};