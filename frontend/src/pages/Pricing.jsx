import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getPricing,
    createPricing,
    updatePricing,
    deletePricing
} from "../api/pricingApi";

import {
    getCustomers
} from "../api/customerApi";

import {
    getProducts
} from "../api/productApi";

function Pricing() {
    const navigate = useNavigate();
    const [pricing, setPricing] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            customerId: "",
            productId: "",
            rate: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const pricingData =
                await getPricing();

            const customerData =
                await getCustomers();

            const productData =
                await getProducts();

            setPricing(pricingData);
            setCustomers(customerData);
            setProducts(productData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(
            item.pricingId
        );

        setFormData({
            customerId:
                item.customerId,
            productId:
                item.productId,
            rate:
                item.rate
        });

        setShowModal(true);
    };

    const handleDelete = async (
        id
    ) => {
        const confirmDelete =
            window.confirm(
                "Delete pricing?"
            );

        if (!confirmDelete) return;

        await deletePricing(id);

        loadData();
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updatePricing(
                    editingId,
                    {
                        pricingId: editingId,
                        customerId:
                            Number(
                                formData.customerId
                            ),
                        productId:
                            Number(
                                formData.productId
                            ),
                        rate:
                            Number(
                                formData.rate
                            )
                    }
                );
            } else {
                await createPricing({
                    customerId:
                        Number(formData.customerId),
                    productId:
                        Number(formData.productId),
                    rate:
                        Number(formData.rate)
                });
            }

            setShowModal(false);

            setEditingId(null);

            setFormData({
                customerId: "",
                productId: "",
                rate: ""
            });

            await loadData();
        } catch (error) {
            console.error(error);

            alert(
                JSON.stringify(
                    error?.response?.data ??
                    error?.message
                )
            );
        }
    };

    const filteredPricing =
        pricing.filter(
            (item) =>
                item.customerName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.productName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <div
            style={{
                padding: "30px",
                backgroundColor:
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
            <div
                style={{
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
                    Pricing Management
                </h1>

                <button
                    onClick={() => {
                        setEditingId(
                            null
                        );

                        setFormData({
                            customerId:
                                "",
                            productId:
                                "",
                            rate: ""
                        });

                        setShowModal(
                            true
                        );
                    }}
                    style={{
                        background:
                            "#1976d2",
                        color:
                            "#fff",
                        border:
                            "none",
                        borderRadius:
                            "6px",
                        padding:
                            "10px 16px",
                        cursor:
                            "pointer"
                    }}
                >
                    + Add Pricing
                </button>
            </div>

            <input
                type="text"
                placeholder="Search Customer or Product..."
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

            <table
                style={{
                    width: "100%",
                    borderCollapse:
                        "collapse",
                    backgroundColor:
                        "#fff"
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor:
                                "#1976d2",
                            color: "#fff"
                        }}
                    >
                        <th
                            style={{
                                padding:
                                    "12px",
                                border:
                                    "1px solid #ddd"
                            }}
                        >
                            #
                        </th>

                        <th
                            style={{
                                padding:
                                    "12px",
                                border:
                                    "1px solid #ddd"
                            }}
                        >
                            Customer
                        </th>

                        <th
                            style={{
                                padding:
                                    "12px",
                                border:
                                    "1px solid #ddd"
                            }}
                        >
                            Product
                        </th>

                        <th
                            style={{
                                padding:
                                    "12px",
                                border:
                                    "1px solid #ddd"
                            }}
                        >
                            Rate
                        </th>

                        <th
                            style={{
                                padding:
                                    "12px",
                                border:
                                    "1px solid #ddd"
                            }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPricing.map(
                        (
                            item,
                            index
                        ) => (
                            <tr
                                key={
                                    item.pricingId
                                }
                            >
                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ddd"
                                    }}
                                >
                                    {index + 1}
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ddd"
                                    }}
                                >
                                    {
                                        item.customerName
                                    }
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ddd"
                                    }}
                                >
                                    {
                                        item.productName
                                    }
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ddd"
                                    }}
                                >
                                    ₹{item.rate}
                                </td>

                                <td
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ddd"
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                item
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
                                                item.pricingId
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
                <div
                    style={{
                        position:
                            "fixed",
                        inset: 0,
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
                    <div
                        style={{
                            background:
                                "#fff",
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
                                ? "Edit Pricing"
                                : "Add Pricing"}
                        </h2>

                        <select
                            value={
                                formData.customerId
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    customerId:
                                        e.target
                                            .value
                                })
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "10px"
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

                        <select
                            value={
                                formData.productId
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    productId:
                                        e.target
                                            .value
                                })
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    "10px"
                            }}
                        >
                            <option value="">
                                Select Product
                            </option>

                            {products.map(
                                (
                                    product
                                ) => (
                                    <option
                                        key={
                                            product.productId
                                        }
                                        value={
                                            product.productId
                                        }
                                    >
                                        {
                                            product.productName
                                        }
                                    </option>
                                )
                            )}
                        </select>

                        <input
                            type="number"
                            placeholder="Rate"
                            value={
                                formData.rate
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rate:
                                        e.target
                                            .value
                                })
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

export default Pricing;