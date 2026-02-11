const API_URL = "http://localhost:5500/api";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};
export const registerUser = async (userData) => { // ✅ Accept object
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    } catch (error) {
        console.error("❌ Registration Error:", error);
        return { error: error.message };
    }
};

// export const registerUser = async (name, email, password) => {
//     const response = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//     });
//     return response.json();
// };

export const fetchDevices = async (token) => {
    const response = await fetch(`${API_URL}/devices`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};
