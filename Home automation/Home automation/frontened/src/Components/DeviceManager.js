
import React, { useState, useEffect } from "react";
import "../Style.css/Devicemgmt.css"; 
import { useNavigate } from "react-router-dom";


const DeviceManager = () => {
    const navigate = useNavigate();

    const [devices, setDevices] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [schedule, setSchedule] = useState("");
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

    const handleAddDevice = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const newDevice = { name, location };
            if (schedule) newDevice.schedule = schedule;

            const response = await fetch("http://localhost:5500/api/devices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newDevice),
            });

            const data = await response.json();
            if (response.ok) {
                setDevices([...devices, data.device]);
                setName("");
                setLocation("");
                setSchedule("");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Error adding device");
        }
    };

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
        <div className="device-manager">
            <h2>Device Manager</h2>

            {error && <p className="error-message">{error}</p>}

            {/* Add Device Form */}
            <form onSubmit={handleAddDevice} className="device-form">
                <input type="text" placeholder="Device Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <select value={location} onChange={(e) => setLocation(e.target.value)} required>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Garage">Garage</option>
                    <option value="Office">Office</option>
                </select>
                {/* <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required /> */}
                <input type="text" placeholder="Schedule (Optional)" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                <button type="submit">Add Device</button>
            </form>

            {/* Device Table */}
            {/* <table className="device-table">
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
            </table> */}
            <div onClick={() => navigate("/location")} style={{ cursor: "pointer", color: "blue" }}>
            {/* Want to see devices according to locations */}
            Your all devices are here
        </div>
        </div>
    );
};

export default DeviceManager;
