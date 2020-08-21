import React,{Component} from 'react';
import './App.css';
import Nav from './Nav/Nav';
import Rank from './Rank/Rank';
import Logo from './Logo/Logo';
import Form from './Form/Form';
import Rec from './Rec/Rec';
import Signin from './Signin/Signin';
import Register from './Register/Register';
import Particles from 'react-particles-js';
import 'tachyons'
import $ from "jquery";
import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: '853c717f24ad4cf990d37b7c5ab84d75'
});

const particlesparams={
  particles: {
    number: {
      "value": 12,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#6aace0"
    },
    "shape": {
      "type": "star",
      "stroke": {
        "width": 5,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.1,
        "opacity_min": 0,
        "sync": true
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": true
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.5,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": true,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 800,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 5
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
const intial={
      input:'',
      ImgURL:'',
      box:{},
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
class  App extends Component {
  constructor() 
  {
    super();
    this.state = {
      input:'',
      ImgURL:'',
      box:{},
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
  }
  FaceLocation=(response)=>
  {
    const boxes=response.outputs[0].data.regions.map(region=>
      {
      const data=region.region_info.bounding_box;
      const image=document.getElementById('img');
      const width=Number(image.width);
      const height=Number(image.height);
      return{
        top_row:data.top_row*height,
        right_col:width-data.right_col*width,
        bottom_row:height-data.bottom_row*height,
        left_col:data.left_col*width,
        name:region.data.concepts[0].name
        }
      });
      return boxes;
         
  }
  updateUser=(user)=>
  {
    console.log(user.id,user.name,user.email,user.entries,user.joined)
    console.log('submitted app')
    this.setState({user:{id:user.id,name:user.name,email:user.email,entries:user.entries,joined:user.joined}})

  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  drawbox=(box)=>
  {
    this.setState({box:box})
  }
  onInput=(event) => {
    this.setState({input:event.target.value})  
  }

  onSubmit=(e) => {
    e.preventDefault()
    // fetch('https://shrouded-sea-67190.herokuapp.com/imageURL',
    //   {
    //   method: "post",
    //   headers:{'Content-Type':'application/json'},
    //   body:JSON.stringify({
    //   input:this.state.input
    //      })
    //   })
    //   .then(response=>console.log(response))
      // .then(count=>console.log(count))
    this.setState({ImgURL:this.state.input})
    // model no in wesite https://www.clarifai.com/model-gallery
    app.models.predict("72c523807f93e18b431676fb9a58e6ad", this.state.input)
   .then(response=> {
    if(response)
    {
      console.log(this.state.user.id)
      fetch('https://shrouded-sea-67190.herokuapp.com/image',
      {
      method: "put",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      id:this.state.user.id   
         })
      })
      .then(response=>response.json())
      .then(count=>
      {
        this.setState({user:{id:this.state.user.id,name:this.state.user.name,email:this.state.user.email,entries:count,joined:this.state.user.joined}})
        // only entries changed an also use this.setState(Object.assign(user, {entries:count}))
      })
      .catch(err=>console.log(err))
    }
    this.drawbox(this.FaceLocation(response))})
   .catch(err=>console.log(err))
    }
  onRouteChange=(route)=>
  {
    if(route=='signin')
    {
      this.setState(intial)//clearing all user details to start state
    }
    else if(route=='home')
      this.setState({isSignedIn:true})
    this.setState({route:route})
  }
  
  render(){
      return (
        <div className="App">
        <Particles className='particles' params={particlesparams} />
        <Nav onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route==='signin'
        ?<Signin onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
        :this.state.route==='register'
        ?<Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
        :<div className=''>
        <Logo/>
        <Rank entries={this.state.user.entries} name={this.state.user.name}/>
        <Form onInput={this.onInput} onSubmit={this.onSubmit}/>
        <br/>
        <Rec src={this.state.ImgURL} box={this.state.box}/>
        </div>
      }
        </div>

      )
  }
}

export default App;
 