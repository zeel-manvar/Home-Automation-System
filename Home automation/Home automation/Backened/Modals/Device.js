const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    location: String,
    status: { type: String, default: "Off" },
    schedule: String,
});

module.exports = mongoose.model("Device", DeviceSchema);
