import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import styled from 'styled-components';

// Styled Components
const PPListContainer = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-left: 1px solid #ddd;
`;

const PPItem = styled.li`
  list-style: none;
  margin-bottom: 5px;
  padding: 5px;
  background-color: ${(props) => `${props.bg}`};
  border-radius: 5px;
  border: 1px solid #eee;
  cursor: pointer;
  h4 {
    margin: 0;
    font-size: 18px;
  }
  p {
    margin: 5px 0 0 0;
    font-size: 14px;
    color: #666;
  }
`;

const PPList = styled.ul`
  padding: 0;
  margin: 0;
`;


const MapComponent = ({ userLocation, pickupPoints, setSelectedPoint }) => {
    // Custom icon setup using Leaflet's Icon class
    const customIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [41, 41],
    });
    const customIcon2 = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [41, 41],
    });
    const defaultCenter = [userLocation.lat, userLocation.lng];

    const markerRefs = useRef([]);
    const [selectedIndex, setSelectedIndex] = useState()

    const onSelect = (index) => {
        if (markerRefs.current[index]) markerRefs.current[index].openPopup()
        setSelectedPoint(pickupPoints[index])
        setSelectedIndex(index)
    }

    return (
        <div>
            <PPListContainer>
                <h2>Points de retrait à proximité</h2>
                <PPList>
                    {pickupPoints.map((pp, i) => (
                        <PPItem key={pp._id} color={pp.color} onClick={() => onSelect(i)} bg = {selectedIndex==i?"#aaee99":"white"} >
                            <h4>{pp.name}</h4>
                            <p>{pp.address}</p>
                        </PPItem>
                    ))}
                </PPList>
            </PPListContainer>
            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={defaultCenter} icon={customIcon} >
                    <Popup>Vous êtes ici</Popup>
                </Marker>
                {pickupPoints.map((pp, index) => (
                    <Marker key={pp._id} position={[pp.lat, pp.lng]} icon={customIcon2} ref={(el) => { if (el) markerRefs.current[index] = el; }} >
                        <Popup>{pp.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>

    );
};

export default MapComponent;