import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getInvoiceById } from "../api/invoiceApi";
import { getBusinessSettings } from "../api/businessSettingsApi";
import { BASE_URL } from "../api/baseUrl";

function InvoicePreview() {
    const { invoiceId } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);
    const [business, setBusiness] = useState(null);

    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, [invoiceId]);

    const loadData = async () => {
        try {
            const invoiceData =
                await getInvoiceById(invoiceId);

            const businessData =
                await getBusinessSettings();

            setInvoice(invoiceData);
            setBusiness(businessData);
        } catch (err) {
            console.error(err);
            setError(
                "Failed to load invoice."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPdf = async () => {
        try {
            setDownloading(true);

            const response = await fetch(
                `${BASE_URL}/Invoices/${invoiceId}/pdf`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to download PDF"
                );
            }

            const blob =
                await response.blob();

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement("a");

            link.href = url;
            link.download =
                `${invoice.invoiceNumber}.pdf`;

            document.body.appendChild(
                link
            );

            link.click();

            document.body.removeChild(
                link
            );

            window.URL.revokeObjectURL(
                url
            );
        } catch (error) {
            console.error(error);

            alert(
                "Failed to download PDF"
            );
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "40px"
                }}
            >
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "40px"
                }}
            >
                {error}
            </div>
        );
    }

    if (!invoice) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "40px"
                }}
            >
                Invoice not found
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor:
                    "#f4f6f8",
                padding: "30px"
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    backgroundColor:
                        "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginBottom:
                            "20px"
                    }}
                >
                    <button
                        onClick={() =>
                            navigate("/generate-invoice")
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
                        ← Back
                    </button>

                    <button
                        onClick={
                            handleDownloadPdf
                        }
                        disabled={
                            downloading
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
                        {downloading
                            ? "Downloading..."
                            : "Download PDF"}
                    </button>
                </div>

                <div
                    style={{
                        marginTop: "50px",
                        textAlign: "center"
                    }}
                >
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        style={{
                            width: "180px",
                            height: "auto"
                        }}
                    />

                    <h1>
                        {
                            business?.businessName
                        }
                    </h1>

                    <p>
                        {
                            business?.address
                        }
                    </p>

                    <p>
                        GST No : 07AACCS1234F1Z5
                     </p>

                    <p>
                        Phone :
                        {" "}
                        {
                            business?.phone
                        }
                    </p>
                </div>

                <hr />

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginTop:
                            "20px"
                    }}
                >
                    <div>
                        <strong>
                            Invoice No :
                        </strong>{" "}
                        {
                            invoice.invoiceNumber
                        }
                    </div>

                    <div>
                        <strong>
                            Date :
                        </strong>{" "}
                        {new Date(
                            invoice.invoiceDate
                        ).toLocaleDateString()}
                    </div>
                </div>

                <div
                    style={{
                        marginTop:
                            "30px"
                    }}
                >
                    <h3>
                        Customer Details
                    </h3>

                    <p>
                        <strong>
                            Name :
                        </strong>{" "}
                        {
                            invoice.customerName
                        }
                    </p>

                    <p>
                        <strong>
                            Phone :
                        </strong>{" "}
                        {
                            invoice.customerPhone
                        }
                    </p>

                    <p>
                        <strong>
                            GST :
                        </strong>{" "}
                        {
                            invoice.customerGST
                        }
                    </p>
                </div>

                <table
                    style={{
                        width: "100%",
                        marginTop: "25px",
                        borderCollapse: "collapse",
                        overflow: "hidden",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#1976d2",
                                color: "#fff"
                            }}
                        >
                            <th style={{ padding: "14px" }}>
                                Product
                            </th>

                            <th style={{ padding: "14px" }}>
                                Qty
                            </th>

                            <th style={{ padding: "14px" }}>
                                Rate
                            </th>

                            <th style={{ padding: "14px" }}>
                                Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoice.invoiceItems.map(
                            (item, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#ffffff"
                                                : "#f8fafc"
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #eee"
                                        }}
                                    >
                                        {item.productName}
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "center",
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #eee"
                                        }}
                                    >
                                        {item.quantity}
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #eee"
                                        }}
                                    >
                                        ₹{item.rate}
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #eee",
                                            fontWeight: "600",
                                            color: "#1976d2"
                                        }}
                                    >
                                        ₹{item.amount}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                <div
                    style={{
                        width: "320px",
                        marginLeft: "auto",
                        marginTop: "35px",
                        backgroundColor:
                            "#f8fafc",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow:
                            "0 2px 5px rgba(0,0,0,0.05)"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            marginBottom: "10px"
                        }}
                    >
                        <span>Sub Total</span>
                        <span>
                            ₹{invoice.subTotal}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            marginBottom: "10px"
                        }}
                    >
                        <span>GST (5%)</span>

                        <span>
                            ₹{invoice.gstAmount}
                        </span>
                    </div>

                    <hr />

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            marginTop: "10px",
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#1976d2"
                        }}
                    >
                        <span>
                            Grand Total
                        </span>

                        <span>
                            ₹{invoice.grandTotal}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "50px",
                        textAlign: "right"
                    }}
                >
                    <img
                        src="/images/signature.png"
                        alt="Signature"
                        style={{
                            width: "180px",
                            height: "auto"
                        }}
                    />

                    <p
                        style={{
                            marginTop: "10px"
                        }}
                    >
                        {
                            business?.businessName
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InvoicePreview;