import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { login as loginService } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const data = await loginService(email, password);

            login(data.access, data.refresh);

            toast.success("Welcome back!");

            navigate("/products");

        }

        catch (error) {

            console.error(error);

            toast.error("Invalid email or password");

        }

    }

    return (

        <div className="login-page">

            <div className="login-box">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                    <button type="submit">

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;