import React,{Component} from 'react';
import Particles1 from 'react-particles-js';
import './App.css';
import Navigation1 from './Component/Navigation/Navigation';
import Facerecognition from './Component/Facerecognition/Facerecognition'
import Logo1 from './Component/Logo/Logo';
import Signin  from './Component/Signin/Signin';
import Register  from './Component/Register/Register';
import Rank from './Component/Rank/Rank';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
//import Clarifai from 'clarifai';

const particlesOptions={
               particles: {
                  number: {
                    value:100,
                    density:{
                      enable: true,
                      value_area:500
                    }
                  }
                }
             }
const initialState={
      inp:'',
      box1:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
}
class App extends Component {
  constructor()
  {
    super();
    this.state=initialState;
      
      //imageUrl:''

  }
  loadUser=(user)=>{
    this.setState({user:{
      id:user.id,
      name:user.name,
      email:user.email,
      entries:user.entries,
      joined:user.joined
    }})
  }
  /*componentDidMount(){
    //fetch('http://localhost:2001/').then(response=>response.json()).then(data=>console.log(data));
fetch('http://localhost:2001/').then(response=>response.json()).then(console.log);//it will also do console.log(data)
//reponse.json() converts the JSON to JS object
  }*/
  calculateFaceLocation(data)
  {
     const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
     const img=document.getElementById("inputimage");
     const width=Number(img.width);
     const height=Number(img.height);
     //console.log(width,height);
     return {
           leftCol:clarifaiFace.left_col*width,
           topRow:clarifaiFace.top_row*height,
           rightCol:width-(clarifaiFace.right_col*width),
           bottomRow:height-(clarifaiFace.bottom_row*height)

      }
  }
  displayFaceBox=(box)=>
  {
  this.setState({box1:box});
  //console.log(this.state.box1);
}
  

  
  onInputChange=(e)=>{
    //console.log(e.target.value);
    this.setState({inp:e.target.value});
  }
  onButtonSubmit=()=>{
    //console.log("click");
   // this.setState({imageUrl:})
    //app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.inp).then(response=>this.calculateFaceLocation(response)).catch(err=>console.log(err));
    //Object.assign(this.state.user,{entries:count}) doesn't changes the entire user object ,it only changes entries
    //since we are fetching something we need to do response.json()
                 fetch('http://localhost:2001/imageurl',{
                      method:'post',
                      headers:{'Content-Type':'application/json'},
                      body:JSON.stringify({
                        input:this.state.inp
                      })
                 }).then(response=>response.json())
                .then(response=>{
                  if(response){
                    fetch('http://localhost:2001/image',{
                      method:'put',
                      headers:{'Content-Type':'application/json'},
                      body:JSON.stringify({
                        id:this.state.user.id
                      })
                    })
                    .then(response=>response.json())
                    .then(count=>{
                      this.setState(Object.assign(this.state.user,{entries:count}))
                    })
                    .catch(console.log)
                  }
    
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err=>console.log(err));
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    
  }
  onrouteChange=(route)=>{
    if(route==='signout')
    this.setState(initialState)
  else if(route==='home')
    this.setState({isSignedIn:true})
  this.setState({route:route});
  

  }

  render(){
    const {isSignedIn,box1,route,inp}=this.state;
  return (
    <div className="App">
     <Particles1 className="Particles"params={particlesOptions} />
      <Navigation1 isSignedIn={isSignedIn} onrouteChange={this.onrouteChange} />
      {this.state.route==='home'
       ?<div>
      <Logo1 />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange1={this.onInputChange} onButtonSubmit1={this.onButtonSubmit}/>
      <Facerecognition box={box1} input={inp}/>
      </div>
      :(
      route==='signin'?<Signin loadUser={this.loadUser} onrouteChange={this.onrouteChange}/>:<Register loadUser={this.loadUser} onrouteChange={this.onrouteChange}/>
      )
      
    }
      
    </div>
  );
}
}

export default App;
