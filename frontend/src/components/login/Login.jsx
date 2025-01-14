import { useState } from "react";
import InputBox from "../InputBox.jsx";
import Button from "../Button.jsx";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { loading, handleLogin } = useLogin();

    const handleInputChange = (field, value) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(inputs);

        await handleLogin({
            userName: inputs.username,
            password: inputs.password,
        });
    };

    return (
        <>
            <h1 className="text-white font-medium text-5xl items-center text-center">
                Login Here
            </h1>
            <form action="" onSubmit={handleSubmit}>
                <InputBox
                    title="Username"
                    onValueChange={(value) =>
                        handleInputChange("username", value)
                    }
                />
                <InputBox
                    title="Password"
                    onValueChange={(value) =>
                        handleInputChange("password", value)
                    }
                />
                <Link to="/signup" className="link link-warning pl-4 mb-4">
                    New User? Register Here
                </Link>

                <div className="flex justify-center items-center p-4">
                    <Button text="Login" isLoading={loading} />
                </div>
            </form>
        </>
    );
};

export default Login;
