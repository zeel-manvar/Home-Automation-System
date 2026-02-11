const express = require("express");
const { getDevices, addDevice, updateDeviceStatus} = require("../Controllers/deviceController");
const authMiddleware = require("../Middleware/authmiddleware");
const deviceController = require("../Controllers/deviceController");

const router = express.Router();
router.get("/", authMiddleware, getDevices);
router.post("/", authMiddleware, addDevice);
router.patch("/:id", authMiddleware, updateDeviceStatus);
router.delete("/:id", deviceController.deleteDevice);


module.exports = router;
