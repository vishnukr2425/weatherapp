import React, { useEffect, useState } from "react";
import "./style.css";
import cloudyDay from './img/cloudyDay.jpg';
import sunnyDay from './img/sunnyDay.jpg';
import rainyDay from './img/rainyDay.jpg';
import snowyDay from './img/snowyDay.jpg';
import smokeyDay from './img/smokeyDay.jpg';
import hazeDay from './img/hazeDay.jpg';
import fogyDay from './img/fogyDay.jpg';

const Temp=()=>{
    const [city, setCity]= useState();
    const [search, setSearch]= useState("Pune");
    const [dataInput, setDataInput]= useState("");
    const [bg, setBg]= useState(`url(${sunnyDay})`);
    var resurljson;
    
    useEffect( ()=>{
        const fetchApi= async ()=>{
            const loca= `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=ebc6671079bb56146e1a621168e8d2cc`;
            const res= await fetch(loca);
            const resjson= await res.json();
            const lati= resjson[0].lat;
            const long= resjson[0].lon;
           
            const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=ebc6671079bb56146e1a621168e8d2cc&units=metric `;
            // const url= `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2a98812b71d7b641a445b670989b7f4d&units=metric`
            const resurl= await fetch(url);
             resurljson= await resurl.json();
             setCity(resurljson);
             console.log(resurljson.cod);
             if(resurljson.weather[0].main=="Clouds"){
                setBg(`url(${cloudyDay})`);
               }
               else if(resurljson.weather[0].main=="Rain"){
                setBg(`url(${rainyDay})`);
               }
               else if(resurljson.weather[0].main=="Snow"){
                setBg(`url(${snowyDay})`);
               }
               else if(resurljson.weather[0].main=="Smoke"){
                setBg(`url(${smokeyDay})`);
               }
               else if(resurljson.weather[0].main=="Haze"){
                setBg(`url(${hazeDay})`);
               }
               else if(resurljson.weather[0].main=="Fog"){
                setBg(`url(${fogyDay})`);
               }
               else{
                setBg(`url(${sunnyDay})`);
               }
           


        }
        fetchApi();
    },[search])

    
const InputEvent=(event)=>{
    const value= event.target.value;
    setDataInput(value);
   }

const searchWeather=()=>{
       setSearch(dataInput);  
    }





    return (
        <div className="box" style={{backgroundImage: bg ,backgroundSize: "cover",height: "100vh", backgroundPosition: "center"}}>
            <div className="inputData">
                <input type="search" name="inputField" placeholder="Search City" onChange={InputEvent} />
                <button type="submit" onClick={searchWeather}>Search</button>
            </div>
           
            {!city ? (<p>No Data Found!</p>) 
            :
            (
                <div> 
                    <div className="location">
                       <h1>{search}</h1>
                    </div>
                    <div className="condition">
                       <h2>{city.weather[0].description}</h2>
                    </div>
                    <div className="tem">
                         <h2>{city.main.temp} °C</h2>
                    </div>
                   <div className="minmax">Min: {city.main.temp_min} °C | Max: {city.main.temp_max} °C</div>
                </div>
            )}
           


        </div>
    )
}

export default Temp;