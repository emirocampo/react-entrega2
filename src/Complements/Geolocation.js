let latitud;
let longitud;
function Geolacation() {
    
    if (! ("geolocation" in navigator) ) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}

	const onUbicacionConcedida = ubicacion => {
		console.log("Tengo la ubicación: ", ubicacion);
		const coordenadas = ubicacion.coords;
		latitud = coordenadas.latitude;
		longitud = coordenadas.longitude;
        return [latitud, longitud];
		
	}
	const onErrorDeUbicacion = err => {

		latitud = "Error obteniendo ubicación: " + err.message;
		longitud = "Error obteniendo ubicación: " + err.message;
		console.log("Error obteniendo ubicación: ", err);
        return [latitud, longitud];
	}

	const opcionesDeSolicitud = {
		enableHighAccuracy: true, // Alta precisión
		maximumAge: 0, // No queremos caché
		timeout: 5000 // Esperar solo 5 segundos
	};

	
	navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
    
}

export default Geolacation;