import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "330px",
};

const restaurantLocation = {
  lat: -3.745,
  lng: -38.523,
};

const MapWithDirections: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const { location } = JSON.parse(storedLocation);
      setUserLocation(location);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario", error);
        }
      );
    }
  }, []);

  const directionsCallback = useCallback((response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setDistance(route.distance.text);
        setDuration(route.duration.text);
      } else {
        console.error("Error fetching directions", response);
      }
    }
  }, []);

  const handleLoad = () => {
    setMapLoaded(true);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      onLoad={handleLoad}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={restaurantLocation}
        zoom={10}
      >
        {userLocation && mapLoaded && (
          <>
            <Marker position={userLocation} />
            <Marker position={restaurantLocation} />
            <DirectionsService
              options={{
                destination: restaurantLocation,
                origin: userLocation,
                travelMode: (window as any).google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                }}
              />
            )}
          </>
        )}
      </GoogleMap>
      {distance && duration && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <p>Distancia: {distance}</p>
          <p>Duración estimada: {duration}</p>
        </div>
      )}
    </LoadScript>
  );
};

export default MapWithDirections;
