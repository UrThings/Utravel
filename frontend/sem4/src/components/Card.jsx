import React, { useState } from "react";
import "../App.css";

function Card({ travels, addToCart }) {
    const [counts, setCounts] = useState({});

    const handleAddToCart = async (travelId, travelImg, travelName) => {
        const count = counts[travelId] || 1;
        console.log(`Сагсанд нэмэх: ID=${travelId}, Тоо=${count}`);
    
        try {
            await addToCart(travelId, count, travelImg, travelName);
            console.log(`Амжилттай нэмэгдлээ: ${travelId} (${count})`);
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
        <div className="card-container">
            {travels.map((travel) => (
                <div className="card" key={travel.id}>
                    <div className="card-image">
                        <img src={travel.img} alt={travel.name} />
                        <button style={{border:'none'}} onClick={() => handleAddToCart(travel.id, travel.img, travel.name)} className="heart"></button>
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
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828853.png" alt="Flight" />
                            {travel.flight ? "Шууд нислэгтэй" : "Шууд нислэггүй"}
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
            ))}
        </div>
    );
}

export default Card;
