import React, { useState } from "react";
import "../App.css";

function Card({ travels, addToCart }) {
    const [counts, setCounts] = useState({});
    const [selectedTravel, setSelectedTravel] = useState(null); 

    const handleAddToCart = async (travelId, travelImg, travelName, travelPrice) => {
        const count = counts[travelId] || 1;
        console.log(`Сагсанд нэмэх: ID=${travelId}, Тоо=${count}`);
    
        try {
            await addToCart(travelId, count, travelImg, travelName, travelPrice);
            console.log(`Амжилттай нэмэгдлээ: ${travelId} (${count})`);
            alert("Сагсанд нэмэгдлээ");
        } catch (error) {
            console.error("Сагсанд нэмэхэд алдаа гарлаа:", error.response?.data || error.message);
        }
    };

    const updateCount = (travelId, delta) => {
        setCounts(prev => {
            const newCount = (prev[travelId] || 1) + delta;
            return {
                ...prev,
                [travelId]: newCount > 0 ? newCount : 1 // Тоо 1-ээс бага болохгүй
            };
        });
    };

    return (
        <div className="card-container" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr" }}>
            {travels.map((travel) => (
                <div key={travel.id}>
                    <div className="card">
                        <div className="card-image">
                            <img 
                                onClick={() => setSelectedTravel(travel === selectedTravel ? null : travel)} 
                                src={travel.img} 
                                alt={travel.name} 
                            />
                            <button style={{ border: 'none' }} onClick={() => handleAddToCart(travel.id, travel.img, travel.name, travel.price)} className="heart"></button>
                        </div>
                        <div className="card-body">
                            <div className="title">{travel.name}</div>
                            <div className="info">
                                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location" />
                                {travel.location || "Ази тив"}
                            </div>
                            <div className="info">
                                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Date" />
                                Эхлэх: {new Date(travel.Startdate).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                                <br />
                                Дуусах: {new Date(travel.Enddate).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                            </div>
                            <div className="info">
                                Зорчигчийн тоо: {travel.limit}/{travel.countNow}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <div className="price">{travel.price}₮ / Том хүн</div>
                                    <div className="child-price">{travel.price}₮ / Хүүхэд</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <button
                                        onClick={() => updateCount(travel.id, -1)}
                                        disabled={counts[travel.id] === 1}
                                        style={{
                                            fontSize: "24px",
                                            marginRight: "10px",
                                            cursor: "pointer",
                                            width: "30px",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: "none",
                                            backgroundColor: "white"
                                        }}
                                    >
                                        -
                                    </button>
                                    <div>{counts[travel.id] || 1}</div>
                                    <button
                                        onClick={() => updateCount(travel.id, 1)}
                                        style={{
                                            fontSize: "24px",
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            width: "30px",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            border: "none"
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {selectedTravel && (
                        <div style={{
                            position: "fixed",
                            zIndex: 1000,
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "10px",
                                width: "50%",
                                maxWidth: "600px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                textAlign: "center",
                                position: "relative"
                            }}>
                                <span 
                                    style={{ 
                                        position: "absolute", 
                                        right: "15px", 
                                        top: "10px", 
                                        cursor: "pointer", 
                                        fontSize: "24px", 
                                        color: "red"
                                    }} 
                                    onClick={() => setSelectedTravel(null)}
                                >
                                    &times;
                                </span>
                                <h2>{selectedTravel.name}</h2>
                                <img src={selectedTravel.img} alt={selectedTravel.name} style={{ width: "100%", borderRadius: "10px" }} />
                                <p><b>Байршил:</b> {selectedTravel.martshrut || "Ази тив"}</p>
                                <p><b>Эхлэх огноо:</b> {new Date(selectedTravel.Startdate).toLocaleDateString("mn-MN")}</p>
                                <p><b>Дуусах огноо:</b> {new Date(selectedTravel.Enddate).toLocaleDateString("mn-MN")}</p>
                                <p><b>Үнэ:</b> {selectedTravel.price}₮</p>
                                <p><b>Тайлбар:</b> {selectedTravel.description || "Энэ аяллын талаар дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ."}</p>
                                <button 
                                    style={{ 
                                        marginTop: "10px", 
                                        padding: "10px 15px", 
                                        backgroundColor: "#28a745", 
                                        color: "white", 
                                        border: "none", 
                                        borderRadius: "5px", 
                                        cursor: "pointer" 
                                    }}
                                    onClick={() => handleAddToCart(selectedTravel.id, selectedTravel.img, selectedTravel.name, selectedTravel.price)}
                                >
                                    Сагсанд нэмэх
                                </button>
                            </div>
                        </div>
                    )}  
                </div>
            ))} 
        </div>
    );
}

export default Card;
