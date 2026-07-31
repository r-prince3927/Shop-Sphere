import "@fontsource/inter";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

                <App />

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);