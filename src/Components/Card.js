import React from 'react'

export default function Card({
                                city, 
                                temperature, 
                                temperatureFeelsLike, 
                                humidity,
                                weather,
                                wind,
                                icon,
                                conversion,
                                temperatureUnit
                            }) {
    return (
        <>
          <div className="col-4 col-sm-8 col-md-8 col-lg-8 col-xl-10 col-xxl-10 align-items-center">
            <div className="card ">
                <div className="card-header">
                    App del clima
                </div>
                <div className="card-body">
                    <h5 className="card-title">Ciudad: {city}</h5>
                    <p className="card-text">
                        <span className="row">
                            <span><img src={icon} alt="Icon weather"/></span>
                            <span>Temperatura: {temperature}{temperatureUnit}</span> 
                            <span>Sensación Termica: {temperatureFeelsLike}{temperatureUnit}</span>
                            <span>Humedad: {humidity}</span>
                            <span>{weather}</span>
                            <span>Viento: {wind}</span>
                        </span> 
                        
                    </p>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={conversion}>°C / °F</button>
                </div>
            </div>
          </div>  
        </>
    )
}
