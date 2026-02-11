import React, { useState, useEffect } from "react";
import '../Style.css/Location.css'
const UserDevicesByLocation = () => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5500/api/devices", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();
                if (response.ok) {
                    setDevices(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Error fetching devices");
            }
        };

        fetchDevices();
    }, []);

    // Group devices by location
    const groupedDevices = devices.reduce((acc, device) => {
        const { location } = device;
        if (!acc[location]) {
            acc[location] = [];
        }
        acc[location].push(device);
        return acc;
    }, {});
    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5500/api/devices/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();
            if (response.ok) {
                setDevices(devices.map((device) => (device._id === id ? { ...device, status } : device)));
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Error updating device status");
        }
    };
    const handleDeleteDevice = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5500/api/devices/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const data = await response.json();
            console.log("Delete Response:", data); // Log response
    
            if (response.ok) {
                setDevices(devices.filter((device) => device._id !== id));
            } else {
                setError(data.message || "Error deleting device");
            }
        } catch (err) {
            setError("Error deleting device");
        }
    };
    return (
        <div className="user-devices">
<div>
     {/* Device Table */}
            <table className="device-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Schedule</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device._id}>
                            <td>{device.name}</td>
                            <td>{device.location}</td>
                            <td>{device.schedule || "No Schedule"}</td>
                            <td>{device.status || "Unknown"}</td>
                            <td>
                                <button className="activate" onClick={() => handleUpdateStatus(device._id, "Active")}>
                                ✅ 	
                                </button>
                                <button className="deactivate" onClick={() => handleUpdateStatus(device._id, "Inactive")}>
                                ⛔
                                </button>
                                <button className="delete" onClick={() => handleDeleteDevice(device._id)}>
                                🗑️ 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
</div>
            {/* {error && <p className="error-message">{error}</p>} */}

            {/* {Object.keys(groupedDevices).map((location) => (
                <div key={location} className="location-group">
                    <h3>{location}</h3>
                    <ul>
                        {groupedDevices[location].map((device) => (
                            <li key={device._id}>
                                <strong>{device.name}</strong> - {device.status || "Unknown"}
                            </li>
                        ))}
                    </ul>
                </div>
            ))} */}
        </div>
    );
};

export default UserDevicesByLocation;
