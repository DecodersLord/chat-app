import { useState } from "react";
import InputBox from "../InputBox.jsx";
import RadioButton from "../RadioButtonComponents/RadioButton.jsx";
import Button from "../Button.jsx";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const { loading, handleSignUp } = useSignup();

    const [inputs, setInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const handleInputChange = (field, value) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleSignUp(inputs);
    };

    return (
        <>
            <h1 className="text-white font-medium text-5xl items-center text-center">
                Sign Up
            </h1>
            <form action="" onSubmit={handleSubmit}>
                <InputBox
                    title="fullName"
                    onValueChange={(value) =>
                        handleInputChange("fullName", value)
                    }
                />
                <InputBox
                    title="Username"
                    onValueChange={(value) =>
                        handleInputChange("userName", value)
                    }
                />
                <InputBox
                    title="Password"
                    onValueChange={(value) =>
                        handleInputChange("password", value)
                    }
                />
                <InputBox
                    title="confirm password"
                    onValueChange={(value) =>
                        handleInputChange("confirmPassword", value)
                    }
                />
                <RadioButton
                    title="Gender"
                    selectedValue={inputs.gender}
                    onValueChange={(value) =>
                        handleInputChange("gender", value)
                    }
                    radioButtons={[{ label: "male" }, { label: "female" }]}
                />
                <Link to="/login" className="link link-warning pl-4 mb-4">
                    Already have an account? Log In
                </Link>
                <div className="flex justify-center items-center p-4">
                    <Button text="Sign Up" isLoading={loading} />
                </div>
            </form>
        </>
    );
};

export default SignUp;
