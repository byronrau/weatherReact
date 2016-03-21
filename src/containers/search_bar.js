import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchWeather} from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};
    this.state = {initCities: []};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  getInitCities(){
    // console.log(JSON.parse(localStorage.getItem('weatherReactCities')));
    var savedCities = JSON.parse(localStorage.getItem('weatherReactCities'));
    if(savedCities !== null) {
      this.setState({initCities: savedCities})
      savedCities.forEach((city, index)=>{
        ((city) => {
          setTimeout(function(){
            this.props.fetchWeather(city)
          }.bind(this), index*300);
        })(city);
      })
    }
  }

  componentDidMount() {
    this.getInitCities();
  }
  onInputChange(event) {
    this.setState({term:event.target.value});
  }
  onFormSubmit(event){
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({initCities: this.state.initCities.concat(this.state.term)}, ()=> {
      localStorage.setItem('weatherReactCities', JSON.stringify(this.state.initCities))
    })
    this.setState({term:''});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Enter city name for forecast"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);