import React from "react";
import { Routes, Route } from "react-router-dom";

import { CustomerProvider } from "./context/CustomerContext";

import ProtectedRoute from "./components/ProtectedRoute";

import SelectCustomer from "./pages/SelectCustomer";
import GenerateInvoice from "./pages/GenerateInvoice";
import InvoicePreview from "./pages/InvoicePreview";

import Admin from "./pages/Admin";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import BusinessSettings from "./pages/BusinessSettings";

function App() {
    return (
        <CustomerProvider>
            <Routes>
                <Route
                    path="/"
                    element={<SelectCustomer />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                {/* Customers */}
                <Route
                    path="/customers"
                    element={<Customers />}
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={<Products />}
                />

                {/* Pricing */}
                <Route
                    path="/pricing"
                    element={<Pricing />}
                />

                {/* Business Settings */}
                <Route
                    path="/business-settings"
                    element={<BusinessSettings />}
                />

                {/* Invoice */}
                <Route
                    path="/generate-invoice"
                    element={
                        <ProtectedRoute>
                            <GenerateInvoice />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invoice-preview/:invoiceId"
                    element={
                        <ProtectedRoute>
                            <InvoicePreview />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </CustomerProvider>
    );
}

export default App;