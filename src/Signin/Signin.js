import React,{Component} from 'react';
import './Signin.css'
class Signin extends Component 
{ 
	constructor(props)
	{
		super(props)
		this.state = {
			siginemail:'',
			signinpassword:''
		}
	}
	onEmailChange=(e)=>
	{
		this.setState({siginemail:e.target.value})
	}
	onpasswordChange=(e)=>
	{
		this.setState({signinpassword:e.target.value})
	}
	onSubmitsignin=(event)=>
	{
		event.preventDefault();//to prevent post this port
		fetch("http://localhost:5000/signin",{
			method: "POST",
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.siginemail,
				password:this.state.signinpassword
			})
		})
		.then(res=>res.json())
		.then(res=>
			{
				if(res.id){
					this.props.updateUser(res)
					this.props.onRouteChange('home');
			}
			})
		.catch(err=> console.log(err))
	}
	render(){
		const {onRouteChange}=this.props;
		return (
			<main className="pa4 black-80 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			  <form className="measure center" method="post">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0" style={{'color':'black'}}>Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input
			         className="pa2 input-reset ba bg-transparent  hover-white w-100 hover-bg"
			          type="email" name="email-address" 
			          onChange={(e)=>this.onEmailChange(e)} id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-white w-100 hover-bg" type="password" name="password"  id="password" onChange={(e)=>this.onpasswordChange(e)}/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  type="submit" value="Sign in" onClick={(e)=>this.onSubmitsignin(e)}/>
			    </div>
			    <div className="lh-copy mt3">
			      <p className="f6 pointer dim black db" onClick={()=>onRouteChange('register')}>Register</p>
			    </div>
			  </form>
			</main>

			);
		}
	
}

export default Signin;

