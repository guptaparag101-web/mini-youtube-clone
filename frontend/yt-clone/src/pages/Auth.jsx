import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channelName, setChannelName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !channelName)) {
      toast.error("Please fill all fields");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const body = isLogin
      ? { email, password }
      : { email, password, channelName };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Auth failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(isLogin ? "Logged in successfully" : "Account created");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-xl p-6">

        <h1 className="text-xl font-semibold text-center mb-1">
          {isLogin ? "Sign in" : "Create your account"}
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          {isLogin
            ? "to continue to YouTube"
            : "to start uploading videos"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Channel name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-sm outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-sm outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-sm outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-semibold"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Auth;
