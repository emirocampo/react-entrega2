import React, { useState } from 'react'
import Card  from "./Card";
import { useEffect } from "react"


export default function Container() {
    const [coordLatitude, setCoordLatitude] = useState("");
    const [coordLongitude, setCoordLongitude] = useState("");
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [temperatureFeelsLike, setTemperatureFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");
    const [weather, setWeather] = useState("");
    const [wind, setWind] = useState("");
    const [icon, setIcon] = useState("")
    const [isCelsius, setIsCelsius] = useState(true)
    const [temperatureUnit, setTemperatureUnit] = useState(" °C")

    const setSiteData = (data) =>{        
        setCity(data.name+" - "+data.sys.country);        
        setTemperature(data.main.temp);        
        setTemperatureFeelsLike(data.main.feels_like);        
        setHumidity(data.main.humidity+" %");        
        setWeather(data.weather[0].main+" : "+data.weather[0].description);        
        setWind(data.wind.speed+" m/s");
        setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    }

    useEffect(() => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
            setCoordLatitude(crd.latitude)
            setCoordLongitude(crd.longitude)
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
          
      }, []);

    useEffect(() => {
        if(coordLatitude && coordLongitude){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordLatitude}&lon=${coordLongitude}&appid=7ddfea8617fa720d4d15916bb1503482&units=metric&lang=es`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setSiteData(data)
                });
        }
        
        
    }, [coordLatitude, coordLongitude])

    useEffect(() => {
        if(! isCelsius){
            setTemperature( prevState => {
                    let newState =  (prevState * 9/5) + 32 ;
                    return newState.toFixed(2);
            })
            setTemperatureFeelsLike( prevState => {
                    let newState =  (prevState * 9/5) + 32 ;
                    return newState.toFixed(2);
            })
            setTemperatureUnit(" °F")
        }else{
            setTemperature( prevState => {
                let newState = (prevState - 32) * 5/9;
                return newState.toFixed(2);
            })
            setTemperatureFeelsLike( prevState => {
                let newState = (prevState - 32) * 5/9;
                return newState.toFixed(2);
            })
            setTemperatureUnit(" °C")
        }        
    }, [isCelsius])

    const toCelsuisFarenheit = () =>{
        setIsCelsius(isCelsius ? false : true)
    }

    return (
        <>
          <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <Card 
                    city={city} 
                    temperature={temperature}
                    temperatureFeelsLike={temperatureFeelsLike}
                    humidity={humidity}
                    weather={weather}
                    wind={wind}
                    icon={icon}
                    conversion = {toCelsuisFarenheit}
                    temperatureUnit={temperatureUnit}
                />
            </div>
          </div>  
        </>
    )
}
