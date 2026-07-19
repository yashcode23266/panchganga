import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin=(e)=>{

        e.preventDefault();

        if(username==="panchganga" && password==="panchganga@1990"){

            localStorage.setItem("adminLoggedIn","true");

            navigate("/admin-dashboard");

        }else{

            alert("Invalid Username or Password");

        }

    }

    return(

<div className="min-h-screen flex justify-center items-center bg-gray-100">

<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
>

<h1 className="text-3xl font-bold mb-8 text-center">
Admin Login
</h1>

<input
type="text"
placeholder="Username"
className="w-full border p-3 rounded-lg mb-5"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full border p-3 rounded-lg mb-5"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="w-full bg-emerald-700 text-white p-3 rounded-lg hover:bg-emerald-800"
>

Login

</button>

</form>

</div>

);

}