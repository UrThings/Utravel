import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function AdminDashboard(setUser) {
  const [users, setUsers] = useState([]);
  const [travels, setTravels] = useState([]);
  const [newTravel, setNewTravel] = useState({
    name: "",
    startdate: "",
    enddate: "",
    marshrut: "",
    price: "",
    limit: "",
    img: "",
  });
  const [activeSection, setActiveSection] = useState("users");

  
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);  
    localStorage.setItem("user", "");
    localStorage.setItem("accessToken", "");
    navigate("/");
  };


  useEffect(() => {
    getUsers();
    getTravels();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/user/getusers");
    setUsers(response.data);
  };

  const getTravels = async () => {
    const response = await axios.get("http://localhost:3000/api/travel/travels");
    setTravels(response.data.travels);
  };



  const addTravel = async () => {
    console.log("Илгээх өгөгдөл:", newTravel); // <-- Илгээх өгөгдлийг шалгах

    if (!newTravel.name || !newTravel.startdate || !newTravel.enddate || !newTravel.marshrut || !newTravel.price || !newTravel.limit || !newTravel.img) {
        alert("Бүх талбарыг бөглөнө үү.");
        return;
    }

    try {
        await axios.post("http://localhost:3000/api/travel/AddTravels", {
            name: newTravel.name,
            Startdate: newTravel.startdate,  // <-- Property нэрээ backend-тэй ижил болгох
            Enddate: newTravel.enddate,      // <-- Property нэрээ backend-тэй ижил болгох
            marshrut: newTravel.marshrut,
            price: Number(newTravel.price), // Тоон утга болгох
            limit: Number(newTravel.limit), // Тоон утга болгох
            img: newTravel.img,
        });
        alert("Амжилттай нэмэгдлээ.")

        getTravels();
        setNewTravel({
            name: "",
            startdate: "",
            enddate: "",
            marshrut: "",
            price: "",
            limit: "",
            img: "",
        });
    } catch (error) {
        console.error("Алдаа гарлаа:", error.response?.data || error.message);
    }
};


const removeTravel = async (id) => {
    await axios.delete("http://localhost:3000/api/travel/RemoveTravels", { data: { id } });
    await getTravels();
}
  
  
  

const removeUser = async (userId) => {
  await axios.delete("http://localhost:3000/api/user/removeUser", { data: { userId } });
  getUsers();
  alert("Хэрэглэгчийг устгалаа.");
};



const makeAdmin = async (userId) => {
  await axios.put("http://localhost:3000/api/user/makeAdmin", { userId });
  getUsers();
  alert("Хэрэглэгчийг админ болголоо.");
}



  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "rgb(116, 101, 230)" }}>
      <div className="bg-white shadow-lg rounded-xl p-6">

        {/* Таб хэсэг */}
        <div  style={{ marginTop:'-210px',  position:'fixed', backgroundColor:'white', boxShadow:'0 0 20px rgba(0, 0, 0, 0.45)', width:'100%', height:'200px'}}>
          <div>
            <h1 style={{marginTop:'20px'}} className="text-2xl font-semibold text-gray-700">📊 Админ төв</h1>
          </div>
          <div style={{marginTop:'40px', display:'flex', justifyContent:'center'}}>
            <button className={`px-4 py-2 rounded-lg button ${activeSection === "users" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} style={{marginLeft:'100px', marginBottom:"20px"}}  onClick={() => setActiveSection("users")}>📌 Хэрэглэгчид</button>
            <button className={`px-4 py-2 rounded-lg  button ${activeSection === "travels" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} style={{marginLeft:'100px', marginBottom:"20px"}} onClick={() => setActiveSection("travels")}>🌍 Аяллууд</button>
            <button className={`px-4 py-2 rounded-lg button ${activeSection === "add" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} style={{marginLeft:'100px', marginBottom:"20px"}} onClick={() => setActiveSection("add")}>➕ Аялал нэмэх</button>
            <a href="/">
              <button onClick={() => logout} style={{marginLeft:'100px', marginBottom:"20px"}} className="button">Log out</button>
            </a>
          </div>

        </div>
        <div style={{marginTop:'210px'}}>
          {/* Хэрэглэгчдийн жагсаалт */}
        {activeSection === "users" && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2" >📌 Хэрэглэгчид</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id} className="py-2 flex justify-between text-gray-700">
                    <span>{user.phone} - {user.position}</span>
                    <button className="button" style={{marginLeft:'10px'}} onClick={() => removeUser(user.id)}>Устгах</button>
                    <button className="button" style={{marginLeft:'10px'}} onClick={() => makeAdmin(user.id)}>
                    Admin
                  </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Аяллын жагсаалт */}
        {activeSection === "travels" && (
          <div className="mt-8">
            <br />
            <h2  className="text-xl font-semibold text-gray-700 mb-2"  >🌍 Аяллууд</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem", marginTop: "20px" }}>
              {travels.map((travel) => (
                <div key={travel.id} style={{border:'2px solid rgb(116, 101, 230)', marginBottom:'50px' }} className="bg-white shadow-md rounded-lg p-4 w-64 flex-shrink-0">
                  <img src={travel.img} alt={travel.name} className="w-full h-40 object-cover rounded-md" style={{height:'150px', width:"250px"}} />
                  <h3 className="text-lg font-bold text-gray-800 mt-2">{travel.name}</h3>
                  <p className="text-gray-600">{travel.marshrut}</p>
                  <p className="text-gray-800 font-semibold mt-1">{travel.price}₮</p>
                  <div className="info">
                      <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Date" />
                      Эхлэх: {new Date(travel.Startdate).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                      <br />
                      Дуусах: {new Date(travel.Enddate).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                  </div>
                  <p className="text-gray-700 text-sm">👥 Хязгаар: {travel.limit} хүн</p>
                  <button
                    className="button"
                    onClick={() => removeTravel(travel.id)}
                  >
                    Устгах
                  </button>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Аялал нэмэх */}
        {activeSection === "add" && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow">
            <br />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">➕ Аялал нэмэх</h2>
              <button className="button" style={{marginBottom:"20px", marginLeft:"200px"}} onClick={addTravel}>Аялал нэмэх</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Аяллын нэр" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, name: e.target.value })} />
              <input type="text" placeholder="Маршрут" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, marshrut: e.target.value })} />
              <input type="date" placeholder="Эхлэх өдөр" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, startdate: e.target.value })} />
              <input type="date" placeholder="Дуусах өдөр" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, enddate: e.target.value })} />
              <input type="number" placeholder="Үнэ" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, price: parseInt(e.target.value) })} />
              <input type="number" placeholder="Оролцогчдын хязгаар" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, limit: parseInt(e.target.value) })} />
              <input type="text" placeholder="Зураг (URL)" className="border p-2 rounded-lg w-full" onChange={(e) => setNewTravel({ ...newTravel, img: e.target.value })} />
            </div>
          </div>
        )}
        </div>
        
      </div>
    </div>
  );
}

export default AdminDashboard;
