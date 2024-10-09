const express = require('express');
const geoloc = require('../services/geoloc.service');

const router = express.Router();

router.get('/nearby-pickup-points', async (req, res) => {
    const { lat, lng } = req.query;


    try {
        const pickups = await geoloc.getNearbyPickupPoints(parseFloat(lat), parseFloat(lng));
        res.status(200).json(pickups);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error retrieving nearby pickup points' });
    }
});

module.exports = router;
