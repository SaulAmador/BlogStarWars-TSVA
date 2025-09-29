import React from "react";
import logo from "../assets/img/logo.webp";

const Sidebar = ({ onSelect }) => (
    <div style = {{
        width: "180px",
        background: "#181818",
        color: "#fff",
        minHeight: "100vh",
        padding: "24px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}>
        <img 
            src={logo}
            alt="Logo"
            style={{
                width: "120px",
                marginBottom: "18px",
                filter: "drop-shadow(0 2px 8px #ffe81f)"
            }}
        />
        <div style = {{
            fontWeight: "bold",
            fontSize: "1.3em",
            marginBottom: "32px",
            letterSpacing: "1px",
            textAlign: "center"
        }}>
            Browse<br />Databank
        </div>
        <div style = {{ width: "100%"}}>
            <div 
                style = {{ padding: "12px 24px", cursor: "pointer",}}
                onClick = { () => onSelect("characters")}
            >
                Characters
            </div>
            <div 
                style = {{ padding: "12px 24px", cursor: "pointer",}}
                onClick = { () => onSelect("planets")}
            >
                Planets
            </div>
            <div 
                style = {{ padding: "12px 24px", cursor: "pointer",}}
                onClick = { () => onSelect("vehicles")}
            >
                Vehicles
            </div>
        </div>
    </div>
);

export default Sidebar;