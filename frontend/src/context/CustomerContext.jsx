import React, { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedCustomerName, setSelectedCustomerName] = useState(null);

    const selectCustomer = (customerId, customerName) => {
        setSelectedCustomerId(customerId);
        setSelectedCustomerName(customerName);
    };

    const clearCustomer = () => {
        setSelectedCustomerId(null);
        setSelectedCustomerName(null);
    };

    return (
        <CustomerContext.Provider
            value={{
                selectedCustomerId,
                selectedCustomerName,
                selectCustomer,
                clearCustomer
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error(
            "useCustomer must be used within CustomerProvider"
        );
    }
    return context;
};
