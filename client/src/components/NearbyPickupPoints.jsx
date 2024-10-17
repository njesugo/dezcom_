import React, { useEffect, useState } from 'react';
import MapComponent from './MapContainer';
import { userRequest } from "../requestMethods";
const NearbyPickupPoints = ({setSelectedPoint}) => {
    const [userLocation, setUserLocation] = useState(null);
    const [pickupPoints, setPickupPoints] = useState([]);


    useEffect(() => {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error getting user location:", error);

                setUserLocation({ lat: 48.8566, lng: 2.3522 });
            }
        );
    }, []);

    useEffect(() => {
        // Fetch nearby pickup pooints once the user's location is available
        if (userLocation) {
            const fetchPickupPoints = async () => {
                try {
                    const response = await userRequest.get("/geoloc/nearby-pickup-points",{params: userLocation}) 
                    const data = await response.data;
                    const pps = data.map((it) => ({ lng: it.location.coordinates[0], lat: it.location.coordinates[1], ...it }))
                    setPickupPoints(pps);
                } catch (error) {
                    console.error("Error fetching pickupPoints:", error);
                }
            };

            fetchPickupPoints();
        }
    }, [userLocation]);

    return (
        <div>
            {userLocation && <MapComponent userLocation={userLocation} pickupPoints={pickupPoints} setSelectedPoint={setSelectedPoint} />}
        </div>
    );
};

export default NearbyPickupPoints;