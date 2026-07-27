import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
    getBusinessSettings,
    saveBusinessSettings
} from "../api/businessSettingsApi";

function BusinessSettings() {
    const navigate = useNavigate();
    const [formData, setFormData] =
        useState({
            businessId: 0,
            businessName: "",
            gstNo: "",
            phone: "",
            address: ""
        });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getBusinessSettings();

            if (data) {
                setFormData(data);
            }
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

    const handleSave = async () => {
        try {
            await saveBusinessSettings(
                formData
            );

            alert("Business Settings Saved Successfully");

            await loadSettings();
        } catch (error) {
            console.error(error);

            alert("Failed to save settings");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor:
                    "#f4f6f8",
                padding: "40px"
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
                    maxWidth: "700px",
                    margin: "0 auto",
                    backgroundColor:
                        "#fff",
                    padding: "30px",
                    borderRadius:
                        "10px",
                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.1)"
                }}
            >
                <h1 style={{
                        color: "#1976d2",
                        marginBottom:
                            "25px"
                    }}
                >
                    Business Settings
                </h1>

                <div style={{
                        display: "grid",
                        gap: "15px"
                    }}
                >
                    <input
                        name="businessName"
                        placeholder="Business Name"
                        value={
                            formData.businessName
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        name="gstNo"
                        placeholder="GST No"
                        value={
                            formData.gstNo
                        }
                        onChange={
                            handleChange
                        }
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
                    />

                    <textarea
                        rows="4"
                        name="address"
                        placeholder="Address"
                        value={
                            formData.address
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <button onClick={
                            handleSave
                        }
                        style={{
                            backgroundColor:
                                "#1976d2",
                            color: "#fff",
                            border: "none",
                            padding:
                                "12px",
                            borderRadius:
                                "6px",
                            cursor:
                                "pointer"
                        }}
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BusinessSettings;