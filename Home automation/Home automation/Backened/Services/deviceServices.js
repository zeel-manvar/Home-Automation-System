const Device = require("../Modals/Device");

exports.getDevicesByUser = async (userId) => {
    return await Device.find({ userId });
};

exports.addDevice = async (userId, name, location, schedule) => {
    const device = new Device({ userId, name, location, schedule });
    await device.save();
    return device;
};

exports.updateDeviceStatus = async (deviceId, status) => {
    return await Device.findByIdAndUpdate(deviceId, { status }, { new: true });
};

exports.deleteDevice = async (deviceId) => {
    return await Device.findByIdAndDelete(deviceId);
};