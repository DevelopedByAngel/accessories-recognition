import React,{Component} from 'react';
import '../Signin/Signin.css'
class Register extends Component 
{
	constructor(props)
	{
		super(props)
		this.state = {
			email:'',
			name:'',
			password:''
		}
	}
	onNameChange(e)
	{
		this.setState({name:e.target.value})
	}
	onEmailChange(e)
	{
		this.setState({email:e.target.value})
	}
	onPasswordChange(e)
	{
		this.setState({password:e.target.value})
	}
	onSubmitRegister=(event)=>
	{
		event.preventDefault();//to prevent post this port
		fetch("http://localhost:5000/register",{
			method: "POST",
			headers: {'Content-Type': 'application/json'},
    	  	body: JSON.stringify({
	        email: this.state.email,
	        password: this.state.password,
	        name: this.state.name
	      })
	    })
      .then(response => response.json())
      .then(user => {
          if (user.id) {
			this.props.updateUser(user)
			this.props.onRouteChange('home');
			}
		})
	}
	render()
	{
		const {onRouteChange}=this.props;
		return (
			<main className="pa4 black-80 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			  <form className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0" style={{'color':'black'}}>Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
			        <input className="pa2 input-reset ba bg-transparent  hover-white w-100 hover-bg" type="text" name="name"  id="name" onChange={(e)=>this.onNameChange(e)}/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent  hover-white w-100 hover-bg" type="email" name="email-address"  id="email-address" onChange={(e)=>this.onEmailChange(e)}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent  hover-white w-100 hover-bg" type="password" name="password"  id="password" onChange={(e)=>this.onPasswordChange(e)}/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={(e)=>this.onSubmitRegister(e)}/>
			    </div>
			    <div className="lh-copy mt3">
			      <p  className="f6 pointer dim black db" onClick={()=>onRouteChange('signin')}>Sign in</p>
			    </div>
			  </form>
			</main>
			)
	}
}

export default Register;
