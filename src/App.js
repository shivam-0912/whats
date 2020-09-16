import React, { Component } from 'react';
import axios from 'axios';
import './App.css'
class App extends Component{
  state={
    key:'',
    phone:'',
    message:'',
    submitted:false,
    data: "hv"
  }
  postDataHandler = () => {
    const data = {
        key: this.state.key,
        phone: this.state.phone,
        message: this.state.message
    };
    axios.post('https://en1owokpogq6xuf.m.pipedream.net', data)
        .then(response => {
            console.log(response);
            //this.props.history.push('/posts');//this will add another page to stack so this is basically somewhat diferent from routing
            //but effectively does the same work
            //routing changes the page while above method just add another page above it so there is a difference
            this.setState( {
              key:'',
              phone:'',
              message:'',
              submitted:false,
              
            } );
        });
      
}
componentDidMount() {
  // Call our fetch function below once the component mounts

this.callBackendAPI()
  .then(res => {
    console.log(res.express)
    return this.setState({ data: res.express })
  })
  .catch(err => console.log(err));
}
// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
callBackendAPI = async () => {
const response = await fetch('/express_backend');
const body = await response.json();

if (response.status !== 200) {
  throw Error(body.message) 
}
return body;
};

render () {
 
  return (
     
      <div className="send">
           
         <h1>Send a whatsapp :</h1>
          <label>Name</label>
          <br/>
          <input type="text" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} />
          <br/>
          <label>Key</label>
          <br/>
          <input type="text" value={this.state.key} onChange={(event) => this.setState({key: event.target.value})} />
          <br/>
          <label>Message</label>
          <br/>
          <textarea rows="4" value={this.state.message} onChange={(event) => this.setState({message: event.target.value})} />
          <br/>
          {/* <label>Phone (with country code)</label>
          <br/>
          <input type="text" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} /> */}
          <br/>
          <button onClick={this.postDataHandler}>Send</button>
      </div>
  );
}
}





export default App;
