const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    orderstatus: {
        type: String,
        required: true
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shipment"
    }
});

const Ordermodel = mongoose.model("order", orderSchema);

module.exports = { Ordermodel };
