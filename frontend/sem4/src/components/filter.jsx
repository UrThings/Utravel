export default function FilterHtml({filters, handleFilterChange}) {
    return (
        
                <div
                    className="left"
                    style={{
                        position: "sticky",
                        top: "150px",
                        background: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "280px",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    <div style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>Filter</div>

                    <div style={{ fontWeight: "bold", color: "gray" }}>Name</div>
                    <input
                        type="text"
                        value={filters.name}
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                        style={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontSize: "16px"
                        }}
                        placeholder="Enter product name"
                    />

                    <div>
                        Эхлэх өдөр
                    </div>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange("startDate", e.target.value)}
                        style={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontSize: "16px",
                            marginBottom: "10px"
                        }}
                        placeholder="Start date"
                    />


                    <div>
                        Дуусах өдөр
                    </div>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange("endDate", e.target.value)}
                        style={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontSize: "16px",
                            marginBottom: "10px"
                        }}
                        placeholder="End date"
                    />

                    <div style={{ fontWeight: "bold", color: "gray" }}>Price Range</div>
                    <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        style={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontSize: "16px",
                            marginBottom: "10px"
                        }}
                        placeholder="Min price"
                    />
                    <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        style={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontSize: "16px"
                        }}
                        placeholder="Max price"
                    />
                    <button
                    onClick={() => handleFilterChange("hi", "hi")}
                    className="button">
                        Refresh
                    </button>
                </div>
    )
}

