import {React, useState, useEffect} from "react";
import { MapContainer, TileLayer, Tooltip, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/MapView.css"
import {useNavigate} from "react-router-dom"

function MapView() {
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedNation, setSelectedNation] = useState();
    const [showImage, setShowImage] = useState(false);
    const [nations, setNations] = useState();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const getNationData = async() => {
            try {
              const response = await fetch(`${apiUrl}/api/nation/`)
                if (!response.ok) {
                    throw new Error("Network error")
                }
                const data = await response.json();
                console.log(data[0].images[0].image)
                setNations(data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        getNationData();

    }, [])
   
    const handleClickOnNation = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setShowImage(true);
    }

  return <>
    <div className="map-wrapper">
                <MapContainer center={[48.0196, 66.9237]} zoom={2} style={{ height: "80vh", width: "80%", borderRadius: "2%" }}>
        <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        {nations && nations.map((nation, idx) => (
            <Circle
                key={idx}
                center={nation.position}
                radius={50000}
                eventHandlers={{
                    click: () => {
                      setSelectedImageUrl(`${apiUrl}${nation.images[0].image}`);
                      setSelectedNation(nation.slug)
                      setShowImage(true);
                    }
                  }}
                pathOptions={{ fillOpacity: 0, stroke: false }}
            >
                <Tooltip permanent direction="center" offset={[0, 0]} opacity={1}>
                    <a 
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedImageUrl(nation.image_url);
                        setShowImage(true);
                    }}
                    style={{ textDecoration: "none", color: "black", backgroundColor: "white" }}
                    >

                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{nation.name}</span>
                    </a>
                </Tooltip>
            </Circle>
        ))}

    </MapContainer>
    <h3>Кликните на народ чтобы узнать больше</h3>
    {showImage && (
    <div 
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 1s ease-out"

        }}
        onClick={() => setShowImage(false)}
    >
        <div
            style={{
                backgroundColor: "#333333",
                padding: "20px",
                borderRadius: "10px",
                position: "relative",
                maxWidth: "90%", 
                maxHeight: "80%", 
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center", 
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => setShowImage(false)}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
            >
                ×
            </button>
            <img 
                src={selectedImageUrl}
                alt="Selected" 
                style={{ 
                    width: "80%", 
                    height: "auto", 
                    borderRadius: "8px",
                    maxWidth: "500px", 
                    animation: "zoomIn 1s ease",
                }} 
            />
            <h3>Готовы исследовать мир этого народа?</h3>
            <button 
                onClick={() => navigate(`/${selectedNation}`)} 
                style={{
                    padding: "18px 36px",
                    backgroundColor: "#f1c40f", 
                    color: "white",
                    fontSize: "20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    marginTop: "20px",

                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f0ad4e"; 
                    e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#ec971f"; 
                    e.target.style.transform = "scale(1)"; 
                }}
            >
                Исследовать
            </button>
        </div>
    </div>
)}
    </div>



  </>;
}

export default MapView;
