import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import FilterHtml from "../components/filter.jsx";

function UserDashboard({ user, setUser }) {
  const [travels, setTravels] = useState([]);
  const [fTravels, setFtravels] = useState(travels)
  const [cart, setCart] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showOrdered, setShowOrdered] = useState(false); // New state for ordered travels
  const [totalPrice, setTotalPrice] = useState(0);
  const [booked, setBooked] = useState([]); // Added state for booked travels
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTravels();
        await getCart();
        await getTravelFromBooked(); 
      } catch (error) {
        console.error("Алдаа гарлаа:", error);
      }
    };
    fetchData();
  }, []);

  if(cart)





  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCart();
        await getTravelFromBooked(); 

        const totalPrice = cart
        .map((travel) => {
          if (travel.price && travel.count) {
            return travel.price * travel.count;
          }
          return 0; // Хэрвээ price эсвэл count байхгүй бол 0 гаргана
        })
        .reduce((a, b) => a + b, 0);
      
        setTotalPrice(totalPrice);

      } catch (error) {
        console.error("Сагсны өгөгдлийг авахад алдаа гарлаа:", error);
      }
    };
    fetchData();
  }, [cart]);




  const getTravels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/travel/travels");
      await setTravels(response.data.travels);
      await setFtravels(response.data.travels);

    } catch (error) {
      console.error("Аяллуудыг авахад алдаа гарлаа:", error);
      setTravels([]);
    }
  };
  

  const getCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/card/getTravelFromCart/" + userId
      );
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Сагсны өгөгдлийг авахад алдаа гарлаа:", error);
      setCart([]);
    }
  };

  const getTravelFromBooked = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/book/getTravelFromBooked/" + userId
      );
      setBooked(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Хадгалсан аяллуудыг авахад алдаа гарлаа:", error);
      setBooked([]);
    }
  };

  const addToCart = async (travelId, count, img, name, price) => {
    try {
      await axios.post("http://localhost:3000/api/card/cart", {
        userId,
        travelId,
        count,
        img,
        name,
        price
      });
      getCart();
      getTravels();
    } catch (error) {
      console.error("Сагсанд нэмэхэд алдаа гарлаа:", error);
    }
  };

  const addToBooked = async (img, name, travelId) => {
    try {
      await axios.post("http://localhost:3000/api/card/pay", {
        userId, travelId, img , name
      });
      setCart([]);
      getCart();
      getTravelFromBooked(); 
    } catch (error) {
      console.error("Төлбөр төлөхөд алдаа гарлаа:", error);
    }

  };


  



  const deleteTravelFromCart = async (travelId) => {
    try {
      await axios.delete("http://localhost:3000/api/card/removeFromCart", {
        data: { userId, travelId },
      });
      getCart();
      getTravels();
    } catch (error) {
      console.error("Сагснаас хасахад алдаа гарлаа:", error);
    }
  }

  const [filters, setFilters] = useState({
    name: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: ""
  });


  const handleFilterChange = (key, value) => {
    if(key == "hi"){
      const refreshedFilter = {
        name: "",
        startDate: "",
        endDate: "",
        minPrice: "",
        maxPrice: ""
      }
      setFilters({
        name: "",
        startDate: "",
        endDate: "",
        minPrice: "",
        maxPrice: ""
      })
      applyFilters(refreshedFilter)

      return;

    }
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);

};


