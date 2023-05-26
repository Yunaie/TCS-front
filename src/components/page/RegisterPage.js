import {useState } from "react";
import { Navigate } from "react-router-dom";
import "../../styles/LoginPage.css";

function RegisterPage({ IsLoggedIn,setIsLoggedIn,userId, setUserId,isAdmin,setisAdmin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    console.log("hello")
    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setRedirect(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during registration: " + error.message);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={register}>
      <h1 className="login-title">Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="my-button" type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
