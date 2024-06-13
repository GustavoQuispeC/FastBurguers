import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Spinner from "../Spinner";

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

  const mapRef = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const restaurantMarkerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

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

  useEffect(() => {
    if (isLoaded && userLocation && mapRef.current) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map: mapRef.current,
        });
      } else {
        userMarkerRef.current.position = userLocation;
      }

      if (!restaurantMarkerRef.current) {
        restaurantMarkerRef.current =
          new google.maps.marker.AdvancedMarkerElement({
            position: restaurantLocation,
            map: mapRef.current,
          });
      }
    }
  }, [isLoaded, userLocation]);

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

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={restaurantLocation}
        zoom={10}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {userLocation && (
          <DirectionsService
            options={{
              destination: restaurantLocation,
              origin: userLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={directionsCallback}
          />
        )}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
      {distance && duration && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <p>Distancia: {distance}</p>
          <p>Duración estimada: {duration}</p>
        </div>
      )}
    </>
  ) : (
    <div>
      <Spinner />
    </div>
  );
};

export default MapWithDirections;
