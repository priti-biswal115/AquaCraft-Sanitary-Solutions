import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../api/customerApi";

function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        address: "",
        gstNo: ""
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateCustomer(
                    editingId,
                    formData
                );
            } else {
                await createCustomer(
                    formData
                );
            }

            setShowModal(false);

            setEditingId(null);

            setFormData({
                customerName: "",
                phone: "",
                address: "",
                gstNo: ""
            });

            loadCustomers();
        } catch (error) {
            console.error(error);
            alert("Operation Failed");
        }
    };

    const handleEdit = (customer) => {
        setEditingId(
            customer.customerId
        );

        setFormData({
            customerName:
                customer.customerName,
            phone: customer.phone,
            address:
                customer.address,
            gstNo: customer.gstNo
        });

        setShowModal(true);
    };

    const handleDelete = async (
        id
    ) => {
        const result =
            window.confirm(
                "Delete customer?"
            );

        if (!result) return;

        await deleteCustomer(id);

        loadCustomers();
    };

    const filteredCustomers =
        customers.filter((customer) =>
            customer.customerName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div style={{
                padding: "30px",
                background:
                    "#f4f6f8",
                minHeight: "100vh"
            }}
        >
            <button onClick={() =>
                navigate("/admin")
            }
                style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                ← Back to Admin
            </button>

            <div style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        "20px"
                }}
            >
                <h1>
                    Customer Management
                </h1>

                <button
                    onClick={() => {
                        setEditingId(
                            null
                        );

                        setFormData({
                            customerName:
                                "",
                            phone: "",
                            address:
                                "",
                            gstNo: ""
                        });

                        setShowModal(
                            true
                        );
                    }}
                    style={{
                        background:
                            "#1976d2",
                        color:
                            "white",
                        border:
                            "none",
                        padding:
                            "10px 20px",
                        borderRadius:
                            "6px",
                        cursor:
                            "pointer"
                    }}
                >
                    + Add Customer
                </button>
            </div>

            <input
                type="text"
                placeholder="Search Customer..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                style={{
                    width: "350px",
                    padding: "10px",
                    border:
                        "1px solid #ccc",
                    borderRadius:
                        "6px",
                    marginBottom:
                        "20px"
                }}
            />

            <table style={{
                    width: "100%",
                    borderCollapse:
                        "collapse",
                    background:
                        "white"
                }}
            >
                <thead>
                    <tr style={{
                            background:
                                "#1976d2",
                            color:
                                "white"
                        }}
                    >
                        <th style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            #
                        </th>

                        <th  style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Customer Name
                        </th>

                        <th style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Phone
                        </th>

                        <th  style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Address
                        </th>

                        <th style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            GST
                        </th>

                        <th style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCustomers.map(
                        (
                            customer,
                            index
                        ) => (
                            <tr
                                key={
                                    customer.customerId
                                }
                            >
                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    {index + 1}
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    {
                                        customer.customerName
                                    }
                                </td>

                                <td style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    {
                                        customer.phone
                                    }
                                </td>

                                <td style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    {
                                        customer.address
                                    }
                                </td>

                                <td style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    {
                                        customer.gstNo
                                    }
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        border:
                                            "1px solid #ccc",
                                        padding:
                                            "10px"
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                customer
                                            )
                                        }
                                        style={{
                                            background:
                                                "#1976d2",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            padding:
                                                "5px 12px",
                                            marginRight:
                                                "8px",
                                            cursor:
                                                "pointer"
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                customer.customerId
                                            )
                                        }

                                        style={{
                                            background:
                                                "#d32f2f",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            padding:
                                                "5px 12px",
                                            cursor:
                                                "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            {showModal && (
                <div style={{
                        position:
                            "fixed",
                        top: 0,
                        left: 0,
                        width:
                            "100%",
                        height:
                            "100%",
                        background:
                            "rgba(0,0,0,0.5)",
                        display:
                            "flex",
                        justifyContent:
                            "center",
                        alignItems:
                            "center"
                    }}
                >
                    <div style={{
                            background:
                                "white",
                            padding:
                                "25px",
                            borderRadius:
                                "10px",
                            width:
                                "400px"
                        }}
                    >
                        <h2>
                            {editingId
                                ? "Edit Customer"
                                : "Add Customer"}
                        </h2>

                        <input
                            name="customerName"
                            placeholder="Customer Name"
                            value={
                                formData.customerName
                            }
                            onChange={
                                handleChange
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "10px"
                            }}
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            value={
                                formData.phone
                            }
                            onChange={
                                handleChange
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "10px"
                            }}
                        />

                        <input
                            name="address"
                            placeholder="Address"
                            value={
                                formData.address
                            }
                            onChange={
                                handleChange
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "10px"
                            }}
                        />

                        <input
                            name="gstNo"
                            placeholder="GST Number"
                            value={
                                formData.gstNo
                            }
                            onChange={
                                handleChange
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "15px"
                            }}
                        />

                        <button
                            onClick={
                                handleSubmit
                            }
                        >
                            Save
                        </button>

                        <button
                            onClick={() =>
                                setShowModal(
                                    false
                                )
                            }
                            style={{
                                marginLeft:
                                    "10px"
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customers;