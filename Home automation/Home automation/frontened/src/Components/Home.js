import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to Home Automation</h1>
            <p>Manage your smart devices with ease.</p>
            
            <div className="instructions">
                <h2>How to Get Started:</h2>
                <ul>
                    <li>Login to your account or register if you're new.</li>
                    <li>Add your smart devices to manage them remotely.</li>
                    <li>Turn devices ON/OFF, schedule actions, and more.</li>
                </ul>
            </div>

            <div className="auth-buttons">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    );
};

export default Home;
