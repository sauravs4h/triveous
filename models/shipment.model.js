const mongoose = require("mongoose");

let shipmentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    trackingNumber: String,
    shippingStatus: String,
    shippingAddress: {
        address: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    }
});

const ShipmentModel = mongoose.model("shipment", shipmentSchema);

module.exports = { ShipmentModel };
