const mongoose = require('mongoose');

const pickupPointSchema = new mongoose.Schema({
    name: String,
    address: String,
    isStore: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Créer un index géospatial pour le champ 'location' pour permettre les requêtes géospatiales
pickupPointSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('PickupPoint', pickupPointSchema);
