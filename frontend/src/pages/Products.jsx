import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../api/productApi";

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            productType: "",
            productName: "",
            hsnCode: ""
        });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateProduct(
                    editingId,
                    formData
                );
            } else {
                await createProduct(
                    formData
                );
            }

            setShowModal(false);

            setEditingId(null);

            setFormData({
                productType: "",
                productName: "",
                hsnCode: ""
            });

            loadProducts();
        } catch {
            alert("Operation Failed");
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.productId);

        setFormData({
            productType:
                product.productType,
            productName:
                product.productName,
            hsnCode:
                product.hsnCode
        });

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Delete Product?"
            )
        )
            return;

        await deleteProduct(id);

        loadProducts();
    };

    const filteredProducts =
        products.filter((product) =>
            product.productName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div
            style={{
                padding: "30px",
                background: "#f4f6f8",
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
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >
                <h1>
                    Product Management
                </h1>

                <button
                    onClick={() => {
                        setEditingId(null);

                        setFormData({
                            productType: "",
                            productName: "",
                            hsnCode: ""
                        });

                        setShowModal(true);
                    }}
                    style={{
                        background:
                            "#1976d2",
                        color: "white",
                        border: "none",
                        padding:
                            "10px 20px",
                        borderRadius:
                            "6px",
                        cursor: "pointer"
                    }}
                >
                    + Add Product
                </button>
            </div>

            <input
                type="text"
                placeholder="Search Product..."
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
                    background:
                        "white"
                }}
            >
                <thead>
                    <tr
                        style={{
                            background:
                                "#1976d2",
                            color:
                                "white"
                        }}
                    >
                        <th
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            #
                        </th>

                        <th
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Product Type
                        </th>

                        <th
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            Product Name
                        </th>

                        <th
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "12px"
                            }}
                        >
                            HSN Code
                        </th>

                        <th
                            style={{
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
                    {filteredProducts.map(
                        (
                            product,
                            index
                        ) => (
                            <tr
                                key={
                                    product.productId
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
                                        product.productType
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
                                    {
                                        product.productName
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
                                    {
                                        product.hsnCode
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
                                                product
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
                                                product.productId
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
                    <div
                        style={{
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
                                ? "Edit Product"
                                : "Add Product"}
                        </h2>

                        <input
                            name="productType"
                            placeholder="Product Type"
                            value={
                                formData.productType
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
                            name="productName"
                            placeholder="Product Name"
                            value={
                                formData.productName
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
                            name="hsnCode"
                            placeholder="HSN Code"
                            value={
                                formData.hsnCode
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

export default Products;