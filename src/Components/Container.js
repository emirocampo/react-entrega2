import React, { useState } from 'react'
import Card  from "./Card";
import { useEffect } from "react"
import Spinner from './Spinner' 


export default function Container() {
    const [coordLatitude, setCoordLatitude] = useState("");
    const [coordLongitude, setCoordLongitude] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [temperature, setTemperature] = useState("");
    const [temperatureFeelsLike, setTemperatureFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");
    const [weatherMain, setWeatherMain] = useState("");
    const [weatherDescription, setWeatherDescription] = useState("");
    const [wind, setWind] = useState("");
    const [icon, setIcon] = useState("")
    const [isCelsius, setIsCelsius] = useState(true)
    const [temperatureUnit, setTemperatureUnit] = useState(" °C")
    const [statusCode, setStatutsCode] = useState("")
    const [color, setColor] = useState("#000000");
    

    const setSiteData = (data) =>{        
        setCity(data.name);        
        setCountry(data.sys.country);        
        setTemperature(data.main.temp);        
        setTemperatureFeelsLike(data.main.feels_like);        
        setHumidity(data.main.humidity);
        setWeatherMain(data.weather[0].main);        
        setWeatherDescription(data.weather[0].description);        
        setWind(data.wind.speed);
        setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        setStatutsCode(data.cod)
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
            alert(`ERROR(${err.code}): ${err.message} - RECARGA LA PAGINA`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
          
      }, []);

    useEffect(() => {
        if(coordLatitude && coordLongitude){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordLatitude}&lon=${coordLongitude}&appid=7ddfea8617fa720d4d15916bb1503482&units=metric&lang=es`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setSiteData(data)
                });
        }
        
        
    }, [coordLatitude, coordLongitude])

    useEffect(() => {
        if( !(isCelsius) ){
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

    useEffect(() => {
        setStatutsCode( prevState => { 
            return prevState })
        
    }, [statusCode])

    useEffect(() => {
        switch (weatherMain) {
            case "Thunderstorm":
                setColor("#884ea0");
                break;
            case "Drizzle":
                setColor("#d4e6f1");
                break;
            case "Rain":
                setColor("#5499c7");
                break;
            case "Snow":
                setColor("#f2f4f4");
                break;
            case "Atmosphere":
                setColor("#808b96");
                break;
            case "Clear":
                setColor("#3498db");
                break;
            case "Clouds":
                setColor("#909497");
                break;
        
            default:
                setColor("#ffffff");
                break;
        }
        
        
    }, [weatherMain])

    const toCelsiusFarenheit = () =>{
        setIsCelsius( (isCelsius ? false : true) )
    }

    if (statusCode === 200) {
        return (
            <>
              <div className="container" style={{backgroundColor:color}}>
                <div className="row vh-100 justify-content-center align-items-center">
                    {/* <h1>OJO CON EL CONSOLE.LOG DEL FETCH!!!</h1>                 */}
                    <Card 
                        city={city}
                        country={country} 
                        temperature={temperature}
                        temperatureFeelsLike={temperatureFeelsLike}
                        humidity={humidity}
                        weatherMain={weatherMain}
                        weatherDescription={weatherDescription}
                        wind={wind}
                        icon={icon}
                        conversion={toCelsiusFarenheit}
                        temperatureUnit={temperatureUnit}
                        
                    />
                </div>
              </div>  
            </>
        )
        
    } else {
        return (
            <>
                <div className="container">
                    <div className=" row vh-100 justify-content-center align-items-center">
                        <div className="col">
                            <div className="card">
                                <div className="card-body text-center">
                                    <Spinner />
                                </div>
                            </div>
                        </div>                        
                    </div>
              </div>                
            </>            
            )
    }

    
}
