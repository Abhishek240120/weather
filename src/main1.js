import React from "react";
import  './main1.css';

export default class Main1 extends React.Component{
	constructor(props){
		super(props);
		this.state={
			city:"New delhi",
			data:null,
			nextData:null
		}
		this.searchForCity=this.searchForCity.bind(this);
		this.searchForCity();
		
	}
	getCityName(event){
		this.setState((prev)=>{
			return ({
				city:event.target.value
			});
		});
	}
	searchForCity(){
		let c="https://api.weatherapi.com/v1/forecast.json?key=b288604d7de24974bd495807211903&q="+this.state.city;
		
		let info;
		console.log(this.state.city);
		let forcast;
		fetch(c)
		.then(res=>res.json())
		.then(response => {
			console.log(response);
			
			this.setState((prev)=>{
					if(response.error){
					console.log("hdb bs lfdl  jgfn gnbjntjvn ktngoljgjm");
					console.log(prev);
						return ({
							data:prev.data
						});
					}
					return ({
						data:response
					});
			});
		});
	}
	
	render(){
		return(
		<div>
			<div className="input-group">
				<input type="text" className="form-control" placeholder="Enter Your City Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(event)=>{this.getCityName(event);}}/>
				<button className="btn btn-secondary" type="button" id="button-addon2" onClick={this.searchForCity}>Search</button>
			</div>
			<div>
				<h1><ShowName city={this.state.data} /></h1>

			</div>
			<div>
				<div className="current-weather">
					<div className="current-weather-details">
						<ShowcurrentDetail city={this.state.data}/>
					</div>
				</div>
			</div>
			<div className="forcast">
				<Forcast city={this.state.data}/>
			</div>
		</div>
		);
	}
}

class ShowName extends React.Component{
		constructor(props){
			super(props);
			this.state={
				info:props.city
			}
			
		}
		static getDerivedStateFromProps(props, state) {
			return {info:props.city };
		}
		render(){
			let name="";
			let country="";
			let region="";
			if(this.state.info){
				name=this.state.info.location.name;
				country=this.state.info.location.country;
				region=this.state.info.location.region;
			}
			return (
				<div className="name">{name} ,<span className="name2"> {region} , {country}</span></div>
				
			);
		}		
}


class ShowcurrentDetail extends React.Component{
		constructor(props){
			super(props);
			this.state={
				info:props.city
			}
			
		}
		static getDerivedStateFromProps(props, state) {
			return {info:props.city };
		}
		render(){
			let res;
			if(this.state.info){
				let src=this.state.info.current.condition.icon;
				let cond=this.state.info.current.condition;
				let moreCond=this.state.info.current;
				res=<div>
						<img src={cond.icon} width="200px" height="200px" />
						<span className="condition">{cond.text}</span>
						<div className="more-condition">
							<div>Feels Like :{moreCond.feelslike_c}</div>
							<div>Humidity :{moreCond.humidity}</div>
							<div>Temperature :{moreCond.temp_c}</div>
							<div>Wind Direc. :{moreCond.wind_dir}</div>
							<div>Wind Speed :{moreCond.wind_mph}mph</div>
						</div>
					</div>
			}else{
				res=<div> crahsed</div>
			}
			return (res);
		}		
}

class Forcast extends React.Component{
		constructor(props){
			super(props)
			this.state={
				info:props.city
			}
		}
		static getDerivedStateFromProps(props, state) {
			return {info:props.city };
		}
		render(){
			let data=this.state.info;
			let res;
			if(data){
				res=<div><div className="forcast-details">
						<table width="100%" border="1">
							<tr>
								<td style={{border:"1px solid black",padding:"5px"}}><h2>sunrise :</h2> {data.forecast.forecastday[0].astro.sunrise}</td>
								<td style={{border:"1px solid black",padding:"5px"}}><h2>sunset :</h2> {data.forecast.forecastday[0].astro.sunset}</td>
								<td style={{border:"1px solid black",padding:"5px"}}><h2>Max Temp :</h2> {data.forecast.forecastday[0].day.maxtemp_c}</td>
								<td style={{border:"1px solid black",padding:"5px"}}><h2>Min Temp :</h2> {data.forecast.forecastday[0].day.mintemp_c}</td>
							</tr>
						</table>
					</div>
					<div className="forcast-details-explain">
						<table width="100%" border="1">
							<thead>
							<tr>
							<th style={{border:"1px solid black",padding:"5px"}}>Widgets</th>
							<th style={{border:"1px solid black",padding:"5px"}}>0:00 AM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>3:00 AM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>6:00 AM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>9:00 AM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>12:00 PM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>3:00 PM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>6:00 PM</th>
							<th style={{border:"1px solid black",padding:"5px"}}>9:00 PM</th>
							</tr>
							</thead>

							<tbody>
							<tr>
							<th>icon</th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[0].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[3].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[6].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[9].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[12].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[15].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[18].condition.icon}/></th>
							<th  style={{border:"1px solid black",padding:"5px"}}><img src={data.forecast.forecastday[0].hour[21].condition.icon}/></th>
							</tr>
							</tbody>
							<tbody>
							<tr>
							<th>Desc</th>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[0].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[3].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[6].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[9].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[12].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[15].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[18].condition.text}</td>
							<td  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[21].condition.text}</td>
							</tr>
							</tbody>

							<tbody>
							<tr>
							<th>Humidity</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[0].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[3].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[6].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[9].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[12].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[15].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[18].humidity}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[21].humidity}</th>
							</tr>
							</tbody>

							<tbody>
							<tr>
							<th>Temperature</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[0].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[3].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[6].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[9].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[12].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[15].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[18].temp_c}</th>
							<th  style={{border:"1px solid black",padding:"5px"}}>{data.forecast.forecastday[0].hour[21].temp_c}</th>
							</tr>
							</tbody>
						</table>
					</div>
					<div style={{color:"red",fontStyle:"italic"}}>Last updated on {data.current.last_updated}</div>
					</div>
			}else{
				res=<div>
						crashed
					</div>
			}
			return res;
		}		
}