const applyFilters = (newFilters) => {
  let filteredTravels = travels;
  console.log(filteredTravels)

  if (newFilters.name) {
    filteredTravels = filteredTravels.filter((item) =>
      item.name && item.name.toLowerCase().includes(newFilters.name.toLowerCase()),
    
    );
  }
  
  if (newFilters.startDate) {
    const filterStartDate = new Date(newFilters.startDate).setHours(0, 0, 0, 0); 
    filteredTravels = filteredTravels.filter((item) => {
      const itemStartDate = new Date(item.Startdate).setHours(0, 0, 0, 0);

      return itemStartDate >= filterStartDate;
    });
  }

  if (newFilters.endDate) {
    const filterEndDate = new Date(newFilters.endDate).setHours(23, 59, 59, 999); 
    filteredTravels = filteredTravels.filter((item) => {
      const itemEndDate = new Date(item.Enddate).setHours(23, 59, 59, 999);
      return itemEndDate <= filterEndDate;
    });
  }

  if (newFilters.minPrice) {
    filteredTravels = filteredTravels.filter((item) => 
      item.price && item.price >= parseFloat(newFilters.minPrice)
    );
  }

  if (newFilters.maxPrice) {
    filteredTravels = filteredTravels.filter((item) => 
      item.price && item.price <= parseFloat(newFilters.maxPrice)
    );
  }

  setFtravels(filteredTravels);
  console.log(filteredTravels)

};

  return (
    <div className="p-6">
      <div
        className="Header"
        style={{
          borderBottomRightRadius: "40px",
          borderBottomLeftRadius: "40px",
          marginTop: "-50px",
          display: "flex",
          height: "100px",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          backgroundColor: "rgb(116, 101, 230)",
          zIndex: "1000",
        }}
      >
        <img src="u-logo.png" style={{ marginLeft: "30px", height: "180px" }} alt="" />
        <img src="2.png" style={{ height: "40px", marginLeft: "-125px", marginBottom: "-20px" }} alt="" />
        <button style={{ marginLeft: "630px" }} className="button" onClick={() => setShowSaved(true)}>
          Хадгалсан
        </button>
        <button style={{ marginLeft: "50px" }} className="button" onClick={() => setShowOrdered(true)}>
          Захиалсан
        </button> {/* New Order button */}
        <a href="/"><button onClick={() => setUser(null)} style={{ marginLeft: "50px" }} className="button">
          Log Out
        </button></a>
        
      </div>

      <div className="Body" style={{ marginTop: "50px", zIndex: "0" }}>
        <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" src="bangkok.jpg" alt="Эхний зураг" style={{ height: "800px" }} />
            <Carousel.Caption>
              <h3>Далайн эргийн аялал</h3>
              <p>Далайн эрэг дээр гайхалтай амрах боломж.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src="bangkok.jpg" alt="Хоёр дахь зураг" style={{ height: "800px" }} />
            <Carousel.Caption>
              <h3>Уулын аялал</h3>
              <p>Гайхалтай уулсын орой дээр гарч амраарай.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src="bangkok.jpg" alt="Гурав дахь зураг" style={{ height: "800px" }} />
            <Carousel.Caption>
              <h3>Хотын аялал</h3>
              <p>Орчин үеийн том хотуудыг судлаарай.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <center>
            <h1>Манай аялалууд</h1>
          </center>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <FilterHtml filters={filters} handleFilterChange={handleFilterChange} />
          <div>
            <Card travels={fTravels} addToCart={addToCart} />
          </div>
        </div>

        
      </div>

      {/* Overlay for Saved */}
      {showSaved && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            width: "450px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
            padding: "20px",
            overflowY: "auto",
            zIndex: "1100",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h5>Хадгалсан аялалууд</h5>
            <button className="btn-close" onClick={() => setShowSaved(false)}></button>
          </div>
          <hr />
          {cart.length > 0 ? (
            cart.map((travel, index) => (
              <div key={index} className="card mb-3" style={{ marginLeft: '20px' }}>
                <img src={travel.img} className="card-img-top" alt={travel.name} />
                <div className="card-body">
                  <h6 className="card-title" style={{fontSize:'20px'}}>{travel.name}</h6>
                  <h6>Үнэ: {travel.price*travel.count}₮</h6>
                  <button onClick={() =>addToBooked(travel.img , travel.name, travel.travelId)} className="button">Төлбөр төлөх</button>
                  <button onClick={() => deleteTravelFromCart(travel.travelId)} style={{position:'absolute', zIndex:'99' , bottom:13, right:20, width:'130px', height:'50px', borderRadius:'10px'}} className="btn btn-danger btn-sm">Хасах</button>
                </div>
              </div>
            ))
          ) : (
            <p>Хадгалсан аялал алга байна.</p>
          )}

          <div className="d-flex justify-content-between mt-3">
            <h5>Нийт үнэ: {totalPrice}₮</h5>
          </div>
        </div>
      )}

      {/* Overlay for Ordered Travels */}
      {showOrdered && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            width: "450px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
            padding: "20px",
            overflowY: "auto",
            zIndex: "1100",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h5>Захиалсан аялалууд</h5>
            <button className="btn-close" onClick={() => setShowOrdered(false)}></button>
          </div>
          <hr />
          {booked.length > 0 ? (
            booked.map((travel, index) => (
              <div key={index} className="card mb-3" style={{ marginLeft: '20px' }}>
                <img src={travel.img} className="card-img-top" alt={travel.name} />
                <div className="card-body">
                  <h6 className="card-title">{travel.name}</h6>
                  <p className="card-text">{travel.endTime}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Танд захиалсан аялал байхгүй байна.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
