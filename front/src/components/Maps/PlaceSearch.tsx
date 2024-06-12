import React, { useRef } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

interface PlaceSearchBoxProps {
  onPlaceSelected: (
    location: { lat: number; lng: number },
    address: string
  ) => void;
}

const PlaceSearchBox: React.FC<PlaceSearchBoxProps> = ({ onPlaceSelected }) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        const address = place.formatted_address || "";
        onPlaceSelected(location, address);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Busca tu ubicación"
          className="p-2 border rounded w-full"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlaceSearchBox;
