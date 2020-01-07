import React from 'react';
import './App.css';
import './practitionerslist.css'
import DisplayResults from "../components/DisplayResults"
import query from "../services/query"


class Searchform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {foundItems:[]};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const inputNames = ['keywords', 'state']

    const filtered = Object.keys(this.state)
    .filter(key => inputNames.includes(key))
    .reduce((obj, key) => {
      if(this.state[key]){
        obj[key] = this.state[key];
      }
      return obj;
    }, {});

    query(filtered).then(
      (foundItems)=> this.setState({foundItems})
    )
    event.preventDefault();
  }

  render() {
    return (
<div>
<form onSubmit={this.handleSubmit}>
<div className="form-group">
  <label htmlFor="keyword">Keyword search</label>
  <input type="text" className="form-control" id="keyword" placeholder="example: tantra" value={this.state.keyword} onChange={this.handleInputChange} name="keywords"/>
</div>
<div className="form-group">
  <label htmlFor="exampleFormControlSelect1">Select State</label>
  <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleInputChange} name="state">
    <option value="">Select State</option>
    <option>NY</option>
    <option>CA</option>
    <option>CN</option>
    <option>OR</option>
    <option>ON</option>
  </select>
</div>
<input value="Search" type="submit" className="btn btn-primary"/>
</form>
<br/>
<DisplayResults list={this.state.foundItems}/>
</div>
    );
  }
}

function App() {
  return (

<main role="main" className="container">

<div>
  <h1>Somatic Practioner Search</h1>
  <p className="lead">Change your life</p>
</div>

<Searchform />

</main>

  );
}

export default App;
