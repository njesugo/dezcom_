const PickupPoint = require("../models/PickupPoint");

const getNearbyPickupPoints = async (userLat, userLng) => {
    const nearbyPickupPoints = await PickupPoint.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [userLng, userLat]  // Longitude, latitude de l'utilisateur
                },
                $maxDistance: 5000  // Rayon en mètres  5 km)
            }
        }
    }).limit(4);
    return nearbyPickupPoints;
};

module.exports = {
    getNearbyPickupPoints
}
