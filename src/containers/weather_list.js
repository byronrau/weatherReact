import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { bindActionCreators} from 'redux';
import { removeCity } from '../actions/index';
import { iconMapping } from '../utils';

class WeatherList extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderCities = this.renderCities.bind(this);
  }
  handleClick(city) {
    this.props.removeCity(city);
  }

  renderToday(listCity, index) {
    return(
      <div className="today">
        <span className="date">{moment.unix(listCity.dt).format('ddd MM/DD')} </span><br/>
        <i className={'wi ' + iconMapping[listCity.weather[0].id]}></i> <br/>
        <span className="temp">{(Math.floor(listCity.temp.max)).toString() + String.fromCharCode(176)}</span>
      </div>
    )
  }
  renderForecast(listCity, index){
    if(index !== 0) {
      return(
        <div>
          <span className="date">{moment.unix(listCity.dt).format('ddd MM/DD')} </span><br/>
          <i className={'wi ' + iconMapping[listCity.weather[0].id]}></i> <br/>
          <span className="temp">{(Math.floor(listCity.temp.max)).toString() + String.fromCharCode(176)}</span>
        </div>
      )
    }
  }

  renderCities(city) {
    return (
      <div key={city.city.name}>
      <div  >
        <div className="city-name" onClick={() => this.handleClick(city.city.name)}> {city.city.name} </div>
        <div className="today">{this.renderToday(city.list[0])}</div>
        <div className="forecast">
          <table>
            <tbody>
            <tr>
            {city.list.map((listCity, index) => {
              return (
                <td key={listCity.dt}>{this.renderForecast(listCity,index)}</td>
              )
            })}
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br/>
      </div>
    )
  }
  render() {
    console.log('weather', this.props.weather);
    return (
      <div>
        {this.props.weather.map(this.renderCities)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {weather: state.weather};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeCity}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);