import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#131921",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px"
              },
              success: {
                style: {
                  background: "#ffd814",
                  color: "#000"
                }
              }
            }}
          />

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);