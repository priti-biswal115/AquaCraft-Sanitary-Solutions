import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../api/customerApi";
import { useCustomer } from "../context/CustomerContext";

const SelectCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerOption, setSelectedCustomerOption] = useState("");

    const navigate = useNavigate();

    const { selectCustomer, clearCustomer } =
        useCustomer();

    useEffect(() => {
        loadCustomers();
        clearCustomer();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(
                "Error loading customers",
                error
            );
        }
    };

    const handleContinue = () => {
        if (!selectedCustomerOption) {
            alert("Please select a customer");
            return;
        }

        const customer = customers.find(
            (c) =>
                c.customerId ===
                Number(selectedCustomerOption)
        );

        if (!customer) {
            alert("Invalid customer selection");
            return;
        }

        selectCustomer(
            customer.customerId,
            customer.customerName
        );

        navigate("/generate-invoice");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                padding: "20px"
            }}
        >
            {/* Top Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "30px"
                }}
            >
                <button
                    onClick={() =>
                        navigate("/admin")
                    }
                    style={{
                        backgroundColor:
                            "#1976d2",
                        color: "#fff",
                        border: "none",
                        padding:
                            "10px 20px",
                        borderRadius:
                            "6px",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                   Admin
                </button>
            </div>

            {/* Center Card */}
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        backgroundColor:
                            "#ffffff",
                        padding: "30px",
                        borderRadius:
                            "10px",
                        boxShadow:
                            "0px 2px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    <h1
                        style={{
                            textAlign:
                                "center",
                            color:
                                "#1976d2",
                            marginBottom:
                                "10px"
                        }}
                    >
                        AquaCraft Sanitary
                        Solutions
                    </h1>

                    <p
                        style={{
                            textAlign:
                                "center",
                            marginBottom:
                                "25px"
                        }}
                    >
                        Select Customer
                    </p>

                    <select
                        value={
                            selectedCustomerOption
                        }
                        onChange={(e) =>
                            setSelectedCustomerOption(
                                e.target.value
                            )
                        }
                        style={{
                            width:
                                "100%",
                            padding:
                                "12px",
                            marginBottom:
                                "20px",
                            borderRadius:
                                "6px",
                            border:
                                "1px solid #ddd"
                        }}
                    >
                        <option value="">
                            Select Customer
                        </option>

                        {customers.map(
                            (
                                customer
                            ) => (
                                <option
                                    key={
                                        customer.customerId
                                    }
                                    value={
                                        customer.customerId
                                    }
                                >
                                    {
                                        customer.customerName
                                    }
                                </option>
                            )
                        )}
                    </select>

                    <button
                        type="button"
                        onClick={
                            handleContinue
                        }
                        style={{
                            width:
                                "100%",
                            padding:
                                "12px",
                            backgroundColor:
                                "#1976d2",
                            color:
                                "white",
                            border:
                                "none",
                            cursor:
                                "pointer",
                            borderRadius:
                                "5px",
                            fontWeight:
                                "600"
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectCustomer;