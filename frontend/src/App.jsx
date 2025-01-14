/* eslint-disable no-unused-vars */
import { useState } from "react";
import Login from "./components/login/login.jsx";
import SignUp from "./components/signup/SignUp.jsx";
import Home from "./home/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

function App() {
    const [count, setCount] = useState(0);
    const { authUser } = useAuthContext();

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="h-full w-full bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 p-4">
                    {/* <Login /> */}
                    {/* <Signup /> */}
                    {/* <Home /> */}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                authUser ? <Home /> : <Navigate to={"/login"} />
                            }
                        />
                        <Route
                            path="/login"
                            element={authUser ? <Navigate to="/" /> : <Login />}
                        />
                        <Route
                            path="/signup"
                            element={
                                authUser ? <Navigate to="/" /> : <SignUp />
                            }
                        />
                    </Routes>
                    <Toaster />
                </div>
            </div>
        </div>
    );
}

export default App;
