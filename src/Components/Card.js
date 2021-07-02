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
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-5 align-items-center">
            <div className="card ">
                <div className="card-header">
                    App del clima
                </div>
                <div className="card-body">
                    <h5 className="card-title">Ciudad: {city}</h5>
                    <div className="card-text">
                        <div className="row justify-content-center align-items-center">
                            <div className="col text-center">
                                <img src={icon} alt="Icon weather"/>
                            </div>
                            <div className="col">
                                <div>Temperatura: {temperature}{temperatureUnit}</div> 
                                <div>Sensación Termica: {temperatureFeelsLike}{temperatureUnit}</div>
                                <div>Humedad: {humidity} %</div>
                                <div>{weather}</div>
                                <div>Viento: {wind} m/s</div>
                            </div>                           
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary mt-2" 
                        onClick={conversion}>°C / °F</button>
                </div>
            </div>
          </div>  
        </>
    )
}
