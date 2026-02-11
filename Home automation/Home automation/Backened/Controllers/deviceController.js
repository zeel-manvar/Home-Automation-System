const deviceService = require("../Services/deviceServices");

exports.getDevices = async (req, res) => {
    try {
        const devices = await deviceService.getDevicesByUser(req.user.userId);
        res.json(devices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addDevice = async (req, res) => {
    try {
        const { name, location, schedule } = req.body;
        const device = await deviceService.addDevice(req.user.userId, name, location, schedule);
        res.status(201).json({ message: "Device added successfully!", device });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDeviceStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const device = await deviceService.updateDeviceStatus(req.params.id, status);
        res.json({ message: "Device updated successfully!", device });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deleteDevice = async (req, res) => {
    try {
        const deletedDevice = await deviceService.deleteDevice(req.params.id);

        if (!deletedDevice) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.json({ message: "Device deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting device", error: err.message });
    }
};
