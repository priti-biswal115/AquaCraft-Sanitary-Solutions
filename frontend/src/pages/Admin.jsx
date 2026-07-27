import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaBoxOpen,
    FaRupeeSign,
    FaBuilding
} from "react-icons/fa";

function Admin() {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "0.3s",
        textAlign: "center"
    };

    return (
        <div style={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                padding: "40px"
            }}
        >
            <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >
                <h1 style={{
                        textAlign: "center",
                        color: "#1976d2",
                        marginBottom: "10px"
                    }}
                >
                    Admin Dashboard
                </h1>

                <p style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "40px"
                    }}
                >
                    Manage your business information
                </p>

                <div style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "25px"
                    }}
                >
                    <div style={cardStyle}
                        onClick={() =>
                            navigate("/customers")
                        }
                    >
                        <FaUsers
                            size={50}
                            color="#358B81"
                        />

                        <h3>Customers</h3>

                        <p
                            style={{
                                color: "#666"
                            }}
                        >
                            Add, edit and manage customers
                        </p>
                    </div>

                    <div style={cardStyle}
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        <FaBoxOpen
                            size={50}
                            color="#D68E27"
                        />

                        <h3>Products</h3>

                        <p style={{
                                color: "#666"
                            }}
                        >
                            Manage product catalog
                        </p>
                    </div>

                    <div style={cardStyle}
                        onClick={() =>
                            navigate("/pricing")
                        }
                    >
                        <FaRupeeSign
                            size={50}
                            color="#5D833B"
                        />

                        <h3>Pricing</h3>

                        <p
                            style={{
                                color: "#666"
                            }}
                        >
                            Configure customer pricing
                        </p>
                    </div>

                    <div style={cardStyle}
                        onClick={() =>
                            navigate("/business-settings")
                        }
                    >
                        <FaBuilding size={50}
                            color="#669CC8" />
                        <h3>Business Settings</h3>

                        <p  style={{
                                color: "#666"
                            }}
                        >
                            Update company details
                        </p>
                    </div>
                </div>

                <div style={{
                        textAlign: "center",
                        marginTop: "40px"
                    }}
                >
                    <button onClick={() =>
                            navigate("/")
                        }
                        style={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        ← Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Admin;