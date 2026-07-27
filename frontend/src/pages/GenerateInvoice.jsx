import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerPricing } from "../api/pricingApi";
import { saveInvoice } from "../api/invoiceApi";
import { useCustomer } from "../context/CustomerContext";

const GenerateInvoice = () => {
    const navigate = useNavigate();
    const { selectedCustomerId, selectedCustomerName } = useCustomer();

    const [pricingData, setPricingData] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [invoiceItems, setInvoiceItems] = useState([]);

    useEffect(() => {
        if (!selectedCustomerId) {
            navigate("/", { replace: true });
            return;
        }

        loadPricing();
    }, [selectedCustomerId, navigate]);


    const loadPricing = async () => {
        try {
            const data = await getCustomerPricing(selectedCustomerId);
            setPricingData(data);
        } catch (error) {
            console.error("Error loading pricing:", error);
        }
    };

    const productTypes = useMemo(() => {
        return [
            ...new Set(
                pricingData.map(
                    (item) => item.productName.split(" ")[0]
                )
            )
        ];
    }, [pricingData]);

    const filteredProducts = pricingData.filter((item) =>
        item.productName.startsWith(selectedType)
    );

    const handleAddProduct = () => {
        if (!selectedProductId) {
            alert("Please select a product");
            return;
        }

        const existing = invoiceItems.find(
            (item) => item.productId === Number(selectedProductId)
        );

        if (existing) {
            alert("Product is already added in the invoice");
            return;
        }

        const product = pricingData.find(
            (item) => item.productId === Number(selectedProductId) );

        if (!product) return;

        setInvoiceItems([
            ...invoiceItems,
            {
                productId: product.productId,
                productName: product.productName,
                rate: product.rate,
                quantity: 1,
                amount: product.rate
            }
        ]);

        setSelectedProductId("");
    };

    const increaseQuantity = (productId) => {
        const updatedItems = invoiceItems.map((item) => {
            if (item.productId === productId) {
                const quantity = item.quantity + 1;

                return {
                    ...item,
                    quantity,
                    amount: quantity * item.rate
                };
            }

            return item;
        });

        setInvoiceItems(updatedItems);
    };

    const decreaseQuantity = (productId) => {
        const updatedItems = invoiceItems.map((item) => {
            if (
                item.productId === productId &&
                item.quantity > 1
            ) {
                const quantity = item.quantity - 1;

                return {
                    ...item,
                    quantity,
                    amount: quantity * item.rate
                };
            }

            return item;
        });

        setInvoiceItems(updatedItems);
    };

    const removeProduct = (productId) => {
        setInvoiceItems(
            invoiceItems.filter(
                (item) => item.productId !== productId
            )
        );
    };

    const subTotal = invoiceItems.reduce(
        (total, item) => total + item.amount,
        0
    );

    const gst = Number((subTotal * 0.05).toFixed(2));

    const grandTotal = Number(
        (subTotal + gst).toFixed(2)
    );

    const handleGenerateInvoice = async () => {
        if (invoiceItems.length === 0) {
            alert("Please add at least one product");
            return;
        }

        try {
            const invoiceData = {
                customerId: selectedCustomerId,
                subTotal,
                gstAmount: gst,
                grandTotal,
                items: invoiceItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.amount
                }))
            };

            const response = await saveInvoice(invoiceData);

            if (response && response.invoiceId) {
                navigate(`/invoice-preview/${response.invoiceId}`);
            } else {
                alert("Failed to save invoice. Please try again.");
            }
        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("Failed to save invoice. Please try again.");
        }
    };

    const handleBack = () => {
        navigate("/", { replace: true });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                padding: "20px"
            }}
        >
            <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    padding: "25px",
                    borderRadius: "12px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)"
                }}
            >
                <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "25px"
                    }}
                >
                    <button
                        onClick={handleBack}
                        style={{
                            padding: "10px 18px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            fontWeight: "600",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor =
                                "#f3f4f6";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor =
                                "#ffffff";
                        }}
                    >
                        ← Back
                    </button>

                    <div>
                        <h1 style={{
                                margin: 0
                            }}
                        >
                            Generate Invoice
                        </h1>

                        <p style={{
                                margin: "5px 0 0",
                                color: "#6b7280"
                            }}
                        >
                            Customer : {selectedCustomerName}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap"
                    }}
                >
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(
                                e.target.value
                            );
                            setSelectedProductId("");
                        }}
                        style={{
                            padding: "12px",
                            minWidth: "220px",
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                        }}
                    >
                        <option value="">
                            Select Product Type
                        </option>

                        {productTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedProductId}
                        onChange={(e) =>
                            setSelectedProductId(
                                e.target.value
                            )
                        }
                        style={{
                            padding: "12px",
                            minWidth: "250px",
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                        }}
                    >
                        <option value="">
                            Select Product
                        </option>

                        {filteredProducts.map(
                            (product) => (
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

                    <button
                        onClick={handleAddProduct}
                        style={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Add Product
                    </button>
                </div>

                {invoiceItems.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "3fr 1fr 1.5fr 1fr 60px",
                            marginTop: "35px",
                            marginBottom: "15px",
                            fontWeight: "bold"
                        }}
                    >
                        <div>Product</div>
                        <div>Rate</div>
                        <div>Quantity</div>
                        <div>Amount</div>
                        <div></div>
                    </div>
                )}

                {invoiceItems.map((item) => (
                    <div
                        key={item.productId}
                        style={{
                            backgroundColor: "#ffffff",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "16px",
                            boxShadow:
                                "0 3px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "3fr 1fr 1.5fr 1fr 60px",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    {item.productName}
                                </div>
                            </div>

                            <div>₹{item.rate}</div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "10px"
                                }}
                            >
                                <button
                                    onClick={() =>
                                        decreaseQuantity(
                                            item.productId
                                        )
                                    }
                                    style={{
                                        width: "36px",
                                        height:
                                            "36px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "8px",
                                        backgroundColor:
                                            "#1976d2",
                                        color: "#fff",
                                        cursor:
                                            "pointer",
                                        fontWeight:
                                            "bold"
                                    }}
                                >
                                    -
                                </button>

                                <strong>
                                    {
                                        item.quantity
                                    }
                                </strong>

                                <button
                                    onClick={() =>
                                        increaseQuantity(
                                            item.productId
                                        )
                                    }
                                    style={{
                                        width: "36px",
                                        height:
                                            "36px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "8px",
                                        backgroundColor:
                                            "#1976d2",
                                        color: "#fff",
                                        cursor:
                                            "pointer",
                                        fontWeight:
                                            "bold"
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <div
                                style={{
                                    fontWeight: "600",
                                    color: "#1976d2"
                                }}
                            >
                                ₹{item.amount}
                            </div>

                            <div>
                                <button
                                    onClick={() =>
                                        removeProduct(
                                            item.productId
                                        )
                                    }
                                    style={{
                                        width: "38px",
                                        height:
                                            "38px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "50%",
                                        backgroundColor:
                                            "#ffebee",
                                        color:
                                            "#d32f2f",
                                        cursor:
                                            "pointer",
                                        fontWeight:
                                            "bold",
                                        fontSize:
                                            "18px"
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "30px"
                    }}
                >
                    <div
                        style={{
                            width: "350px",
                            backgroundColor:
                                "#ffffff",
                            border:
                                "1px solid #eeeeee",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow:
                                "0 3px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom:
                                    "12px"
                            }}
                        >
                            <span>
                                Sub Total
                            </span>
                            <span>
                                ₹{subTotal}
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom:
                                    "12px"
                            }}
                        >
                            <span>
                                GST (5%)
                            </span>
                            <span>
                                ₹{gst}
                            </span>
                        </div>

                        <hr />

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginTop:
                                    "15px",
                                fontSize: "24px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            <span>
                                Grand Total
                            </span>
                            <span>
                                ₹{grandTotal}
                            </span>
                        </div>

                        <button
                            onClick={
                                handleGenerateInvoice
                            }
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                padding: "14px",
                                backgroundColor:
                                    "#1976d2",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Generate Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateInvoice;