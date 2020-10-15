import React,{Component}from 'react';
//we don't need to write form tag because whenever we are having type=submit html automatically submits the form
class register extends Component{
  constructor(props){
    super(props);
    this.state={
      registerEmail:'',
      registerPassword:'',
      registerName:''
    }
  }
  onNameChange=(e)=>{
    this.setState({registerName:e.target.value});
  }
  onEmailChange=(e)=>{
      this.setState({registerEmail:e.target.value});
  }
   onPasswordChange=(e)=>{
      this.setState({registerPassword:e.target.value});
  }

onSubmitRegister=()=>{
        fetch('http://localhost:2001/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.registerEmail,
        password:this.state.registerPassword,
        name:this.state.registerName

      })
    }).then(response=>response.json()).then(user=>
    {
      if(user.id)
      {
        this.props.loadUser(user);
        this.props.onrouteChange('home');

      }
    })
    
  }
  render()
  {
    const {onrouteChange}=this.props;
	return(
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input onChange={this.onNameChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
      
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitRegister}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
    </div>
    <div className="lh-copy mt3">
      
      
    </div>
  </div>
</main>
</article>

	);
}
}
export default register;