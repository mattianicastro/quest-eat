import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
    position: [number, number];
    popupText: string;
}

const icon = L.icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
    iconRetinaUrl: "/marker-icon-2x.png",
});

const Map: React.FC<MapProps> = ({ position, popupText }) => {
    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
                <Popup>{popupText}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
