import { LatLng, Marker as ObjectMarker } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

interface mapComponentProps {
  coordinates: LatLng;
  setCoordinates: (c: LatLng) => void;
  editMode: boolean;
}

function LocationMarker(props: mapComponentProps) {
  const map = useMap();
  const markerRef = useRef<ObjectMarker>(null);

  useEffect(() => {
    map.flyTo(props.coordinates);
  }, [map, props.coordinates]);

  const handleLocate = useMemo(() => {
    return () => {
      map.locate();
      map.on("locationfound", (e) => {
        props.setCoordinates(e.latlng);
        map.flyTo(e.latlng, 18);
      });
    };
  }, [map, props]);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          props.setCoordinates(marker.getLatLng());
        }
      },
    }),
    [props],
  );

  return (
    <>
      {props.editMode == true && (
        <div
          onClick={(e) => {
            handleLocate();
            e.stopPropagation();
          }}
          className="absolute right-2 top-2 z-[1000] flex items-center gap-2 rounded-lg bg-white p-2 font-semibold"
        >
          Use My Location <MapPin />
        </div>
      )}
      {props.coordinates && (
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={props.coordinates}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
}
export default function MapComponent(props: mapComponentProps) {
  return (
    <div className="h-80 min-w-80">
      <MapContainer
        center={[-6.1762581, 106.8229916]}
        zoom={13}
        scrollWheelZoom={true}
        className="z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          editMode={props.editMode}
          coordinates={props.coordinates}
          setCoordinates={props.setCoordinates}
        />
      </MapContainer>
    </div>
  );
}
