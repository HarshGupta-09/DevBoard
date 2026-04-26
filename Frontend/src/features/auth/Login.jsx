import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./auth.api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070A] text-white">
      
      <form
        onSubmit={handleSubmit}
        className="w-[350px] bg-[#111114] border border-gray-800 rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 bg-[#0F0F12] border border-gray-800 rounded focus:outline-none focus:border-indigo-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 bg-[#0F0F12] border border-gray-800 rounded focus:outline-none focus:border-indigo-500"
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 transition p-2 rounded font-medium">
          Login
        </button>

        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;