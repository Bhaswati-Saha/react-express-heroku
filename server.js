const exp=require('express');
const bodyParser=require('body-parser');/*it is used to use the req.body as whenever we are sending something from the front end in form of json,
express doesn't know what is it so in order to use req.body we need to parse the json (to convert JSON to javascript object because server/express understands js object)*/ 
//res.json or response.json or res.send does the same work as JSON.stringify
const reg=require('./Controllers/register');
const signin=require('./Controllers/signin');
const profile=require('./Controllers/profile');
const img=require('./Controllers/image');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');//for security purpose
//knex is a function that allows us to connect our server with database
const knex = require('knex');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Bhaswati.sh12',
    database : 'smartbrain'
  }
});
//console.log(db.select('*').from('users'));//this is a promise which returns  a response
/*db.select('*').from('users').then(data=>{
	console.log(data);//data is an array of user object
});*/
const app=exp();

app.use(bodyParser.json());//middleware
app.use(cors());
const database={
	users:[
	{
		id:'123',
		name:'Bhaswati',
		email:'bhaswati.sh12@gmail.com',
		password:'gudduguy',
		entries:0,//keeps the count of ranks
		joined:new Date()
	},
	{
		id:'125',
		name:'Priya',
		email:'priya.sh12gmail.com',
		password:'priee',
		entries:0,
		joined:new Date()//shows the date
	}
	],
	login:[
	{
		id:'',
		hash:'',
		email:''
	}
	]
}
app.get('/',(req,res)=>{
     res.send(database.users);//res.send snd res.json converts the object to JSON
})
/*app.post('/signin',(req,res)=>{
	res.json('successfully signing');//instead of res.send if we use res.json then it will also convert the argument to json like send function but it comes
	 with additional features and will convert the succcesfully signing to "succesfully signing" which is a json format
})*/
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)})

app.post('/register',(req,res)=>{reg.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{img.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{img.handleApiCall(req,res)})
app.listen(process.env.PORT || 3000);
/*app.listen(2001,()=>{
	console.log("Face recognition brain app is running on port 3000");
})*/
/*
Bellow are the end points
/--> res=this is working.
/signin--> POST = user
/register --> POST = user
/profile/:userId--> GET = user
/image --> PUT --> user 
*/

