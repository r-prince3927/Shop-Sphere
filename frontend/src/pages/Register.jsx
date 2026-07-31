import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            toast.error("Please fill all required fields");
            return;

        }

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");
            return;

        }

        try {

            setLoading(true);

            await register(
                username,
                email,
                phoneNumber,
                password
            );

            toast.success("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            console.error(error);

            toast.error("Registration Failed");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex justify-center py-20">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-8 text-center text-3xl font-bold">

                    Create Account

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number (Optional)"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                    >

                        {loading ? "Creating Account..." : "Register"}

                    </button>

                </form>

                <p className="mt-6 text-center">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;