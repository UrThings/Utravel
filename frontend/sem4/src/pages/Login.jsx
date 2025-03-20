import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth({ setUser }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [LoginOrSignup, setLoginOrSignup] = useState("login");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { phone, password },
        { withCredentials: true }
      );
      console.log(response)

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.token);
      setUser(response.data.user);

      if (response.data.user.position === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError("Нэвтрэх мэдээлэл буруу байна.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        { phone, password }
      );
      alert("Амжилттай бүртгэгдлээ.");
      setLoginOrSignup("login");

    } catch (err) {
      setError("Бүртгүүлэх мэдээлэл буруу байна.");
    }
  };

  return (
    <div>
      {LoginOrSignup === "login" ? (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f3f4f6",
          }}
        >
          <form
            className=""
            style={{
              position: "relative",
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
              borderRadius: "40px",
              padding: "40px",
              paddingBottom: "60px",
              display: "grid",
              background: "linear-gradient(135deg, #5b75f6, #935cd5)",
              width: "500px",
              height: "600px",
            }}
            onSubmit={handleLogin}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontSize: "70px", fontFamily: "Times", marginLeft: "90px" }}
            >
              Нэвтрэх
            </h2>
            <input
              type="text"
              placeholder="Утасны дугаар"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
                margin: "10px",
              }}
            />
            <input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
                margin: "10px",
                marginTop: "-30px",

              }}
            />
                        {error && <p style={{ color: "white", borderRadius:'10px',padding:'5px' ,textAlign: "center", position:'absolute', bottom:'170px', left:'50px', backgroundColor:'red' }}>{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded button"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                margin: "10px",
              }}
            >
              Нэвтрэх
            </button>
          </form>
          <span
            style={{
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              position: "absolute",
              bottom: "180px",
            }}
            onClick={() => setLoginOrSignup("signup")}
          >
            Бүртгүүлэх
          </span>
        </div>
      ) : (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f3f4f6",
          }}
        >
          <form
            className=""
            style={{
              position: "relative",
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
              borderRadius: "40px",
              padding: "40px",
              paddingBottom: "60px",
              display: "grid",
              background: "linear-gradient(135deg, #5b75f6, #935cd5)",
              width: "500px",
              height: "600px",
            }}
            onSubmit={handleSignup}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontSize: "70px", fontFamily: "Times", marginLeft: "45px" }}
            >
              Бүртгүүлэх
            </h2>
            <input
              type="text"
              placeholder="Утасны дугаар"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
                margin: "10px",
                
              }}
            />
            <input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
                margin: "10px",
                marginTop: "-30px",
              }}
            />
                        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded button"
              style={{
                width: "400px",
                height: "50px",
                fontSize: "20px",
                margin: "10px",
              }}
            >
              Бүртгүүлэх
            </button>
          </form>
          <span
            style={{
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              position: "absolute",
              bottom: "180px",
            }}
            onClick={() => setLoginOrSignup("login")}
          >
            Нэвтрэх
          </span>
        </div>
      )}
    </div>
  );
}

export default Auth;
