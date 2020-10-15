const handleRegister=(req,res,db,bcrypt)=>{
    //Asynchronous way
     //bcrypt.hash(password, null, null, function(err, hash) {
        //console.log(hash);
    // Store hash in your password DB.
    //when we need to do more than one thing at a time,we use transaction
     const {email,password,name}=req.body;
     if(!name || !email || !password)
     {
        return res.status(400).json('incorrect form submission');
     }
     
    const hash=bcrypt.hashSync(password);//Synchronous
    db.transaction(trx=>{
    	trx.insert({
            hash:hash,
            email:email
    	})
    	.into('login')
    	.returning('email')//comes from login table after inserting email and hash in login table
    	.then(loginEmail=>{
    	return trx('users')
        .returning('*')//returns all the columns of the user we have inserted just now and works just like select * from users but instead of giving all the users,it gives the one which is just now inserted
        .insert({
		name:name,
		email:loginEmail[0],
		joined:new Date()
	      }).then(user=>{
		res.json(user[0]);//since while registering there is only one user and user itself is an array of objects and here we are getting response from database server after inserting
    	})
	   })  
       .then(trx.commit)//to make the user added into the tables ,we write trx.commit and trx is an object
       .catch(trx.rollback)//for any error
   })
    .catch(err=>res.status(400).json('unable to register'))
}
module.exports={
    handleRegister:handleRegister
};